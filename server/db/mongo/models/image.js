/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ImageFileSchema = new mongoose.Schema({
  original: { type: String },
  versions: {},
  status: { type: String, default: 'init'},
  created: {type:Date, default: Date.now},
});

export default mongoose.model('ImageFile', ImageFileSchema);