/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
  title: String,
  category: String,
  spec: String,
  companyName: String,
  company: {type: ObjectId, ref: 'Company'},
  lastUpdated: {type:Date, default: Date.now},
  images: [String],
  pid: String,
  isPrivate: Boolean
});

export default ProductSchema;