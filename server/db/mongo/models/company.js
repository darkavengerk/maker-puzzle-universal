/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const Portfolio = require('./portfolio');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = new mongoose.Schema({
  workType: String,
  name: String,
  location: String,
  homepage: String,
  telephone: String,
  capacity: String,
  profileImage: String,
  backImage: String,
  tags: [String],
  projects: [{type: ObjectId, ref: 'Project'}],
  users: [{type: ObjectId, ref: 'User'}],
  images: [{
    rid: Number
  }],
  portfolios : [Portfolio]
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Company' , Schema);

