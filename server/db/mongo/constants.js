import {db_uri} from '../../../config/app'

export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || db_uri;

console.log(db_uri);

export default {
  db
};
