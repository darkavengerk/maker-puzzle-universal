import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import Img from '../components/FlexibleImage';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
        <div className={cx('logo-area')}>
          <Link to="/">
            <Img src="/images/site/MAKER-PUZZLE-beta.png" x={301} y={60}/>
          </Link>
          <p className={cx('logo-text')}>건축인들을 위한 소셜 플랫폼 서비스</p>
        </div>
        <div className={cx('search-area')}>
          <input type="text" className={cx('search-input')} />
        </div>
{/*        <Link
          to="/"
          className={cx('item', 'logo')}
          activeClassName={cx('active')}>Maker Puzzle</Link>
          { user.authenticated ? (
            <Link
              onClick={logOut}
              className={cx('item')} to="/">Logout</Link>
          ) : (
            <Link className={cx('item')} to="/login">Log in</Link>
          )}*/}
        <div className={cx('option-area')}>
          <Img src="/images/site/icon_person.png" x={32} y={30} /> 
          <Img src="/images/site/icon_alert.png" x={39} y={39} />
          <Img src="/images/site/icon_more.png" x={49} y={28} />
        </div>
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

export default connect(mapStateToProps, { logOut })(Navigation);
