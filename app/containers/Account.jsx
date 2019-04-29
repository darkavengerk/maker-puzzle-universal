import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';
import autoBind from 'react-autobind';

import Layout from '../components/Account/Layout';
import SimpleList from '../components/web/SimpleList';
import AccountInfo from '../components/Account/AccountInfo';
import Password from '../components/Account/Password';
import Profile from '../components/Account/Profile';
import Career from '../components/Account/Career';
import Company from '../components/Account/Company';
import Ability from '../components/Account/Ability';
import Quit from '../components/Account/Quit';
import Padding from '../components/Padding';
import Popup from '../components/Popup';

import Assist from '../utils/assist';
import { DataBinder, DataTapper } from '../utils/DataBinder';
import { userEditSave, logOut } from '../actions/users';
import { authService } from '../services';

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

    this.dataBound = new DataBinder({user: this.state.user}, {component: this});
    // this.dataBound.listen('USER_UPDATE', protocol => {
    //   this.dataBound.set(protocol.data, 'user');
    //   this.setState({user: {...this.dataBound.get('user')}});
    // });

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

  showPasswordPopup(event) {
    this.setState({attempt: 'password'});
  }

  closePopup() {
    this.setState({attempt: ''});
  }

  async quit() {
    const { user, logOut } = this.props;
    const answer = confirm('탈퇴하시겠습니까? (되돌릴 수 없음)');

    if(!answer) return;
    if(user.companiesOwned && user.companiesOwned.length > 0) {
      const message = `회원님은 기업페이지 1개의 유일한 관리자입니다. 회원님의 계정이 삭제되면 해당 페이지의 기업 포트폴리오는 더이상 공개되지 않습니다.

계정 삭제 진행을 원하시면 help@maker-puzzle.com 으로 문의바랍니다.`;
      alert(message);
      return;
    }
    await authService().signOff({ userid: user.userid });
    alert('완료');
    window.parent.opener.location.href = '/';
    logOut();
    window.location.reload();
  }

  getContent() {
    const user = this.dataBound.access('user', 'USER_UPDATE');
    const { category } = this.props;
    switch(category) {
      case 'info': 
        return <AccountInfo 
          cx={cx}
          showPasswordPopup={this.showPasswordPopup}
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
          data={user.access('companiesOwned', 'COMPANY_UPDATE')}
        />

      case 'ability':
        return <Ability
          cx={cx}
          data={user.access('makerProfile').access('abilities')}
        />

      case 'quit':
        return <Quit
          cx={cx}
          quit={this.quit}
          data={user.access('makerProfile').access('abilities')}
        />

      default:
        return null;
    }
  }

  render() {
    const user = this.dataBound.access('user', 'USER_UPDATE');
    const menu = <div>
      <SimpleList 
        items={linkNames} 
        cx={cx}
        selected={this.state.selectedMenu}
        onClick={this.onClick}
      />
      <Popup show={this.state.attempt === 'password'}
        name="PasswordPopup"
        cancel={this.closePopup}
        roll={true} top={100}
      >
        <Padding width={450} height={172}>
          <Password
            data={this.dataBound.access('user')}
            onChange={this.closePopup}
            cancel={this.closePopup}
            cx={cx}
          />
        </Padding>
      </Popup>
    </div>;

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

export default connect(mapStateToProps, { userEditSave, logOut })(Container);
