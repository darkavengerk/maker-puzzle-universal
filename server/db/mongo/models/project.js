/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const Portfolio = require('./portfolio');

const Schema = new mongoose.Schema({
  name: String,
  descriptions: String,
  location: String,
  catagory: String,
  companies: [{type: ObjectId, ref: 'Company'}],
  users: [{type: ObjectId, ref: 'User'}],
  images: [{
      rid: String
  }],
  portfolios : [Portfolio]
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Project' , Schema);

