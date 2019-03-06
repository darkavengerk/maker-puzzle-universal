import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../../components/FlexibleImageLazy';
import Padding from '../../components/Padding';
import styles from '../../css/components/portfolio-item-v2';

const cx = classNames.bind(styles);

const PortfolioImagesWindowSection = ({ images, hover }) => {

  if(!images || images.length === 0) {
    return <Image source={''} x={330} y={285}/>
  }

  if(images.length === 1) {
    return <div className={cx('windows')}><Image source={images[0]} x={330} y={285} version="large" /></div>;
  }

  if(images.length === 2) {
    return <div className={cx('windows')}>
            <Image source={images[0]} x={330} y={142} version="medium" />
            <Padding height={2} width={330} />
            <Image source={images[1]} x={330} y={142} version="medium" />
          </div>;
  }

  if(images.length === 3) {
    return <div className={cx('windows')}>
              <div className={cx('big-window')}>
                <Image source={images[0]} x={330} y={185} version="medium" />
              </div>
            <Image source={images[1]} x={164} y={98} version="medium" />
            <Image source={images[2]} x={164} y={98} version="medium" />
          </div>;
  }

  return <div className={cx('windows')}>
            <div className={cx('big-window')}>
              <Image source={images[0]} x={330} y={185} version="medium" />
            </div>
          <Image source={images[1]} x={110} y={98} version="small" />
          <Image source={images[2]} x={110} y={98} version="small" />
          <div className={cx('rest-images', {'rest-images-hover': hover} )}>+{images.length-3} photos</div>
        </div>;
};

export default PortfolioImagesWindowSection;
