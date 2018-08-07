import _ from 'lodash';
import User from '../db/mongo/models/user';
import Company, {autoComplete as companyAutoComplete} from '../db/mongo/models/company';
import Project, {autoComplete as projectAutoComplete} from '../db/mongo/models/project';
import Metadata from '../db/mongo/models/metadata';
import Misc from '../db/mongo/models/misc';

/**
 * List
 */
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
    autoComplete.getResults(keyword, (err, results) => {
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
                    .populate({path:'portfolios.images'})
                    .populate({path:'companyPortfolios.images'})
                    .populate({path:'portfolios.user', populate:{path:'picture'}})
                    .populate({path:'products.images'})
                    .populate('owner')
                    .lean();
  return res.json(result);
}

export async function addPortfolio(req, res) {
  const { link_name } = req.params;

  const portfolio = req.body;
  const location = portfolio.location;

  let [project, company, pid] = await Promise.all([
    Project.findOne({name: location}),
    Company.findOne({link_name}), 
    Misc.createID('portfolio')
  ]);

  portfolio.pid = pid;

  if(!project) {
    project = new Project({name: location});
    project = await Metadata.populateMetadata('Project', project);
  }
  portfolio.project = project._id;

  project.portfolios.push(portfolio);
  company.companyPortfolios.push(portfolio);
  company.projects.addToSet(project._id);
  await Promise.all([project.save(), company.save()]);

  res.json({project, company, portfolio});
  
  projectAutoComplete.buildCache(err => {});
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
  addPortfolio,
  addProduct,
  add,
  update,
  remove
};
