import {db_uri} from '../../../config/secrets'

console.log(db_uri);

export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || db_uri;

export default {
  db
};
