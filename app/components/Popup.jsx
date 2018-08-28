import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Padding from '../components/Padding';
import styles from '../css/components/popup';

const cx = classNames.bind(styles);

const Popup = ({ show, name, children, cancel, top='15rem', target }) => {

  const onClick = evt => {
    if(cancel && evt.target.id === name) {
      cancel();
    }
  }

  if(show) {
    if(target) {
      if(!document.getElementById(target)) return null;

      const targetElement = document.getElementById(target);

      return (
        <div>
          <div className={cx('main-section', 'background')} id={name} onClick={onClick} >
          </div>
          <div className={cx('main-section')} id={name} onClick={onClick} >
            <Padding height={targetElement.offsetTop} />
            <Padding width={targetElement.offsetLeft} inline={true} />
            {children}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={cx('main-section', 'background', 'middle')} id={name} onClick={onClick} >
        </div>
        <div className={cx('main-section', 'middle')} id={name} onClick={onClick} >
          <Padding height={top} />
          {children}
        </div>
      </div>
    );
  }
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
