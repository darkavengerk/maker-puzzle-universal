import passport from 'passport';
import  { models, common } from '../db';

const { 
  User,
  Company, 
  companyAutoComplete, 
  Project, 
  projectAutoComplete,
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

export async function search(req, res) {
  const result = await User.find().lean();
  res.json({ result });
}

export default {
  main,
  search
};
