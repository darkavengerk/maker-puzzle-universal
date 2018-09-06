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
    User.find({'portfolios.0': {$exists:true}}).lean(),
    Project.find({'portfolios.0': {$exists:true}}).lean(),
    Company.find({'portfolios.0': {$exists:true}}).lean()
  ];
  const [users, projects, companies] = await Promise.all(loadings);

  return res.json({users, projects, companies});
}

export default {
  main
};
