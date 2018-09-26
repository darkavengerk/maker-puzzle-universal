/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const CountSchema = new mongoose.Schema({
  content: String,
  identifier: String,
  total : { type: Number, default: 0 },
  detail: {},
});

CountSchema.statics.inc = async function(content, identifier, userid) {
  const updateQuery = {content, identifier, $inc: {total:1, ['detail.' + (userid | 'unknown')]:1}};
  const { data } = await this.findOneAndUpdate({ content, identifier }, updateQuery, {new:true}).lean();
  return data;
}

export default mongoose.model('Count', CountSchema);