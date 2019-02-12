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
  // if (req.user) {
  //   return User.findOne({ google: profile.id }, (findOneErr, existingUser) => {
  //     if (existingUser) {
  //       return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
  //     }
  //     return User.findById(req.user.id, (findByIdErr, user) => {
  //       user.google = profile.id;
  //       user.tokens.push({ kind: 'google', accessToken });
  //       user.name = user.profile.name || profile.displayName;
  //       user.gender = user.profile.gender || profile._json.gender;
  //       user.picture = user.profile.picture || profile._json.picture;
  //       user.save((err) => {
  //         done(err, user, { message: 'Google account has been linked.' });
  //       });
  //     });
  //   });
  // }
  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) {
      return done(null, existingUser);
    }
    return User.findOne({ email: profile._json.emails[0].value }, async (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        await User.update({_id: existingEmailUser._id}, {$set:{google: profile.id}});
        return done(null, existingEmailUser);
      }
      const user = {};
      user.email = profile._json.emails[0].value;
      user.userid = user.email.split('@')[0];
      user.google = profile.id;
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
