import React from 'react';
import classNames from 'classnames/bind';
import Factory from '../utils/contentsTagFactory'

class User {

  constructor(data) {
    this.raw = data || {};
    for(let x in data) {
      this[x] = data[x];
    }
    if(Factory)
      this.factory = new Factory(this);
  }

  getInfo(props) {
    const Info = this.factory.getInfoTag(props);
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

  getProfileImage() {
    const { picture } = this;
    return picture || '/images/site/def_maker.png';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/maker/' + this.userid;
  }

  getContent(props) {
    return this.factory.getMakerContent(props);
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
    return this.profilePicture || '/images/site/def_company.png';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/company/' + this.link_name;
  }

  getContent(props) {
    return this.factory.getCompanyContent(props);
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
    return this.profilePicture || '/images/site/def_project.png';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/project/' + this.link_name;
  }

  getContent(props) {
    return this.factory.getProjectContent(props);
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