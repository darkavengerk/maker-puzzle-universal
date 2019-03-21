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
import { DataBinder } from '../utils/DataBinder';
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

    this.dataBound = new DataBinder(this);
    this.dataBound.listen('user');
    this.dataBound.listen('user', v => {
      if(this.lastEdited < 0) {
        this.lastEdited = new Date();
        this.interval = setInterval(this.submitCheck, 1000);
      }
      else {
        this.lastEdited = new Date();
      }
    });
  }

  async submitCheck() {
    const { userEditSave } = this.props;
    const now = new Date();
    if(now - this.lastEdited >= 3000) {
      clearInterval(this.interval);
      this.interval = null;
      this.lastEdited = -1;
      await userEditSave(this.dataBound.access('user').get());
    }
  }

  updateState() {
    return name => value => {
      const user = {...this.state.user, [name]: value};
      this.setState({ user });
    };
  }

  history() {
    return [...this.state.user.makerProfile.companies];
  }

  onClick(index) {
    browserHistory.push('/account/' + links[index]);
    this.setState({selectedMenu : index});
  }

  featureEdited(key, text) {
    const target = this.state.user;    
    const features = target.features.map(feature => {
      if(feature.title === key) {
        return {...feature, content:text}
      }
      return feature;
    });
    this.setState({ user: {...this.state.user, features} });
  }

  aboutEdited(evt) {
    const about = evt.target.innerText;
    this.setState({ about });
  }

  makerProfileChanged(states) {
    const { user } = this.state;
    const makerProfile = {...user.makerProfile, ...states};
    this.setState({user: {...this.state.user, makerProfile}});
  }

  companyFeatureChanged(order, category) {
    return evt => {
      const value = evt.target.value;
      const newState = this.history().map(info => {
        if(info.order === order) return {...info, [category]: value};
        return info;
      });
      this.makerProfileChanged({companies: newState});
    }
  }

  companyNameChanged(order) {
    return name => {
      const newState = this.history().map(info => {
        if(info.order === order) return {...info, name};
        return info;
      });
      this.makerProfileChanged({companies: newState});
    }
  }

  addCompanyEntry(evt) {
    const history = this.history();
    this.makerProfileChanged({companies: [...history, {order: history.length, name:'', period:'', position:'', newItem: true, }]});
  }

  removeCompanyEntry(order) {
    return evt => {
      let newState = this.history().filter(info => info.order !== order);
      newState = newState.map( (s, i) => ({...s, order: i}));
      this.makerProfileChanged({companies: newState});
    }
  }

  swapCompanyEntries(i, direction) {
    return evt => {
      const history = this.history();
      if(i+direction < 0 || i+direction >= history.length) return;
      const temp = history[i+direction];
      history[i+direction] = {...history[i], order: temp.order};
      history[i] = {...temp, order: history[i].order};
      this.makerProfileChanged({companies: [...history]});
    }
  }

  getContent() {
    const { user } = this.state;
    const { category} = this.props;
    switch(category) {
      case 'info': 
        return <AccountInfo 
          cx={cx}
          user={user}
          data={this.dataBound.access('user')}
        />;

      case 'profile': 
        return <Profile 
          cx={cx}
          data={this.dataBound.access('user')}
          user={user} 
          featureEdited={this.featureEdited}
          aboutEdited={this.aboutEdited}
        />;

      case 'career':
        return <Career
          cx={cx}
          history={this.history()}
          featureChanged={this.companyFeatureChanged}
          companyNameChanged={this.companyNameChanged}
          addEntry={this.addCompanyEntry}
          removeEntry={this.removeCompanyEntry}
          swapEntries={this.swapCompanyEntries}
        />
      case 'company':
        return <Company
          cx={cx}
          companies={this.state.user.companiesOwned}
        />

      case 'ability':
        return <Ability
          cx={cx}
          abilities={this.state.user.makerProfile.abilities}
          onChange={() => {}}
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
