import _ from 'lodash';
import  { models, common } from '../db';

const { 
  Project, 
  projectAutoComplete : autoComplete 
} = models;

export function all(req, res) {
  Project.find({}).exec((err, results) => {
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
  const companyFeatures = common.populateFieldsForPortfolio.companyFeatures;
  const userFeatures = common.populateFieldsForPortfolio.userFeatures;
  const result = await Project
                    .findOne({ link_name })
                    .populate('portfolios.user', userFeatures) 
                    .populate('portfolios.company', companyFeatures) 
                    .populate('users', userFeatures) 
                    .populate('companies', companyFeatures) 
                    .lean();
  return res.json(result);
}

export function add(req, res) {
  Project.create(req.body, (err) => {
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

  Project.findOneAndUpdate(query, data, (err) => {
  if (err) {
    console.log('Error on save!');
    return res.status(500).send('We failed to save for some reason');
  }

  return res.status(200).send('Updated successfully');
  });
}

export async function updateFeatures(req, res) {
  const link_name = req.params.link_name;
  let { features, profilePicture } = req.body;

  try {
    if(features.length > 0) {
      const result = await Project.update({ link_name }, {$set:{ features, profilePicture }});
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

/**
 * Remove a topic
 */
export function remove(req, res) {
  const query = { _id: req.params.id };
  Project.findOneAndRemove(query, (err) => {
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
  add,
  update,
  updateFeatures,
  remove
};
