/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  title: String,
  descriptions: String,
  tags: [String],
  lastUpdateDt: Date,
  images: [{
      rid: String
  }],
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Topic' collection in the MongoDB database
export default Schema;

