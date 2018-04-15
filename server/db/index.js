import { DB_TYPE } from '../../config/env';

let dbConfig = null;

dbConfig = require('./mongo').default;

export const connect = dbConfig.connect;
export const passport = dbConfig.passport;
export const session = dbConfig.session;

