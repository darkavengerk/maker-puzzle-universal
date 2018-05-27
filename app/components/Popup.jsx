import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/popup';

const cx = classNames.bind(styles);

const Popup = ({ portfolio, user, maker, show, children }) => {

  if(show)
    return (
      <div className={cx('main-section')}>
        {children}
      </div>
    );
  else return <div></div>;
};

Popup.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user,
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {})(Popup);
