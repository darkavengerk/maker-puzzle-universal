import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut, loginMenu, cancelLogin } from '../actions/users';
import Img from '../components/FlexibleImage';
import Login from '../components/Login';
import Popup from '../components/Popup';
import Roundy from '../components/Roundy';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);


const Navigation = ({ user, logOut, loginMenu, cancelLogin }) => {
    const login = user.authenticated? 
          <Roundy 
            user={user.account} 
            x={36} y={36} 
            showName={false}
            defaultImage={'/site/images/header-account.png'}
          /> : 
          <div className={cx('login-button')} onClick={loginMenu} role="button">
            로그인하기
          </div>

    return (
      <nav className={cx('navigation')} role="navigation">
        <div className={cx('logo-area')}>
          <Link to="/">
            <Img src="/site/images/header-logo-20180829.png" x={307} y={81.3}/>
          </Link>
        </div>
        <div className={cx('search-area')}>
          <input type="text" className={cx('search-input')} />
        </div>

        <div className={cx('option-area')}>
          {login}
          {user.authenticated? 
            <Img src="/site/images/header-social.png" x={36} y={36} onClick={logOut} /> :null}
          <Img src="/site/images/header-more.png" x={38.5} y={36} />
        </div>
        <Popup show={user.attempt === 'login'} name="LoginPopup" cancel={cancelLogin}>
          <Login />
        </Popup>
      </nav>
    );
};

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
