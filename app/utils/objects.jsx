import React from 'react';
import classNames from 'classnames/bind';

class User {

  constructor(data) {
    this.data = data || {};
  }

}

class Maker extends User {

  constructor(data) {
    super( data || { profile:{} } );
  }

  getProfileImage() {
    const { profile: { picture } } = this.data;
    return picture || '/images/site/def_maker.png';
  }

  getName() {
    return this.data.profile.name;
  }

  getHomeLink() {
    return '/maker/' + this.data.userid;
  }
}

class Project extends User {

  constructor(data) {
    super(data);
  }

  getProfileImage() {
    const { profileIimage } = this.data;
    return profileIimage || '/images/site/def_project.png';
  }

  getName() {
    return this.data.name;
  }

  getHomeLink() {
    return '/project/' + this.data.link_name;
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