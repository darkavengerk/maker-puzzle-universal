import React from 'react';
import classNames from 'classnames/bind';
import factory from '../utils/contentsTagFactory'

class User {

  constructor(data) {
    this.raw = data || {};
    for(let x in data) {
      this[x] = data[x];
    }
    // if(Factory)
    //   factory = new Factory(this);
  }

  getInfo(props) {
    const Info = factory.getInfoTag(this);
    return <Info owner={this} />;
  }

  getContent(props) {
    return null;
  }

}

class Maker extends User {

  constructor(data) {
    super( data || {} );
  }

  getType() {
    return 'maker';
  }

  getProfileImage(alternative) {
    return this.picture || '/site/images/default_Maker-01.jpg';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/maker/' + this.userid;
  }

  createPortfolioLink(portfolio) {
    return this.getHomeLink() + '/portfolio/' + portfolio.pid;
  }

  createPortfolioTitle(portfolio) {
    return portfolio.location;
  }

  createPortfolioSubtitle(portfolio) {
    return portfolio.title;
  }

  getContent(props) {
    return factory.getMakerContent({source: this, ...props});
  }
}

class Company extends User {

  constructor(data) {
    super(data);
  }

  getType() {
    return 'company';
  }

  getProfileImage() {
    return this.profilePicture || '/site/images/default_Company-01.jpg';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/company/' + this.link_name;
  }

  createPortfolioLink(portfolio) {
    if(portfolio.type === 'company')
      return this.getHomeLink() + '/portfolio/' + portfolio.pid;
    return this.getHomeLink() + '/maker/' + (portfolio.user? portfolio.user.userid : 'unknown')  + '/' + portfolio.pid;
  }

  createPortfolioTitle(portfolio) {
    return portfolio.location;
  }

  createPortfolioSubtitle(portfolio) {
    return portfolio.title;
  }

  getContent(props) {
    return factory.getCompanyContent({source: this, ...props});
  }
}

class Project extends User {

  constructor(data) {
    super(data);
  }

  getType() {
    return 'project';
  }

  getProfileImage() {
    return this.profilePicture || '/site/images/default_project-01.jpg';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/project/' + this.link_name;
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
    if(portfolio.type === 'company')
      return this.getHomeLink() + '/company/' + portfolio.company.link_name  + '/' + portfolio.pid;
    return this.getHomeLink() + '/maker/' + portfolio.user.userid  + '/' + portfolio.pid;
  }

  getContent(props) {
    return factory.getProjectContent({source: this, ...props});
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

exports.Maker = Maker;
exports.Project = Project;
exports.Company = Company;
exports.create = function(type, data) {
  switch(type) {
    case 'maker':
      return new Maker(data);
    case 'company':
      return new Company(data);
    case 'project':
      return new Project(data);
    default:
      return nullObject;
  }
};