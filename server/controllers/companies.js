import _ from 'lodash';
import Company, {autoComplete} from '../db/mongo/models/company';

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
                    .populate({path:'portfolios.user', populate:{path:'picture'}})
                    .populate('owner')
                    .lean();
  return res.json(result);
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
  add,
  update,
  remove
};
