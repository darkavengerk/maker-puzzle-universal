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

function getContents(model, query, sort, limit, loaded, populate) {
  const sorting = sort === 'popular'? {score:-1} : {created:-1};
  return model
      .find(query)
      .populate(populate)
      .sort(sorting)
      .skip(loaded)
      .limit(limit)
      .lean();
}

function getUserContents({sort='popular', loaded=0, limit=6}) {
  return getContents(User, {'portfolios.0': {$exists:true}}, sort, limit, loaded, []);
}

function getProjectContents({sort='popular', loaded=0, limit=6}) {
  return getContents(Project, {'portfolios.0': {$exists:true}}, sort, limit, loaded, ['portfolios.images']);
}

function getCompanyContents({sort='popular', loaded=0, limit=6}) {
  return getContents(Company, {'companyPortfolios.0': {$exists:true}}, sort, limit, loaded, []);
}

function getMakerPorfolioContents({sort='popular', loaded=0, limit=18}) {
  return getContents(Portfolio, {type:'maker'}, sort, limit, loaded, ['user', 'company', 'portfolios.images']);
}

function getCompanyPorfolioContents({sort='popular', loaded=0, limit=9}) {
  return getContents(Portfolio, {type:'company'}, sort, limit, loaded, ['user', 'company', 'portfolios.images']);
}

export async function buildContents(req, res) {
  console.log('build main contents...', new Date().toISOString());
  const loadings = [
    getUserContents({}),
    getProjectContents({}),
    getCompanyContents({}),
    getMakerPorfolioContents({}),
    getCompanyPorfolioContents({}),
    getMakerPorfolioContents({sort:'recent', limit:12}),
    getCompanyPorfolioContents({sort:'recent', limit:6})
  ];
  const [users, projects, companies, portfolios, companyPortfolios, portfoliosRecent, companyPortfoliosRecent] = await Promise.all(loadings);
  mainContents = { users, projects, companies, portfolios, companyPortfolios, portfoliosRecent, companyPortfoliosRecent };
  if(req && res) {
    res.json(mainContents);
  }
}

export async function main(req, res) {
  if(!mainContents)
    await buildContents();
  return res.json(mainContents);
}

export async function more(req, res) {
  const params = req.params;
  const loaded = Number.parseInt(params.loaded || 0);
  const { topic, subtype } = params;

  if(topic === 'project') {
    const result = await getProjectContents({ loaded });
    return res.json({ result, title:'프로젝트 들여다보기', topic, subtype });
  }

  if(topic === 'portfolio') {    
    const sort = params.sort;
    const loader = subtype.startsWith('company')? getCompanyPorfolioContents : getMakerPorfolioContents;
    const result = await loader({ sort, limit:12, loaded });
    const prefix = (sort === 'popular')? '인기 ' : '새로 등록된 ';
    return res.json({ result, title: prefix + ((subtype === 'company')? '수행실적' : '포트폴리오'), topic, subtype: subtype + sort });
  }

  if(topic === 'company') {
    const result = await getCompanyContents({ loaded });
    return res.json({ result, title:'주목할만한 기업들', topic, subtype });
  }

  if(topic === 'maker') {
    const result = await getUserContents({ loaded });
    return res.json({ result, title:'주목할만한 메이커들', topic, subtype });
  }
  return res.json({});
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
    await Portfolio.collection.dropIndex("keywords_text");
    await Portfolio.collection.createIndex({keywords:"text"});
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
  more,
  command,
  search,
  increaseCount
};
