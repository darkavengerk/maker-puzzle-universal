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

  if(keyword) {
    companyAutoComplete.getResults(keyword, (err, results) => {
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
  const result = await Company
                    .findOne({ link_name })
                    .populate({path:'companyPortfolios.project'})
                    .populate({path:'portfolios.user'})
                    .populate({path:'portfolios.project'})
                    .populate('owner')
                    .populate({path:'users'})
                    .lean();
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

async function createPortfolio(link_name, portfolio) {

  const location = portfolio.location;

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

/**
 * Update a topic
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const omitKeys = ['id', '_id', '_v'];
  const data = _.omit(req.body, omitKeys);

  User.findOneAndUpdate(query, data, (err) => {
  if (err) {
    console.log('Error on save!');
    return res.status(500).send('We failed to save for some reason');
  }

  return res.status(200).send('Updated successfully');
  });
}

/**
 * Remove a topic
 */
export function remove(req, res) {
  const query = { _id: req.params.id };
  User.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  search,
  one,
  updateFeatures,
  addPortfolio,
  deletePortfolio,
  addProduct,
  add,
  update,
  remove
};
