import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-item';

const cx = classNames.bind(styles);

const ContentsSection = ({ images }) => {

  if(!images || images.length === 0) {
    return <Image src={''} x={437} y={214}/>
  }

  if(images.length === 1) {
    return <Image src={images[0]} x={437} y={214}/>;
  }

  if(images.length === 2) {
    return <div className={cx('windows')}>
            <Image src={images[0]} x={218} y={213}/>
            <Image src={images[1]} x={218} y={213}/>
          </div>;
  }

  let subs = images.slice(1);

  if(images.length <= 5) {
    return <div className={cx('windows')}>
            <div className={cx('big-window')}>
              <Image src={images[0]} x={324} y={213}/>
            </div>
            <div className={cx('small-windows')}>
              <Image className={cx('small-window')} src={images[1]} x={112} y={106}/>
              <div className={cx('extras')}>+{images.length-2} photos</div>
            </div>
          </div>;
  }

  subs = images.slice(1, 4);

  return <div className={cx('windows')}>
            <div className={cx('middle-window')}>
              <Image src={images[0]} x={213} y={213}/>
            </div>
            <div className={cx('small-windows')}>
              { 
                subs.map(img => <Image className={cx('small-window')} key={img._id} src={img} x={111} y={106}/>)              
              }
              <div className={cx('extras')}>+{images.length - 4} photos</div>
            </div>
          </div>;
};

export default ContentsSection;
