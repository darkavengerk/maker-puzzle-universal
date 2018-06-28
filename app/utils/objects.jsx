import React from 'react';
import classNames from 'classnames/bind';

class User {

  constructor(data) {
    this.raw = data || {};
    for(let x in data) {
      this[x] = data[x];
    }
  }

}

class Maker extends User {

  constructor(data) {
    super( data || { profile:{} } );
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

class Project extends User {

  constructor(data) {
    super(data);
  }

  getProfileImage() {
    return this.profileImage || '/images/site/def_company.png';
  }

  getName() {
    return this.name;
  }

  getHomeLink() {
    return '/project/' + this.link_name;
  }
}

class Company extends User {

  constructor(data) {
    super(data);
  }
}

exports.Maker = Maker;
exports.Project = Project;
exports.Company = Company;