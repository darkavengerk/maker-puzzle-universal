/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  target: String,
  route: String,
  meta: [{
    title: String,
    editable: Boolean,
    optional: Boolean
  }]
});

Schema.statics.populateMetadata = async function(target, doc) {
  const metas = await this.find({target});
  for(let meta of metas) {
    doc[meta.route] = meta.meta;
  }
  return doc;
}

export default mongoose.model('Metadata' , Schema);
