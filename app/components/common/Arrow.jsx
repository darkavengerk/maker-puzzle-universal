import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../../components/FlexibleImageLazy';
import Padding from '../../components/Padding';
import styles from '../../css/components/portfolio-item-v2';

const cx = classNames.bind(styles);

const Arrow = ({ direction, color, height, width, ...props }) => {

  const style = {
    height,
    width,
    backgroundColor: color,
    zIndex:9
  };

  if(direction === 'right') {
    style['WebkitClipPath'] = 'polygon(35% 0%, 100% 50%, 35% 100%, 0% 100%, 65% 50%, 0% 0%)';
    style['clipPath'] = 'polygon(35% 0%, 100% 50%, 35% 100%, 0% 100%, 65% 50%, 0% 0%)';
  }
  else {
    style['WebkitClipPath'] = 'polygon(100% 0%, 35% 50%, 100% 100%, 65% 100%, 0% 50%, 65% 0)';
    style['clipPath'] = 'polygon(100% 0%, 35% 50%, 100% 100%, 65% 100%, 0% 50%, 65% 0)';
  }

  return <div style={style} {...props}>
        </div>;
};

export default Arrow;
