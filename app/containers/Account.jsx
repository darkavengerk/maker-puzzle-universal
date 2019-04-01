import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import autoBind from 'react-autobind';

import Layout from '../components/Account/Layout';
import SimpleList from '../components/Account/SimpleList';
import AccountInfo from '../components/Account/AccountInfo';
import Profile from '../components/Account/Profile';
import Career from '../components/Account/Career';
import Company from '../components/Account/Company';
import Ability from '../components/Account/Ability';
import Padding from '../components/Padding';

import Assist from '../utils/assist';
import { DataBinder, DataTapper } from '../utils/DataBinder';
import { userEditSave } from '../actions/users';

import styles from '../css/components/account';

const cx = classNames.bind(styles);

const styler = function() {
  const args = Array.from(arguments).map(arg => 'menu-' + arg);
  return cx.apply(null, args);
}

let links = ['info', 'profile', 'career', 'ability', 'quit'];
let linkNames = ['계정 기본정보', '메이커 프로필', '소속 기업', '능력치', '탈퇴하기'];

class Container extends Component {

  constructor(props) {
    super(props);
    const { user, category } = this.props;
    this.lastEdited = -1;
    this.interval = null;
    
    if(user.companiesOwned && user.companiesOwned.length > 0) {
      links = ['info', 'profile', 'career', 'company', 'ability', 'quit'];
      linkNames = ['계정 기본정보', '메이커 프로필', '소속 기업', '소유한 기업페이지', '능력치', '탈퇴하기'];
    }

    this.state = { 
      selectedMenu: links.indexOf(category),
      user: {...user},
    };

    autoBind(this);

    this.dataBound = new DataBinder(this.state);
    this.dataBound.listen('USER_UPDATE', protocol => {
      this.dataBound.set(protocol.data, 'user');
      this.setState({user: {...this.dataBound.get('user')}});
    });

    this.dataTapper = new DataTapper({
      bind: this.dataBound,
      title: 'USER_UPDATE',
      callback: this.submitCheck,
      timeLength: 3000,
    });
  }

  async submitCheck() {
    const { userEditSave } = this.props;
    await userEditSave(this.dataBound.get('user'));
  }

  onClick(index) {
    browserHistory.push('/account/' + links[index]);
    this.setState({selectedMenu : index});
  }

  getContent() {
    const user = this.dataBound.access('user', 'USER_UPDATE');
    const { category} = this.props;
    switch(category) {
      case 'info': 
        return <AccountInfo 
          cx={cx}
          data={user}
        />;

      case 'profile': 
        return <Profile 
          cx={cx}
          data={user}
        />;

      case 'career':
        return <Career
          cx={cx}
          data={user.access('makerProfile').access('companies')}
        />
      case 'company':
        return <Company
          cx={cx}
          data={user.access('companiesOwned')}
        />

      case 'ability':
        return <Ability
          cx={cx}
          data={user.access('makerProfile').access('abilities')}
        />

      default:
        return null;
    }
  }

  render() {
    const { user } = this.state;
    const menu = <SimpleList 
      items={linkNames} 
      cx={cx}
      selected={this.state.selectedMenu}
      onClick={this.onClick}
    />;

    return (
      <Layout
        cx={cx}
        left={menu}
        leftWidth={'2.1rem'}
        middle={this.getContent()}
        middleWidth={'6rem'}
      />
    );
  }
}

Container.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user.account,
    category: state.param.category
  };
}

export default connect(mapStateToProps, { userEditSave })(Container);
