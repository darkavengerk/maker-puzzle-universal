/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  companyName: String,
  project: {type: ObjectId, ref: 'Project'},
  user: {type: ObjectId, ref: 'User'},
  company: {type: ObjectId, ref: 'User'},
  tags: [String],
  lastUpdated: {type:Date, default: Date.now},
  images: [{type: ObjectId, ref: 'ImageFile'}],
  pid: String,
  isPrivate: Boolean
});

export default Schema;

