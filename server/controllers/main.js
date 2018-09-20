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
  Image
} = models;


export async function main(req, res) {

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

  return res.json({users, projects, companies});
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
  search
};
