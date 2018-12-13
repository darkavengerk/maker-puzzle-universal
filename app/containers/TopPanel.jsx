import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import { logOut, loginMenu, cancelLogin } from '../actions/users';
import Img from '../components/FlexibleImage';
import Login from '../components/Login';
import Popup from '../components/Popup';
import Roundy from '../components/Roundy';
import FloatingList from '../components/FloatingList';
import Floater from '../components/Floater';

import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {showDropdown: false};
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  logoutClicked() {
    const { logOut } =  this.props; 
    this.setState({showDropdown:false});
    logOut();
  }

  showDropDown() {
    this.setState({showDropdown: true});
  }

  toggleDropDown() {
    this.setState((prevState) => this.setState({showDropdown: !prevState.showDropdown}));
  }

  hideDropDown() {
    this.setState({showDropdown: false});
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const element = document.getElementById('user-search-input');
    const keyword = element.value;
    if(keyword.trim().length > 0) {
      element.value = '';
      browserHistory.push('/search/' + keyword);
    }
  }

  render() {    
    const { user, logOut, loginMenu, cancelLogin } =  this.props; 
    const login = user.authenticated? 
          <Roundy 
            user={user.account} 
            x={36} y={36} 
            showName={false}
          /> : 
          <div className={cx('login-button')} onClick={loginMenu} role="button">
            로그인하기
          </div>    

    return (
      <div>
        <nav className={cx('navigation')} role="navigation">
          <div className={cx('logo-area')}>
            <Link to="/main">
              <Img source="/site/images/header-logo-20180829.png" x={307} y={81.3}/>
            </Link>
          </div>
          <form onSubmit={this.handleOnSubmit} className={cx('search-area')}>
            <input type="text" id="user-search-input" className={cx('search-input')} placeholder={'검색어를 입력하세요. (지역, 기업, 사람, 각종 키워드)'} />
            <Img source="/site/images/search.png" x={21.8} y={21.8} role="button" onClick={this.handleOnSubmit} />
          </form>

          <div className={cx('option-area', user.authenticated? 'option-area-loggedin' : '')}>
            {login}
            {/*{user.authenticated && 
            <Img source="/site/images/header-social.png" x={38} y={36} />}*/}
            <div style={{position:'relative'}}>
              <div onMouseOver={this.showDropDown} onClick={this.toggleDropDown}>
                <Img source="/site/images/header-more.png" x={38.5} y={36}/>
              </div>
              <Floater 
                width={'1.44rem'}
                top={'0.35rem'}
                right={'-0.1rem'}
                show={this.state.showDropdown}
                className={cx('user-menu-base')}>
                <div className={cx('arrow', 'user-menu-shadow')}>
                </div>
                <div className={cx('arrow', 'arrow-cover')}>
                </div>
                <div className={cx('user-menu-area', 'user-menu-shadow')} onMouseLeave={this.hideDropDown}>
                  <div className={cx('user-menu-item')} onClick={e => window.open('/site/doc/manual.pdf')}>
                    서비스 소개
                  </div>
                  {/*<div className={cx('user-menu-item')}>
                    의견게시판
                  </div>
                  <div className={cx('user-menu-item')}>
                    메이커퍼즐 뉴스
                  </div>*/}
                  {user.authenticated && <div className={cx('user-menu-item')} onClick={this.logoutClicked}>
                    로그 아웃
                  </div>}
                  {!user.authenticated && <div className={cx('user-menu-item')} onClick={loginMenu}>
                    로그인
                  </div>}
                </div>
              </Floater>
            </div>
          </div>
        </nav>
        <Popup show={user.attempt === 'login'} name="LoginPopup" cancel={cancelLogin} roll={true} top={100}>
          <Login />
        </Popup>
      </div>
    );
  }
}


Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut, loginMenu, cancelLogin })(Navigation);
