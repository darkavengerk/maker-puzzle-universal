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
      this.factory = new Factory(data.type);
  }

  getInfoTag() {
    return this.factory.getInfoTag();
  }

  getContent(param, isOwnPage) {
    return this.factory.getContent(param, this.raw, isOwnPage);
  }

}

class Maker extends User {

  constructor(data) {
    super( data.profile? data : { profile:{} } );
  }

  getProfileImage() {
    const { profile: { picture } } = this;
    return picture || '/images/site/def_maker.png';
  }

  getName() {
    return this.profile.name;
  }

  getHomeLink() {
    return '/maker/' + this.userid;
  }
}

class Company extends User {

  constructor(data) {
    super(data.profile? data : { profile:{} });
  }

  getProfileImage() {
    const { profile: { picture } } = this;
    return picture || '/images/site/def_company.png';
  }

  getName() {
    return this.profile.name;
  }

  getHomeLink() {
    return '/company/' + this.userid;
  }
}

class Project extends User {

  constructor(data) {
    super(data);
  }

  getProfileImage() {
    return this.profileImage || '/images/site/def_project.png';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/project/' + this.link_name;
  }
}

class Null extends User {

  constructor() {
    super({});
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