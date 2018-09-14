import mongoose from 'mongoose';

import Company, {autoComplete as companyAutoComplete} from './models/company';
import Project, {autoComplete as projectAutoComplete} from './models/project';
import Image from './models/image';
import Metadata from './models/metadata';
import Misc from './models/misc';
import User from './models/user';
import Portfolio from './models/portfolio';
import Product from './models/product';

function pushOrReplacePortfolio(portfolioList, portfolio) {
  const shouldReplace = portfolioList.filter(p => p.pid === portfolio.pid).length > 0;

  if(shouldReplace) {
    return portfolioList.map(p => {
      if(p.pid === portfolio.pid) return portfolio;
      else return p;
    });
  }
  else {
    portfolioList.push(portfolio);
    return portfolioList;
  }
}

async function savePortfolio({ portfolio, project, company, user }) {

  if(portfolio.pid) {
    portfolio.lastUpdated = Date.now();
  }
  else {
    portfolio.pid = await Misc.createID('portfolio');
  }
  portfolio.project = project._id;
  portfolio.company = company._id;
  
  company.projects.addToSet(project._id);  
  project.companies.addToSet(company._id);  

  const saving = [];

  if(user && user._id) {
    portfolio.user = user._id;
    user.portfolios = pushOrReplacePortfolio(user.portfolios, portfolio);

    project.users.addToSet(user._id);
    company.users.addToSet(user._id);

    const companyName = company.name;
    const alreadyRegisterd = user.makerProfile.companies.filter(c => c.name === company.name);
    
    if(alreadyRegisterd.length === 0) {
      user.makerProfile.companies.push({name: company.name, order: user.makerProfile.companies.length});
    }
    saving.push(user.save());
  }

  project.portfolios = pushOrReplacePortfolio(project.portfolios, portfolio);
  if(portfolio.type == 'company') {
    company.companyPortfolios = pushOrReplacePortfolio(company.companyPortfolios, portfolio);
  }
  else {
    company.portfolios = pushOrReplacePortfolio(company.portfolios, portfolio);
  }

  saving.push(project.save());
  saving.push(company.save());
  saving.push(Portfolio.updateOne({pid: portfolio.pid}, portfolio, {upsert: true}));

  await Promise.all(saving);

  return {user, project, company, portfolio};
}

export default {
  savePortfolio
};
