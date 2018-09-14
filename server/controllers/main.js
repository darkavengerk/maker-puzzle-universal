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

  return res.json({result: 'ok'});
}

export async function search(req, res) {
  const keyword = req.params.keyword;
  
  const users = await User.find( { $text: { $search: keyword } } ).lean();
  const companies = await Company.find( { $text: { $search: keyword } } ).lean();
  const portfolios = await Portfolio.find( { $text: { $search: keyword } } ).populate(['company', 'user']).lean();
  const projects = await Project.find( { $text: { $search: keyword } } ).lean();
  res.json({ result: { users, companies, projects, portfolios } });
}

export default {
  main,
  command,
  search
};
