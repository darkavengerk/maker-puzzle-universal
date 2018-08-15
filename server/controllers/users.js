import passport from 'passport';
import  { models } from '../db';

const { 
  User,
  Company, 
  companyAutoComplete, 
  Project, 
  projectAutoComplete,
  Metadata,
  Misc 
} = models;

export function all(req, res) {
  User.find({}).exec((err, users) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(users);
  });
}

export async function single(req, res) {
  let user = await User
              .findOne({'userid':req.params.id})
              .populate('picture')
              .populate('portfolios.user')
              .populate('portfolios.project')
              .populate('portfolios.images')
              .lean();

  if (!user) {
    // return res.status(500).send('Something went wrong getting the data');
    return res.json({});
  }
  return res.json(user);
}

export async function portfolio(req, res) {
  const {pid} = req.params;
  let user = await User
              .findOne({'userid':req.params.id})
              .populate('picture')
              .populate({path: 'portfolios.project', populate: 'profilePicture'})
              .populate({path: 'portfolios.images'})
              .lean();

  if (!user) {
    return res.status(500).send('Something went wrong getting the data');
  }

  user.portfolioSelected = { pid };
  let portfolios = user.portfolios.filter(pf => pf.pid === req.params.pid);
  if(portfolios && portfolios[0]) {
    user.portfolioSelected.portfolio = portfolios[0];
  }

  return res.json(user);
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
  let {features, about, picture} = req.body;
  picture = picture._id || picture;

  User.update({userid:userid}, {$set:{features, about, picture}}, (err, result) => {
    if (err) {
      return res.status(500).send('Something went wrong getting the data');
    }
    res.json(result);
  });
}

export async function addPortfolio(req, res) {
  const userid = req.params.id;

  const portfolio = req.body;
  const location = portfolio.location;
  const companyName = portfolio.companyName;

  let [user, project, company, pid] = await Promise.all([
    User.findOne({userid}), 
    Project.findOne({name: location}),
    Company.findOne({name: companyName}),
    Misc.createID('portfolio')
  ]);

  portfolio.user = user._id;
  portfolio.pid = pid;
  // portfolio.images = portfolio.images.map(p => p._id);

  if(!project) {
    project = new Project({name: location});
    project = await Metadata.populateMetadata('Project', project);
  }
  portfolio.project = project._id;

  if(!company) {
    company = new Company({name: companyName});
    company = await Metadata.populateMetadata('Company', company);
  }
  portfolio.company = company._id;
  
  user.portfolios.push(portfolio);
  project.portfolios.push(portfolio);
  project.users.addToSet(user._id);
  company.portfolios.push(portfolio);
  company.users.addToSet(user._id);
  company.projects.addToSet(project._id);
  await Promise.all([user.save(), project.save(), company.save()]);

  res.json({user, project, company, portfolio});
  
  companyAutoComplete.buildCache(err => {});
  projectAutoComplete.buildCache(err => {});
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
  portfolio,
  login,
  logout,
  signUp,
  updateFeatures,
  addPortfolio,
};
