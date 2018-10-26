import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Padding from '../components/Padding';
import styles from '../css/components/popup';

const cx = classNames.bind(styles);

const Popup = ({ show, name, children, cancel, top='15rem', left=0, roll=false, target }) => {

  const onClick = evt => {
    if(cancel && evt.target.id === name) {
      cancel();
    }
  }

  if(show) {
    
    if(target) {
      if(!document.getElementById(target)) return null;

      const targetElement = document.getElementById(target);
      const paddingTop = targetElement.offsetTop + top;
      const paddingLeft = targetElement.offsetLeft + left;

      return (
        <div>
          <div className={cx('main-section', 'background')} id={name} onClick={onClick} >
          </div>
          <div className={cx('main-section')} id={name} onClick={onClick} 
            style={{padding: paddingTop + 'px 0 0 ' + paddingLeft +'px'}} >
            {children}
          </div>
        </div>
      );
    }

    if(roll) {
      top = window.scrollY + top + 'px';
    }
    else {
      window.scrollTo(0, 0);
    }

    return (
      <div>
        <div className={cx('main-section', 'background')} id={name} onClick={onClick} >
        </div>
        <div className={cx('main-section')} id={name} onClick={onClick} >
          <Padding height={top} />
          <div className={cx('middle')} id={name} onClick={onClick}>
            {children}
          </div>
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
