import _ from 'lodash';
import User from '../db/mongo/models/user';
import  { models, common } from '../db';

const { 
  Company, 
  companyAutoComplete, 
  Project, 
  projectAutoComplete,
  Portfolio,
  Metadata,
  Misc 
} = models;

async function getPopulatedCompany(link_name) {
  const companyFeatures = common.populateFieldsForPortfolio.companyFeatures;
  const userFeatures = common.populateFieldsForPortfolio.userFeatures;
  return await Company
                .findOne({ link_name })
                .populate('companyPortfolios.project', companyFeatures)
                .populate('portfolios.user', userFeatures)
                .populate('portfolios.project', companyFeatures)
                .populate('owners', userFeatures)
                .populate('followers', userFeatures)
                .populate('users', userFeatures)
                .lean();
}

export function all(req, res) {
  User.find({}).exec((err, results) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(results);
  });
}


export function search(req, res) {
  const {keyword} = req.params;
  const refined = common.refineCompanyName(keyword);
  if(refined) {
    companyAutoComplete.getResults(refined, (err, results) => {
      if (err) {
        return res.json([]);
      }
      return res.json(results);
    });
  }
  else return res.json([]);
}

export async function one(req, res) {
  const { link_name } = req.params;
  const result = await getPopulatedCompany(link_name);
  return res.json(result);
}

export async function updateFeatures(req, res) {
  const link_name = req.params.link_name;
  let { features, profilePicture } = req.body;

  try {
    if(features.length > 0) {
      const result = await Company.update({ link_name }, {$set:{ features, profilePicture }});
      res.json(result);
    }
    else {
      console.log('no features', req.body);
      res.json({result: 'error'});
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong getting the data');
  }
}

export async function updateCompany(req, res) {
  const link_name = req.params.link_name;
  const company = req.body;

  try {
    const result = await Company.update({ link_name }, {$set: company});
    res.json(result);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong getting the data');
  }
}

async function createPortfolio(link_name, portfolio) {
  const location = portfolio.location.trim();

  let [ project, company ] = await Promise.all([
    Project.findOne({name: location}),
    Company.findOne({ link_name }),
  ]);

  if(!project) {
    project = new Project({name: location});
    project = await Metadata.populateMetadata('Project', project);
  }

  portfolio.type = 'company';
  portfolio.companyName = company.name;

  return await common.savePortfolio({portfolio, company, project});
}

async function editPortfolio(link_name, portfolio) {
  if(portfolio.locationChanged) {
    const prevProject = await Project.findOne({'portfolios.pid' : portfolio.pid});
    if(prevProject) {
      prevProject.portfolios = prevProject.portfolios.filter(p => p.pid !== portfolio.pid);
      await prevProject.save();
    }
  }

  return await createPortfolio(link_name, portfolio);
}

export async function addPortfolio(req, res) {
  const link_name = req.params.link_name;
  const portfolio = req.body;

  let result;

  if(portfolio.editing) {
    result = await editPortfolio(link_name, portfolio);
  }
  else {
    result = await createPortfolio(link_name, portfolio);
  }

  res.json(result);
  
  projectAutoComplete.buildCache(err => {});
}

export async function deletePortfolio(req, res) {
  const link_name = req.params.link_name;
  const pid = req.params.pid;

  if(!(link_name && pid)) {
    return res.json({error: 'Not enough data'});
  }
  try {
    const prevCompany = await Company.findOne({ link_name, 'companyPortfolios.pid' : pid});
    if(prevCompany) {
      prevCompany.companyPortfolios = prevCompany.companyPortfolios.filter(p => p.pid !== pid);
      await prevCompany.save();
    }

    const prevProject = await Project.findOne({'portfolios.pid' : pid});
    if(prevProject) {
      prevProject.portfolios = prevProject.portfolios.filter(p => p.pid !== pid);
      await prevProject.save();
    }

    await Portfolio.remove({ pid });

    res.json({ pid });
  }
  catch(e) {
    res.json({error: 'error in deleting portfolio ' + pid + ': ' + e});
  }
}

export async function addProduct(req, res) {
  const link_name = req.params.link_name;
  const product = req.body;
  const location = product.location;

  let [company, pid] = await Promise.all([
    Company.findOne({ link_name }),
    Misc.createID('product')
  ]);

  product.pid = pid;
  product.company = company._id;
  company.products.push(product);

  await company.save();
  res.json({company, product});
}

export function add(req, res) {
  User.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

export async function changePortfolioOrder(req, res) {
  const link_name = req.params.link_name;
  let { oldIndex, index } = req.body;

  const company = await Company.findOne({ link_name });
  const portfolios = company.companyPortfolios;
  const filtered = portfolios.filter((p, i) => i !== oldIndex);
  const prev = filtered.filter((p, i) => i < index);
  const post = filtered.filter((p, i) => i >= index);
  const sorted = prev.concat([portfolios[oldIndex]]).concat(post);

  company.companyPortfolios = sorted;
  await company.save();

  res.json(await getPopulatedCompany(link_name));
}

export async function follow(req, res) {
  const link_name = req.params.link_name;
  let userid = req.body.userid;

  const [company, user] = await Promise.all([
    Company.findOne({ link_name }).populate('followers'), 
    User.findOne({ userid }).populate('companyFollowings')
  ]);

  company.followers.addToSet(user);
  user.companyFollowings.addToSet(company);

  await Promise.all([company.save(), user.save()]);

  return res.status(200).json({ following: company, follower: user });
}

export async function unfollow(req, res) {
  const link_name = req.params.link_name;
  let userid = req.body.userid;

  const [company, user] = await Promise.all([
    Company.findOne({ link_name }).populate('followers'), 
    User.findOne({ userid }).populate('companyFollowings')
  ]);

  company.followers.pull(user);
  user.companyFollowings.pull(company);

  await Promise.all([company.save(), user.save()]);

  return res.status(200).json({ following: company, follower: user });
}

export default {
  all,
  search,
  one,
  updateCompany,
  updateFeatures,
  addPortfolio,
  deletePortfolio,
  addProduct,
  changePortfolioOrder,
  add,
  follow,
  unfollow
};
