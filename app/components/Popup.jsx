import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/popup';

const cx = classNames.bind(styles);

const Popup = ({ show, name, children, cancel }) => {

  const onClick = evt => {
    if(evt.target.id === name) {
      cancel();
    }
  }

  if(show)
    return (
      <div className={cx('main-section')} id={name} onClick={onClick}>
        {children}
      </div>
    );
  else return null;
};

Popup.propTypes = {
  name: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {})(Popup);
