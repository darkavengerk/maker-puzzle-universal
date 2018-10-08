import mongoose from 'mongoose';
import path from 'path';
import sharp from 'sharp';
import aws from 'aws-sdk';

import { isProduction } from '../../../config/app';
import Company, {autoComplete as companyAutoComplete} from './models/company';
import Project, {autoComplete as projectAutoComplete} from './models/project';
import Image from './models/image';
import Metadata from './models/metadata';
import Misc from './models/misc';
import User from './models/user';
import Portfolio from './models/portfolio';
import Product from './models/product';

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const IMAGE_PROCESSING_VERSION = 'v1.0'

function ngram(s, n) {
  if(s.length <= n) return [];
  let index = 0;
  const ngrams = [];
  while(index + n -1 < s.length) {
    ngrams.push(s.substring(index, index + n));
    index += 1;
  }
  return ngrams;
}

function bikilo(strings, n) {
  if(strings.length <= n) return [];
  let index = 0;
  const ngrams = [];
  while(index + n -1 < strings.length) {
    ngrams.push(strings.slice(index, index + n).join(''));
    index += 1;
  }
  return ngrams;
}

function getSeries(s) {
  return ngram(s, 2).concat(ngram(s,3));
}

function cut(strings) {
  strings = Array.isArray(strings)? strings : [strings];
  let words = [];
  for(let bigWord of strings) {
    // words.push(bigWord);
    // const refined = bigWord.replace(/\s/g, '');
    // words.push(refined);
    // words = words.concat(getSeries(refined));
    words = words.concat(bigWord.split(/[^가-힣a-zA-Z]+/).filter(x => x && x.length > 1))
    const splited = bigWord.split(/[^가-힣]+/).filter(x => x && x.length > 1);
    for(let s of splited) {
      words = words.concat(getSeries(s));
    }
    // words = words.concat(bikilo(splited, 2));
  }
  return [...new Set(words)];
}

function makeIndex(sentences) {
  let made = [];
  for(let s of sentences) {
    made = made.concat(cut(s));
  }
  return [...new Set(made)]; // only one layer
  // return made; // for more layered search
}

function makeIndexFromPortfolio(portfolio) {
  return makeIndex([
      portfolio.title,
      portfolio.description,
      portfolio.location,
      portfolio.companyName,
      portfolio.tags,
      portfolio.makerName || ''
    ])
}

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

  portfolio.makerName = (user && user.name) ? user.name : '';

  portfolio.keywords = makeIndexFromPortfolio(portfolio);

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

  if(isProduction) {
    imageProcess({images: portfolio.images});
  }

  return {user, project, company, portfolio};
}

function uploadToS3(key, body) {
  return new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: 'maker-puzzle-images',
      Key: key,
      Body: body
    }, 
    err => {
      if(err) return reject(err);
      return resolve();
    });
  });
}

function fileNameProcess(name, nick) {
  const nameSplit = name.split('/').slice(1);
  const fname = nameSplit.pop();
  const fpath = nameSplit.join('/');
  const pieces = fname.split('.');
  const nickNamed = path.join(IMAGE_PROCESSING_VERSION, fpath, pieces[0] + nick + '.' + pieces[1]);
  return nickNamed;
}

async function imageProcess({ images }) {
  const imagesFound = await Image.find({_id: {$in : images}, status: {$ne: IMAGE_PROCESSING_VERSION}});
  
  if(!imagesFound || imagesFound.length === 0) return;

  const { data: sizes } = await Misc.findOne({title: 'image-sizes'}).lean();

  imagesFound.map(async image => {
    const fname = path.join('public', image.original);
    const imgObj = sharp(fname);
    const versions = {};

    try {
      const original = await imgObj.toBuffer();
      const nameOriginal = path.join('original', image.original);
      await uploadToS3(nameOriginal, original);
      versions['original'] = path.join('/', nameOriginal);

      for(let name in sizes) {
        const [x, y] = sizes[name];
        const resized = await imgObj
                                .resize(x, y)
                                .min()
                                .jpeg({ quality: 95 })
                                .withoutEnlargement()
                                .toBuffer();
        const fNameProcessed = fileNameProcess(image.original, '-' + name);
        await uploadToS3(fNameProcessed, resized);
        versions[name] = path.join('/', fNameProcessed);
      }
      await Image.update({_id: image._id}, {$set: {versions: versions, status: IMAGE_PROCESSING_VERSION}});
    }
    catch(e) {
      console.log(e);
      console.log('skip for ', fname);
      await Image.update({_id: image._id}, {$set: {status: 'NOT_EXIST'}});
    }
  });
}

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

const functionMap = {
  'migrate-portfolios': async function() {
    const projects = await Project.find({});
    let portfolios = [];
    for(let project of projects) {
      portfolios = portfolios.concat(project.portfolios);
    }
    for(let portfolio of portfolios) {
      await Portfolio.update({ pid: portfolio.pid}, portfolio, {upsert: true});
    }
  },

  'image-process-batch': async function() {
    const found = await Image.find({status: 'init'}).limit(100);
    const images = found.map(img => img._id);
    await imageProcess({ images });
  },

  'portfolio-index-batch': async function() {
    const found = await Portfolio.find();
    for(let p of found) {
      p.keywords = makeIndexFromPortfolio(p);
      await p.save();
    }
    await Portfolio.collection.dropIndex("keywords_text");
    await Portfolio.collection.createIndex({keywords:"text"});
  },

  'update-count-batch': async function() {
    await updateCount(Portfolio, 'portfolio', 'pid');
    await updateCount(Company, 'company', 'link_name');
    await updateCount(Project, 'project', 'link_name');
    await updateCount(User, 'maker', 'userid');
  },

  'update-score-batch': async function() {
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
  },
  
  'username-batch': async function() {
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
  },

}

async function runCommand(command) {
  const fn = functionMap[command];
  if(fn) {
    console.log('running...', command);
    await(fn);
  }
}

export default {
  savePortfolio,
  imageProcess,
  makeIndex,
  makeIndexFromPortfolio,
  runCommand,
  cut
};
