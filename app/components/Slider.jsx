import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/slider';

const cx = classNames.bind(styles);

const Slider = ({ toggle, value=false, width, height }) => {

  return (
    <label className={cx('switch')}>
      <input type="checkbox" onChange={toggle} checked={value} />
      <span className={cx('slider', 'round')} style={{width: '5.0rem', height: '2.8rem', 
        position: 'relative', display: 'inline-block', top:'.3rem'}}></span>
    </label>
  );
};

Slider.propTypes = {
  toggle: PropTypes.func,
};

export default Slider;
