import _ from 'lodash';
import passport from 'passport';
import crypto from 'crypto';
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

export async function getPopulatedUser(userid) {
  const companyFeatures = common.populateFieldsForPortfolio.companyFeatures;
  const userFeatures = common.populateFieldsForPortfolio.userFeatures;
  return await User
    .findOne({ userid }, {email:0, password:0})
    .populate('companiesOwned', companyFeatures)
    .populate('portfolios.user', userFeatures)
    .populate('portfolios.project', companyFeatures)
    .populate('portfolios.company', companyFeatures)
    .populate('followers', userFeatures)
    .populate('followings', userFeatures)
    .populate('companyFollowings', companyFeatures)
    .lean()
}

export async function single(req, res) {
  let user = await getPopulatedUser(req.params.id);

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
    return req.logIn(user, async (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      const populated = await getPopulatedUser(user.userid);
      populated.feed = await common.buildFeed(populated);
      return res.json(populated);
    });
  })(req, res, next);
}

export async function passwordRequest(req, res) {
  const { email } = req.params;
  const date = new Date();
  const user = await User.findOne({ email }).lean();

  if(!user) return res.status(404).send('Not authorized');

  const userid = user.userid;
  const token = crypto.randomBytes(15).toString('hex');

  let authPassword = await Misc.findOne({ title: 'auth-password' }).lean();
  authPassword.data[userid] = {
    token, userid, date
  }
  await Misc.update({ title: 'auth-password' }, authPassword);
  common.sendEmail(
    user.email,
    'Password change link',
    `<a href="http://localhost:3000/account/password/${userid}/${token}" target="blank">Click Here</a>`);
  res.json({result: 'ok'});
}

export async function password(req, res) {
  // auth
  const {id: userid} = req.params;
  const { hash, password } = req.body;
  if(req.user && (req.user.userid === userid)) {
    // logged in
    return changePassword(userid, password, (err, result) => res.json(result));
  }

  // check auth
  // [{ token, date, userid }]
  const authPassword = await Misc.findOne({title:'auth-password'});
  if(hash && authPassword) {
    const matched = authPassword.data && authPassword.data[userid];
    if(matched && matched.token === hash) {
      const timeDifference = new Date()-matched.date;
      if(timeDifference < 2 * 1000 * 60 * 60) { // 2 hours limit
        return changePassword(userid, password, (err, result) => res.json(result));
      }
      else {
        return res.status(404).send('Time out');
      }        
    }
  }
  return res.status(404).send('Not authorized');
}

async function changePassword(userid, password, cb) {
  User.encryptPassword(password, async (err, hash) => {
    const result = await User.update({ userid }, {$set: { password: hash }});
    cb(err, result);
  });
}

export async function addCompany(req, res) {
  const userid = req.params.id;
  let name = req.body.name;

  let companyFound = await Company.findOne({ name });

  if(!companyFound) {
    companyFound = new Company({ name });
    companyFound = await Metadata.populateMetadata('Company', companyFound);
    await companyFound.save();
    companyAutoComplete.buildCache(err => {});
  }

  const user = await User.findOne({ userid });
  if(!user.companiesOwned) user.companiesOwned = [];
  user.companiesOwned.addToSet(companyFound._id);
  await user.save();

  await Company.update({ name }, {$addToSet : {owners: user._id}});

  res.json({maker: await getPopulatedUser(userid), company: companyFound});
}

function isSamePortfolios(p1, p2) {
  return ( p1.pid ) === ( p2.pid );
}

export async function changePortfolioOrder(req, res) {
  const userid = req.params.id;
  let { oldIndex, index } = req.body;

  const user = await User.findOne({ userid });
  const portfolios = user.portfolios;
  const filtered = portfolios.filter((p, i) => i !== oldIndex);
  const prev = filtered.filter((p, i) => i < index);
  const post = filtered.filter((p, i) => i >= index);
  const sorted = prev.concat([portfolios[oldIndex]]).concat(post);

  user.portfolios = sorted;
  await user.save();

  res.json(await getPopulatedUser(userid));
}

export async function updateUser(req, res) {
  const userid = req.params.id;
  const excludes = ['_id', 'type', 'uploadCount', 'tokens', '__v', 'score', 'count'];
  let user = _.omit(req.body, excludes);

  await User.update({userid:userid}, {$set: user});
  await updateFeatures(req, res);
}

export async function updateFeatures(req, res) {
  const userid = req.params.id;
  let {features, about, picture, makerProfile} = req.body;

  if(makerProfile.companies) {
    makerProfile.companies = makerProfile.companies.map(company => ({...company, name: common.refineCompanyName(company.name)}));
  }

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
  const location = portfolio.location.trim();
  const companyName = common.refineCompanyName(portfolio.companyName);
  portfolio.companyName = companyName;

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

// export async function signUp(req, res, next) {
//   let userInfo = {...req.body};
//   let userid = req.body.email.split('@')[0];
//   let existingUser = await User.findOne({ userid });
//   let idCount = 0;
//   while(existingUser) {
//     idCount += 1;
//     userid += idCount;
//     existingUser = await User.findOne({ userid });
//   }
//   userInfo['userid'] = userid;

//   existingUser = await User.findOne({ email: userInfo.email });
//   if (existingUser) {
//     return res.sendStatus(409);
//   }

//   userInfo = await Metadata.populateMetadata('User', userInfo);

//   const user = await User.create(userInfo);
  
//   return req.logIn(user, (loginErr) => {
//     if (loginErr) return res.sendStatus(401);
//     return res.json(user);
//   });
// }

/**
 * POST /signup
 * Create a new local account
 */
export async function signUp(req, res, next) {
  let userid = req.body.email.split('@')[0];
  let userInfo = {...req.body, userid };

  try {
    const user = await User.signUp(userInfo);
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.sendStatus(401);
      return res.json(user);
    });
  }
  catch(e) {
    res.sendStatus(e);
    return;
  }

}

export default {
  all,
  single,
  login,
  logout,
  signUp,
  password,
  passwordRequest,
  updateUser,
  updateFeatures,
  addCompany,
  addPortfolio,
  changePortfolioOrder,
  deletePortfolio,
  follow,
  unfollow
};
