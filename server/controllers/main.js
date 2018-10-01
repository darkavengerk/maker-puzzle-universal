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

export async function buildContents(req, res) {
  console.log('build main contents...');
  const loadings = [
    User
      .find({'portfolios.0': {$exists:true}})
      .populate(['portfolios.user', 'portfolios.project'])
      .lean(),
    Project
      .find({'portfolios.0': {$exists:true}})
      .populate(['portfolios.user', 'portfolios.company'])
      .lean(),
    Company
      .find({'companyPortfolios.0': {$exists:true}})
      .populate(['companyPortfolios.project', 'companyPortfolios.company'])
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

  if(!mainContents) {
    await buildContents();
  }
  return res.json(mainContents);
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
  const keyword = req.params.keyword;
  
  // const users = await User.find( { $text: { $search: keyword } } ).lean();
  // const companies = await Company.find( { $text: { $search: keyword } } ).lean();
  const portfolios = await Portfolio
                            .find( { $text: { $search: keyword } }, {score: { $meta: "textScore" }} )
                            .sort( { score: { $meta: "textScore" } } )
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
