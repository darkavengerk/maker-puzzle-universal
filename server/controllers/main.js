import passport from 'passport';

import { getPopulatedUser } from '../controllers/users';
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

function getContents(model, query, sort, limit, loaded, populate) {
  if(typeof(sort) === 'string') {
    sort = (sort === 'popular')? {score:-1} : {_id:-1};
  }
  model =  model
      .find(query, {meta:0, keywords:0})
      // .populate(populate, '-email -_id -password -tags')
      .sort(sort)
      .skip(loaded)
      .limit(limit)
      .lean();
  return cleanPopulate(model, populate);
}

function searchContents(keyword, query, limit, loaded, populate, shouldSplitKeyword) {
  keyword = shouldSplitKeyword? common.cut(keyword).join(' ') : keyword;  
  loaded = loaded? loaded : 0;
  return searchPortfolios(keyword, query, limit, loaded, populate);
}

function searchCategories({keywords, limit=12, loaded=0}) {
  return searchContents(
    keywords.join(' '), 
    {isPrivate:false, type:'company'}, 
    limit, loaded, ['user', 'company', 'images'], false);    
}

function getUserContents({sort='popular', loaded=0, limit=6}) {
  return getContents(User, {'portfolios.0': {$exists:true}}, sort, limit, loaded, []);
}

function getProjectContents({sort='popular', loaded=0, limit=24}) {
  if(sort === 'recent') {
    sort = {lastUpdated: -1};
  }
  return getContents(Project, {'portfolios.3': {$exists:true}}, sort, limit, loaded, ['portfolios.images']);
}

function getCompanyContents({sort='popular', loaded=0, limit=12}) {
  return getContents(Company, {'companyPortfolios.0': {$exists:true}}, sort, limit, loaded, []);
}

function getMakerPorfolioContents({sort='recent', loaded=0, limit=18}) {
  return getContents(Portfolio, {type:'maker', isPrivate:false, 'images.0': {$exists:true}}, sort, limit, loaded, ['user', 'company', 'images']);
}

function getCompanyPorfolioContents({sort='popular', loaded=0, limit=9}) {
  return getContents(Portfolio, {type:'company'}, sort, limit, loaded, ['user', 'company', 'images']);
}

let portfolioCategories = []

async function getSubContents() {
  const contentsInfo = await Misc.findOne({title: 'sub-contents'}).lean();
  portfolioCategories = contentsInfo.data;
  const contents = portfolioCategories.map(async info => {
    const portfolios = await searchCategories({ keywords: info.keywords });
    info.portfolios = portfolios;
    return info;
  })
  return await Promise.all(contents);
}

export async function buildContents(req, res) {
  console.log('build main contents...', new Date().toISOString());
  const loadings = [
    getProjectContents({limit: 28}),
    getProjectContents({sort: 'recent'}),
    // getCompanyContents({}),
    // getMakerPorfolioContents({}),
    // getCompanyPorfolioContents({}),
    getCompanyPorfolioContents({sort:'recent', limit: 24})
  ];
  // const [projects, projectsNew, companies, portfolios, companyPortfolios, companyPortfoliosRecent] = await Promise.all(loadings);
  // mainContents = { projects, projectsNew, companies, portfolios, companyPortfolios, companyPortfoliosRecent, subContents: await getSubContents() };
  const [projects, projectsNew, companyPortfoliosRecent] = await Promise.all(loadings);
  const data = { projects, projectsNew, companyPortfoliosRecent, subContents: await getSubContents() };
  await Misc.update({title: 'main-contents'}, {title: 'main-contents', data}, {upsert: true});
  if(req && res) {
    res.json(data);
  }
  return data;
}

async function populatePortfoilios(portfolios) {
  var opts = [
      { path: 'company' }
    , { path: 'project' }
    , { path: 'user' }
  ];
  return await Portfolio.populate(portfolios, opts);
}

export async function main(req, res) {
  const mainContents = await Misc.findOne({title: 'main-contents'}).lean();
  const data = mainContents.data || await buildContents();
  if(req.user && req.user.userid) {
    const user = await getPopulatedUser(req.user.userid);
    // mainContents.feed = await populatePortfoilios((await buildFeed(user)).slice(0,18));
  }
  return res.json(data);
}

export async function more(req, res) {
  const params = req.params;
  const loaded = Number.parseInt(params.loaded || 0);
  const { topic, subtype } = params;

  if(topic === 'project') {
    const { sort } = params;
    const result = await getProjectContents({ sort, loaded });
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

  if(topic === 'category') {
    let selected = portfolioCategories.filter(c => c.category === subtype);
    if(selected && selected.length === 1) {
      selected = selected[0];
      const query = { keywords: selected.keywords, limit: 9, loaded: loaded};
      const result = await searchCategories(query);
      return res.json({ result, title: selected.title, topic, subtype });
    }
  }
  return res.json({});
}

export async function command(req, res) {
  const command = req.params.command;

  if(command === 'build-main-contents') {
    await buildContents();
  }
  else {
    await common.runCommand(command);
  }

  return res.json({result: 'ok'});
}

export async function increaseCount(req, res) {
  const { content, identifier } = req.body;
  const userid = req.user && req.user.userid? req.user.userid : 'unknown';

  await Count.inc(content, identifier, userid);
  return res.json({result: 'ok'});
}

function cleanPopulate(obj, items) {
  for(let p of items) {
    if(p === 'user') {
      obj = obj.populate(p, common.populateFieldsForPortfolio.userFeatures);
    }
    else if(p === 'company' || p === 'project') {
      obj = obj.populate(p, common.populateFieldsForPortfolio.companyFeatures);
    }
    else {
      obj = obj.populate(p);
    }
  }
  return obj;
}

function searchPortfolios(keyword, query, limit, loaded, populate) {
  const portfolio = Portfolio
      .find({ ...query, $text: { $search: keyword } }, {score: { $meta: "textScore" }, meta:0, keywords:0})
      .sort({ score: { $meta: "textScore" } } )
      .skip(loaded)
      .limit(limit)
      .lean();
  return cleanPopulate(portfolio, populate);
}

function searchPortfoliosCount(keyword, query) {
  return Portfolio.count({ ...query, $text: { $search: keyword } });
}

export async function search(req, res) {
  const keyword = common.cut(req.params.keyword).join(' ');
  const skip =  parseInt(req.params.current || 0);
  let total = 0;

  if(skip === 0) {
    total = await searchPortfoliosCount(keyword, { isPrivate:false }); 
  }
  const portfolios = await searchPortfolios(keyword, { isPrivate:false }, 12, skip, ['company', 'user']);
  
  res.json({ result: { portfolios, total } });
}

export async function refresh(req, res) {
  console.log('version not compatable');
  return res.status(301).json({error: 'api version incompatible'});
}

export async function policy(req, res) {
  const policy = await Misc.findOne({title: 'policy'});
  return res.json(policy.data);
}

export default {
  main,
  more,
  command,
  search,
  increaseCount,
  refresh,
  policy
};
