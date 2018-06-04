import passport from 'passport';
import User from '../db/mongo/models/user';

export function all(req, res) {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(users);
  });
}

export function single(req, res) {
  User.findOne({'userid':req.params.id}).lean().exec((err, user) => {
    if (err || !user) {
      console.log('Error in first query', err);
      console.log(user);
      return res.status(500).send('Something went wrong getting the data');
    }

    if(req.params.pid) {
      user.portfolioSelected = {pid:req.params.pid};
      let portfolios = user.portfolios.filter(pf => pf.pid === req.params.pid);
      if(portfolios && portfolios[0]) {
        user.portfolioSelected.portfolio = portfolios[0];
      }
    }

    return res.json(user);
  });
}

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.sendStatus(401);
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.json(user);
    });
  })(req, res, next);
}

export function updateFeatures(req, res) {
  const userid = req.params.id;
  const {features, about, profile} = req.body;

  User.update({userid:userid}, {$set:{features, about, 'profile.picture':profile.picture}}, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong getting the data');
    }

    res.json(result);
  });
}

export function addPortfolio(req, res) {
  const userid = req.params.id;

  const portfolio = req.body;

  User.findOneAndUpdate({userid}, {$push:{portfolios:portfolio}}, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong getting the data');
    }

    res.json(result);
  });
}

/**
 * POST /logout
 */
export function logout(req, res) {
  req.logout();
  res.sendStatus(200);
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.sendStatus(409);
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.sendStatus(401);
        return res.sendStatus(200);
      });
    });
  });
}

export default {
  all,
  single,
  login,
  logout,
  signUp,
  updateFeatures,
  addPortfolio
};
