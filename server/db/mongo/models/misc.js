/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const MiscSchema = new mongoose.Schema({
  title: { type: String, unique: true},
  data: {},
});

MiscSchema.statics.createID = async function(target) {
  const updateQuery = {};
  updateQuery['data.' + target] = 1;
  const { data } = await this.findOneAndUpdate({title:'counters'}, {$inc: updateQuery}, {new:true}).lean();
  return data[target];
}

export default mongoose.model('Misc', MiscSchema);