import mongoose from 'mongoose';

import Company, {autoComplete as companyAutoComplete} from './models/company';
import Project, {autoComplete as projectAutoComplete} from './models/project';
import Image from './models/image';
import Metadata from './models/metadata';
import Misc from './models/misc';
import Product from './models/product';
import User from './models/user';

async function savePortfolio({ portfolio, project, company, user }) {

  const pid = await Misc.createID('portfolio');

  portfolio.pid = pid;
  portfolio.project = project._id;
  portfolio.company = company._id;
  
  company.projects.addToSet(project._id);  

  const saving = [];

  if(user && user._id) {
    portfolio.user = user._id;
    user.portfolios.push(portfolio._id);
    project.users.addToSet(user._id);
    company.users.addToSet(user._id);
    saving.push(user.save());
  }

  project.portfolios.push(portfolio);
  if(portfolio.type == 'company') {
    company.companyPortfolios.push(portfolio);
  }
  else {
    company.portfolios.push(portfolio);
  }

  saving.push(project.save());
  saving.push(company.save());

  await Promise.all(saving);

  return {user, project, company, portfolio};
}

export default {
  savePortfolio
};
