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
  makerName: String,
  project: {type: ObjectId, ref: 'Project'},
  user: {type: ObjectId, ref: 'User'},
  company: {type: ObjectId, ref: 'Company'},
  tags: [String],
  lastUpdated: {type:Date, default: Date.now},
  created: {type:Date, default: Date.now},
  images: [{type: ObjectId, ref: 'ImageFile'}],
  pid: String,
  isPrivate: Boolean,
  type: {type:String, default:'maker'},
  keywords: [String],
  score: {type: Number, default: 0},
  count: {type: Number, default: 0},
}, { _id: false });

export default Schema;

