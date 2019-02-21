import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import Layout from '../components/Account/Layout';
import SimpleList from '../components/Account/SimpleList';
import AccountInfo from '../components/Account/AccountInfo';
import Profile from '../components/Account/Profile';
import Company from '../components/Account/Company';
import Padding from '../components/Padding';

import Assist from '../utils/assist';
import { changePortfoiloOrder } from '../actions/makers';

import styles from '../css/components/account';

const cx = classNames.bind(styles);

const styler = function() {
  const args = Array.from(arguments).map(arg => 'menu-' + arg);
  return cx.apply(null, args);
}

const links = ['info', 'profile', 'company', 'ability', 'quit'];
const linkNames = ['계정 기본정보', '메이커 프로필', '소속 기업', '능력치', '탈퇴하기'];

class Container extends Component {

  constructor(props) {
    super(props);
    const { user, category } = this.props;
    this.state = { 
      selectedMenu: links.indexOf(category),
      user: {...user},
    };
    this.onClick = this.onClick.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.aboutEdited = this.aboutEdited.bind(this);
    this.getContent = this.getContent.bind(this);
    this.companyFeatureChanged = this.companyFeatureChanged.bind(this);
    this.companyNameChanged = this.companyNameChanged.bind(this);
    this.addCompanyEntry = this.addCompanyEntry.bind(this);
    this.removeCompanyEntry = this.removeCompanyEntry.bind(this);
    this.swapCompanyEntries = this.swapCompanyEntries.bind(this);
    this.history = this.history.bind(this);
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

  addCompanyEntry() {
    return evt => {
      const history = this.history();
      this.makerProfileChanged({companies: [...history, {order: history.length, name:'', period:'', position:'', newItem: true, }]});
    }
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
        />;

      case 'profile': 
        return <Profile 
          cx={cx}
          user={user} 
          featureEdited={this.featureEdited}
          aboutEdited={this.aboutEdited}
        />;

      case 'company':
        return <Company
          cx={cx}
          history={this.history()}
          featureChanged={this.companyFeatureChanged}
          companyNameChanged={this.companyNameChanged}
          addEntry={this.addCompanyEntry}
          removeEntry={this.removeCompanyEntry}
          swapEntries={this.swapCompanyEntries}
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
        middle={this.getContent()}
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

export default connect(mapStateToProps, {})(Container);
