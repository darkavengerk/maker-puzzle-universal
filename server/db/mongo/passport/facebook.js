import User from '../models/user';

import  { models } from '../../../db';
import Image from '../models/image';

/*
{ id: '10156825308443886',
  username: undefined,
  displayName: 'Jeong Hyeon Kim',
  name: 
   { familyName: 'Kim',
     givenName: 'Jeong Hyeon',
     middleName: undefined },
  gender: undefined,
  profileUrl: undefined,
  emails: [ { value: 'darkavengerk@gmail.com' } ],
  photos: 
   [ { value: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10156825308443886&height=50&widt
h=50&ext=1552198468&hash=AeRqKX7A8Jtzp8ox' } ],
  provider: 'facebook',
  _raw: '{"id":"10156825308443886","email":"darkavengerk\\u0040gmail.com","last_name":"Kim","first_name":"Jeon
g Hyeon","name":"Jeong Hyeon Kim","picture":{"data":{"height":50,"is_silhouette":false,"url":"https:\\/\\/plat
form-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=10156825308443886&height=50&width=50&ext=1552198468&h
ash=AeRqKX7A8Jtzp8ox","width":50}}}',
  _json: 
   { id: '10156825308443886',
     email: 'darkavengerk@gmail.com',
     last_name: 'Kim',
     first_name: 'Jeong Hyeon',
     name: 'Jeong Hyeon Kim',
     picture: { data: [Object] } } }
*/
export default (req, accessToken, refreshToken, profile, done) => {
  // return done(null, profile);
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
  return User.findOne({ facebook: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) {
      return done(null, existingUser);
    }
    return User.findOne({ email: profile._json.email }, async (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        await User.update({_id: existingEmailUser._id}, {$set:{facebook: profile.id}});
        return done(null, existingEmailUser);
      }
      const user = {};
      user.email = profile._json.email;
      user.userid = user.email.split('@')[0];
      user.facebook = profile.id;
      user.tokens = [{ kind: 'facebook', accessToken }];
      user.name = profile._json.name;
      user.picture = await Image.create({original: profile.photos[0].value, status:'facebook'});
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
