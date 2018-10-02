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
  Misc,
  Image,
  Count
} = models;

let mainContents = null;

async function updateCount(Model, content, identifier) {
  const stats = await Count.aggregate([
    { $match: { content } },
    {
      $group: {
        _id:'$total',
        [identifier]: {$push:'$identifier'}
      }
    }
  ]);
  for(let s of stats) {
    const result = await Model.update({[identifier]: s[identifier], count: {$ne:s._id}}, {$set: {count: s._id}}, {multi:true});
  }
}

export async function buildContents(req, res) {
  console.log('build main contents...');
  const loadings = [
    User
      .find({'portfolios.0': {$exists:true}})
      .populate(['portfolios.user', 'portfolios.project'])
      .sort({score:-1})
      .lean(),
    Project
      .find({'portfolios.0': {$exists:true}})
      .populate(['portfolios.user', 'portfolios.company'])
      .sort({score:-1})
      .lean(),
    Company
      .find({'companyPortfolios.0': {$exists:true}})
      .populate(['companyPortfolios.project', 'companyPortfolios.company'])
      .sort({score:-1})
      .lean()
  ];
  const [users, projects, companies] = await Promise.all(loadings);
  projects.sort((a,b) => b.portfolios.length - a.portfolios.length);
  companies.sort((a,b) => b.companyPortfolios.length - a.companyPortfolios.length);

  mainContents = {users, projects, companies};
  if(req && res) {
    res.json({users, projects, companies});
  }
}

export async function main(req, res) {

  const loadings = [
    User
      .find({'portfolios.0': {$exists:true}})
      // .populate(['portfolios.user', 'portfolios.project'])
      .sort({score:-1})
      .limit(10)
      .lean(),
    Project
      .find({'portfolios.0': {$exists:true}})
      // .populate(['portfolios.user', 'portfolios.company'])
      .sort({score:-1})
      .limit(10)
      .lean(),
    Company
      .find({'companyPortfolios.0': {$exists:true}})
      // .populate(['companyPortfolios.project', 'companyPortfolios.company'])
      .sort({score:-1})
      .limit(10)
      .lean(),
    Portfolio
      .find({type:'maker'})
      .populate('user')
      .sort({score:-1})
      .limit(20)
      .lean(),
    Portfolio
      .find({type:'company'})
      .populate('company')
      .sort({score:-1})
      .limit(20)
      .lean(),
    Portfolio
      .find({type:'maker'})
      .populate('user')
      .sort({created:-1})
      .limit(20)
      .lean(),
    Portfolio
      .find({type:'company'})
      .populate('company')
      .sort({created:-1})
      .limit(20)
      .lean()
  ];
  const [users, projects, companies, portfolios, companyPortfolios, portfoliosRecent, companyPortfoliosRecent] = await Promise.all(loadings);
  return res.json({users, projects, companies, portfolios, companyPortfolios, portfoliosRecent, companyPortfoliosRecent});
}

