import passport from 'passport';
import  { models, common } from '../db';

const { 
  User,
  Company, 
  companyAutoComplete, 
  Project, 
  projectAutoComplete,
  Portfolio,
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
              .populate('portfolios.user')
              .populate('portfolios.project')
              .populate('portfolios.company')
              .populate(['followers', 'followings'])
              .lean();

  if (!user) {
    // return res.status(500).send('Something went wrong getting the data');
    return res.json({});
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

export async function updateFeatures(req, res) {
  const userid = req.params.id;
  let {features, about, picture, makerProfile} = req.body;

  try {
    const result = await User.update({userid:userid}, {$set:{features, about, picture, makerProfile}});
    res.json(result);
  }
  catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong getting the data');
  }

  const newCompanies = makerProfile.companies.filter(company => company.newItem);
  const companyNames = newCompanies.map(company => company.name);
  let isCompanyCreated = false;
  for(let name of companyNames) {
    try {
      let company = new Company({ name });
      company = await Metadata.populateMetadata('Company', company);
      await company.save();
      isCompanyCreated = true;
    }
    catch (err) {
      console.log('Skip making company for: ' + name);
    }
  }
  if(isCompanyCreated) companyAutoComplete.buildCache(err => {});
}

async function checkFollowingUsers(userid, followingUserId, isConnecting) {

  const [follower, following] = await Promise.all([
    User.findOne({ userid }).populate('followings'), 
    User.findOne({userid: followingUserId}).populate('followers')
  ]);

  if(isConnecting) {
    follower.followings.addToSet(following);
    following.followers.addToSet(follower);
  }
  else {
    follower.followings.pull(following);
    following.followers.pull(follower);
  }

  await Promise.all([follower.save(), following.save()]);

  return [follower, following];
}

export async function follow(req, res) {
  const userid = req.params.id;
  let followingUserId = req.body.userid;

  const [follower, following] = await checkFollowingUsers(userid, followingUserId, true);

  res.json({follower, following});
}

export async function unfollow(req, res) {
  const userid = req.params.id;
  let followingUserId = req.body.userid;

  const [follower, following] = await checkFollowingUsers(userid, followingUserId, false);

  res.json({follower, following});
}

export async function addPortfolio(req, res) {
  const userid = req.params.id;
  const portfolio = req.body;

  let result;

  if(portfolio.editing) {
    result = await editPortfolio(userid, portfolio);
  }
  else {
    result = await createPortfolio(userid, portfolio);
  }

  res.json(result);
  
  companyAutoComplete.buildCache(err => {});
  projectAutoComplete.buildCache(err => {});
}

export async function deletePortfolio(req, res) {
  const userid = req.params.id;
  const pid = req.params.pid;

  if(!(userid && pid)) {
    return res.json({error: 'Not enough data'});
  }
  try {
    const prevCompany = await Company.findOne({'portfolios.pid' : pid});
    if(prevCompany) {
      prevCompany.portfolios = prevCompany.portfolios.filter(p => p.pid !== pid);
      await prevCompany.save();
    }

    const prevProject = await Project.findOne({'portfolios.pid' : pid});
    if(prevProject) {
      prevProject.portfolios = prevProject.portfolios.filter(p => p.pid !== pid);
      await prevProject.save();
    }

    const userFound = await User.findOne({ userid });
    if(userFound) {
      userFound.portfolios = userFound.portfolios.filter(p => p.pid !== pid);
      await userFound.save();
    }

    await Portfolio.remove({ pid });

    res.json({ pid });
  }
  catch(e) {
    res.json({error: 'error in deleting portfolio ' + pid + ': ' + e});
  }
}

async function createPortfolio(userid, portfolio) {
  const location = portfolio.location;
  const companyName = portfolio.companyName;

  let [ user, project, company ] = await Promise.all([
    User.findOne({userid}),
    Project.findOne({name: location}),
    Company.findOne({name: companyName}),
  ]);

  if(!project) {
    project = new Project({name: location});
    project = await Metadata.populateMetadata('Project', project);
  }

  if(!company) {
    company = new Company({name: companyName});
    company = await Metadata.populateMetadata('Company', company);
  }

  return await common.savePortfolio({portfolio, user, company, project});
}

async function editPortfolio(userid, portfolio) {

  if(portfolio.companyChanged) {
    const prevCompany = await Company.findOne({'portfolios.pid' : portfolio.pid});
    if(prevCompany) {
      prevCompany.portfolios = prevCompany.portfolios.filter(p => p.pid !== portfolio.pid);
      await prevCompany.save();
    }
  }

  if(portfolio.locationChanged) {
    const prevProject = await Project.findOne({'portfolios.pid' : portfolio.pid});
    if(prevProject) {
      prevProject.portfolios = prevProject.portfolios.filter(p => p.pid !== portfolio.pid);
      await prevProject.save();
    }
  }

  return await createPortfolio(userid, portfolio);
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
export async function signUp(req, res, next) {
  let userInfo = {...req.body};
  let userid = req.body.email.split('@')[0];
  let existingUser = await User.findOne({ userid });
  let idCount = 0;
  while(existingUser) {
    idCount += 1;
    userid += idCount;
    existingUser = await User.findOne({ userid });
  }
  userInfo['userid'] = userid;

  existingUser = await User.findOne({ email: userInfo.email });
  if (existingUser) {
    return res.sendStatus(409);
  }

  userInfo = await Metadata.populateMetadata('User', userInfo);

  const user = await User.create(userInfo);
  
  return req.logIn(user, (loginErr) => {
    if (loginErr) return res.sendStatus(401);
    return res.json(user);
  });
}

export default {
  all,
  single,
  login,
  logout,
  signUp,
  updateFeatures,
  addPortfolio,
  deletePortfolio,
  follow,
  unfollow
};
