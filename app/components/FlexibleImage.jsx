import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/flexible-image';

const cx = classNames.bind(styles);

const ProfileImage = ({ src, x=40, y=40 }) => {

  const url = src? src : "/images/default.jpg";

  var imageStyle = {
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize:'cover',
    height: y/10+'rem',
    width: x/10+'rem'
  };

  if(typeof(x) === 'string') {
    imageStyle.width = x;
  }
  if(typeof(y) === 'string') {
    imageStyle.width = y;
  }

  return (
    <span className={cx('main-section')} style={imageStyle} >
    </span>
  );
};

ProfileImage.propTypes = {
  src: PropTypes.string,
};

export default ProfileImage;
