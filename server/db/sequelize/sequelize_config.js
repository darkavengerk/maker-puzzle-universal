import { DB_TYPE } from '../../../config/env';

switch (DB_TYPE) {
  default:
    throw new Error(`No sequelize config found for db type '${DB_TYPE}'`);
}
