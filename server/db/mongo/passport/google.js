import User from '../models/user';

import  { models } from '../../../db';
import Image from '../models/image';

// const { 
//   Image : ImageFile 
// } = models;

/* eslint-disable no-param-reassign */
/*
  email: 'bbb@ccc',
  name: 'cc',
  gender: 'W',
  agreed: true,
  marketingAgreed: true,
  birthYear: 2002,
  userid: 'bbb' }
*/
export default (req, accessToken, refreshToken, profile, done) => {

  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    const raw = {...profile._json, accessToken};
    ['language', 'emails', 'domain'].map(key => delete raw[key]);
    if (existingUser) {
      return done(null, existingUser);
    }
    return User.findOne({ email: profile._json.emails[0].value }, async (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        await User.update(
          {_id: existingEmailUser._id}, 
          {$set:{google: profile.id, 'makerProfile.google': raw}}
        );
        return done(null, existingEmailUser);
      }
      const user = {};
      user.email = profile._json.emails[0].value;
      user.userid = user.email.split('@')[0];
      user.google = profile.id;
      user.makerProfile = {google: raw};
      user.tokens = [{ kind: 'google', accessToken }];
      user.name = profile.displayName;
      user.picture = await Image.create({original: profile._json.image.url, status:'google'});
      if(profile._json.gender) {
        user.gender = profile._json.gender.toUpperCase()[0];
      }
      if(profile._json.birthday) {
        user.birthYear = profile._json.birthday.split('-')[0];
      }
      const result = await User.signUp(user);
      done(null, result);
    });
  });
};
/* eslint-enable no-param-reassign */
