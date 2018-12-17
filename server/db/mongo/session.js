import session from 'express-session';
import connectMongo from 'connect-mongo';
import { db } from './constants';

const MongoStore = connectMongo(session);

export default () =>
  new MongoStore(
    {
      url: db,
      autoReconnect: true,
      ttl: 30 * 24 * 60 * 60 // = 30 days
    }
  );
