import User from '../models/user';

const sessionMap = {};

export default (id, done) => {
  // temp code for memory leak checking
  return User.findById(id, (err, user) => {
    done(err, user);
  });
  const now = new Date().getTime();
  if(sessionMap[id]) {
    const time = sessionMap[id].time;
    if(now - time < 5000) {
      sessionMap[id].time = now;
      return done(null, sessionMap[id].user);
    }
  }
  User.findById(id, (err, user) => {
    sessionMap[id] = {user, time: new Date()};
    done(err, user);
  });
};
