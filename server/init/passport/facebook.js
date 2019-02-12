import { Strategy as FacebookStrategy } from 'passport-facebook';
import { facebook } from '../../../config/secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

export default (passport) => {
  if (!dbPassport || !dbPassport.facebook || !typeof dbPassport.facebook === 'function') {
    console.warn(unsupportedMessage('passport-facebook-oauth'));
    return;
  }

  passport.use(new FacebookStrategy({
    clientID: facebook.clientID,
    clientSecret: facebook.clientSecret,
    callbackURL: facebook.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name', 'displayName', 'gender', 'photos']
  }, dbPassport.facebook));
};
