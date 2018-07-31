/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const MiscSchema = new mongoose.Schema({
  title: { type: String, unique: true},
  data: {},
});

export default mongoose.model('Misc', MiscSchema);