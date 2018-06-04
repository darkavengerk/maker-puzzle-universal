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
  // project: {type: ObjectId, ref: 'Project'},
  // user: {type: ObjectId, ref: 'User'},
  tags: [String],
  lastUpdated: {type:Date, default: Date.now},
  images: [String],
  pid: String,
  isPublic: Boolean
});

export default Schema;

