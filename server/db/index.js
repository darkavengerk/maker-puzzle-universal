const dbConfig = require('./mongo').default;

export const connect = dbConfig.connect;
export const passport = dbConfig.passport;
export const session = dbConfig.session;
export const common = dbConfig.common;
export const models = dbConfig.models;

