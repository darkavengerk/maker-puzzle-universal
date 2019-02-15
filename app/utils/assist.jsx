import React from 'react';
import classNames from 'classnames/bind';
import factory from '../utils/contentsTagFactory'

class User {

  constructor(data) {
    // this.raw = data || {};
    // for(let x in data) {
    //   this[x] = data[x];
    // }
    // if(Factory)
    //   factory = new Factory(this);
  }

  getInfo(data, props) {
    const Info = factory.getInfoTag(this.getType());
    return <Info owner={data} />;
  }

  getContent(props) {
    return null;
  }

  getDataFromPortfolio(portfolio) {
    return portfolio[this.getType()];
  }

}

class Maker extends User {

  constructor(data) {
    super( data );
  }

  getType() {
    return 'maker';
  }

  getDataFromPortfolio(portfolio) {
    return portfolio.user;
  }

  getProfileImage(data) {
    return data.picture || '/site/images/default_Maker-01.jpg';
  }

  getName(data) {
    return data.name;
  }

  getHomeLink(data) {
    return '/maker/' + data.userid;
  }

  getOccupation(data) {
    for(const feature of data.features) {
      if(feature.repr === 'occupation') return feature.content;
    }
    return '';
  }

  createPortfolioLink(portfolio) {
    return this.getHomeLink(this.getDataFromPortfolio(portfolio)) + '/portfolio/' + portfolio.pid;
  }

  createPortfolioTitle(portfolio) {
    return portfolio.location;
  }

  createPortfolioSubtitle(portfolio) {
    return portfolio.title;
  }

  getContent(data, props) {
    return factory.getMakerContent({source: data, ...props});
  }

  isFollowing(data, target) {
    const first = data.followings.filter(p => (p._id || p) === (target._id || target)).length > 0;
    const second = this.getCompanyFollowings(data, 'followings').filter(p => (p._id || p) === (target._id || target)).length > 0;
    return first || second;
  }

  getFollows(data, type) {
    if(type === 'followings') {
      return data.followings;
    }
    else {
      return data.followers;
    }
  }

  getCompanyFollowings(data, type) {
    if(type === 'followings') {
      return data.companyFollowings || [];
    }
    else {
      return [];
    }
  }

  getFollowSize(data, type) {
    return this.getFollows(data, type).length + this.getCompanyFollowings(data, type).length;
  }

  getEligiblePortfolios(data, user) {
    if(!data) return [];
    user = user.account || user;
    const portfolios = data.portfolios || [];
    return portfolios.filter(p => {
      if(user.type === 'admin') return true;
      if(p.isPrivate) {
        return user && (user._id === (p.user._id || p.user));
      }
      return true;
    })
  }
}

class Company extends User {

  constructor(data) {
    super(data);
  }

  getType() {
    return 'company';
  }

  isOwnPage(data, user) {
    if(!user) return false;

    if(user.type === 'admin') return true;

    const filtered = (data.owners || []).filter(o => (o._id || o) === (user._id || user));
    return filtered.length > 0;
  }

  getProfileImage(data) {
    return data.profilePicture || '/site/images/default_Company-01.jpg';
  }

  getName(data) {
    return data.name;
  }

  getHomeLink(data) {
    return '/company/' + data.link_name;
  }

  createPortfolioLink(portfolio) {
    const data = this.getDataFromPortfolio(portfolio);
    const base = this.getHomeLink({ link_name: portfolio.companyName}).replace(/ /g, '_');
    if(portfolio.type === 'company')
      return base + '/portfolio/' + portfolio.pid;
    return base + '/maker/' + (portfolio.user? portfolio.user.userid : 'unknown')  + '/' + portfolio.pid;
  }

  createPortfolioTitle(portfolio) {
    return portfolio.location;
  }

  createPortfolioSubtitle(portfolio) {
    return portfolio.title;
  }

  getContent(data, props) {
    return factory.getCompanyContent({source: data, ...props});
  }
}

class Project extends User {

  constructor(data) {
    super(data);
  }

  getType() {
    return 'project';
  }

  isOwnPage(project, user, param) {
    if(!user) return false;

    if(user.type === 'admin') return true;

    if(param.mid) {
      return param.mid === user.userid;
    }

    if(param.cid && project.companies && user.companiesOwned) {
      const founds = project.companies.filter(c => c.link_name === param.cid);
      if(founds.length >0) {
        const target = founds[0]._id;
        const ownedCompany = user.companiesOwned.filter(c => (c._id || c) === target);
        return ownedCompany.length > 0;
      }
    }

    return false;
  }

  getProfileImage(data) {
    return data.profilePicture || '/site/images/default_project-01.jpg';
  }

  getName(data) {
    return data.name;
  }

  getHomeLink(data) {
    return '/project/' + data.link_name;
  }

  createPortfolioTitle(portfolio) {
    if(portfolio.type === 'company')
      return portfolio.company.name;
    return portfolio.title;
  }

  createPortfolioSubtitle(portfolio) {
    if(portfolio.type === 'company')
      return portfolio.title;
    return portfolio.user.name;
  }

  createPortfolioLink(portfolio) {
    // const data = this.getDataFromPortfolio(portfolio);
    const base = this.getHomeLink({ link_name: portfolio.location}).replace(/ /g, '_');
    if(portfolio.type === 'company')
      return base + '/company/' + portfolio.company.link_name  + '/' + portfolio.pid;
    return base + '/maker/' + portfolio.user.userid  + '/' + portfolio.pid;
  }

  getContent(data, props) {
    return factory.getProjectContent({source: data, ...props});
  }

}

class Main extends Project {

  constructor() {
    super();
  }

  getType() {
    return 'main';
  }

  getHomeLink() {
    return '/main';
  }

  createPortfolioLink(portfolio) {
    if(portfolio.type === 'company')
      return '/company/' + portfolio.company.link_name + '/portfolio/' + portfolio.pid;
    return '/maker/' + portfolio.user.userid + '/portfolio/' + portfolio.pid;
  }
}

class Null extends User {

  constructor() {
    super({});
  }

  getType() {
    return '';
  }

  getProfileImage() {
    return '';
  }

  getName() {
    return '';
  }

  getHomeLink() {
    return '';
  }

  createPortfolioLink(portfolio) {
    return '';
  }
}

const nullObject = new Null();

export default {
  Main : new Main(),
  Maker : new Maker(),
  Project : new Project(),
  Company : new Company()
};