export async function command(req, res) {
  const command = req.params.command;

  if(command === 'migrate-portfolios') {
    const projects = await Project.find({});
    let portfolios = [];
    for(let project of projects) {
      portfolios = portfolios.concat(project.portfolios);
    }
    for(let portfolio of portfolios) {
      await Portfolio.update({ pid: portfolio.pid}, portfolio, {upsert: true});
    }
  }

  if(command === 'image-process-batch') {
    const found = await Image.find({status: 'init'}).limit(100);
    const images = found.map(img => img._id);
    await common.imageProcess({ images });
  }

  if(command === 'portfolio-index-batch') {
    const found = await Portfolio.find();
    for(let p of found) {
      p.keywords = common.makeIndexFromPortfolio(p);
      await p.save();
    }
  }

  if(command === 'update-count-batch' || command === 'update-score-batch') {
    await updateCount(Portfolio, 'portfolio', 'pid');
    await updateCount(Company, 'company', 'link_name');
    await updateCount(Project, 'project', 'link_name');
    await updateCount(User, 'maker', 'userid');
  }

  if(command === 'update-score-batch') {

    const projects = await Project.find(
      {}, 
      {portfolios: 1, companies:1, count:1, score:1}
    );
    for(let p of projects) {
      p.score = p.portfolios.length + p.companies.length + p.count;
      await p.save();
    }

    const companyPortfolios = await Portfolio.find(
      {type: 'company'}, 
      {images: 1, description:1, count:1, score:1}
    );
    for(let p of companyPortfolios) {
      p.score = (p.count * 2) + (p.images.length**2) + Math.sqrt(p.description.length);
      await p.save();
    }

    const makerPortfolios = await Portfolio.find(
      {type: 'maker'}, 
      {images: 1, description:1, count:1, score:1}
    );
    for(let p of makerPortfolios) {
      p.score = (p.count * 2) + (p.images.length**2) + Math.sqrt(p.description.length);
      await p.save();
    }

    const makers = await User.find(
      {}, 
      {portfolios: 1, count:1, score:1}
    );
    for(let m of makers) {
      m.score = (m.portfolios.length) + (m.portfolios.map(x => x.images.length ** 2).reduce((a,b) => a + b, 0)) + 
                m.count + (m.portfolios.map(x => Math.sqrt(x.description.length)).reduce((a,b) => a + b, 0));
      await m.save();
    }

    const companies = await Company.find(
      {}, 
      {companyPortfolios: 1, score:1}
    );
    for(let c of companies) {
      c.score = (c.companyPortfolios.length) + (c.companyPortfolios.map(x => x.images.length ** 2).reduce((a,b) => a + b, 0)) + 
                (c.companyPortfolios.map(x => Math.sqrt(x.description.length)).reduce((a,b) => a + b, 0));
      await c.save();
    }
        
  }

  if(command === 'maker-name-batch') {
    const users = await User.find({'portfolios.0': {$exists: true}});
    for(let user of users) {
      for(let p of user.portfolios) {
        p.makerName = user.name;
      }
      await user.save();
    }
    let plist = await Portfolio.find({user: {$exists:true}}).populate('user');
    for(let p of plist) {
      p.makerName = p.user.name;
      await p.save();
    }
    
    let companies = await Company.find({'portfolios.0': {$exists:true}}).populate('portfolios.user');
    for(let c of companies) {
      for(let p of c.portfolios) {
        p.makerName = p.user.name;
      }
      await c.save();
    }

    let projects = await Project.find({'portfolios.0': {$exists:true}}).populate('portfolios.user');
    for(let pr of projects) {
      for(let p of pr.portfolios) {
        if(p.user) 
          p.makerName = p.user.name;
      }
      await pr.save();
    }
  }

  if(command === 'build-image-contents') {
    await buildContents();
  }

  return res.json({result: 'ok'});
}

export async function increaseCount(req, res) {
  const { content, identifier } = req.body;
  const userid = req.user && req.user.userid? req.user.userid : 'unknown';

  await Count.inc(content, identifier, userid);
  return res.json({result: 'ok'});
}

export async function search(req, res) {
  const keyword = common.cut(req.params.keyword).join(' ');
  
  // const users = await User.find( { $text: { $search: keyword } } ).lean();
  // const companies = await Company.find( { $text: { $search: keyword } } ).lean();
  const portfolios = await Portfolio
                            .find( { $text: { $search: keyword } }, {score: { $meta: "textScore" }} )
                            .sort( { score: { $meta: "textScore" } } )
                            .limit(100)
                            .populate(['company', 'user'])
                            .lean();
  
  // const projects = await Project
  //                         .find( { $text: { $search: keyword } }, {score: { $meta: "textScore" }} )
  //                         .sort( { score: { $meta: "textScore" } } )
  //                         .lean();
  res.json({ result: { portfolios } });
}

export default {
  main,
  command,
  search,
  increaseCount
};
