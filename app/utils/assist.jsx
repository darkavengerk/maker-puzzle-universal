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
    super( data );
  }

  getType() {
    return 'maker';
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

  createPortfolioLink(data, portfolio) {
    return data.getHomeLink() + '/portfolio/' + portfolio.pid;
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
}

class Company extends User {

  constructor(data) {
    super(data);
  }

  getType() {
    return 'company';
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

  createPortfolioLink(data, portfolio) {
    if(portfolio.type === 'company')
      return data.getHomeLink() + '/portfolio/' + portfolio.pid;
    return data.getHomeLink() + '/maker/' + (portfolio.user? portfolio.user.userid : 'unknown')  + '/' + portfolio.pid;
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
    if(portfolio.type === 'company')
      return this.getHomeLink() + '/company/' + portfolio.company.link_name  + '/' + portfolio.pid;
    return this.getHomeLink() + '/maker/' + portfolio.user.userid  + '/' + portfolio.pid;
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
  Maker : new Maker(),
  Project : new Project(),
  Company : new Company()
};