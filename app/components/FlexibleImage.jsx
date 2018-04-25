import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/flexible-image';

const cx = classNames.bind(styles);

const ProfileImage = ({ src, x=40, y=40 }) => {

  const url = src? src : "/images/default.jpg";

  var imageSize = {
    height: y/10+'rem',
    width: x/10+'rem'
  };

  return (
    <div className={cx('main-section')}>
      <img src={url} style={imageSize} />
    </div>
  );
};

ProfileImage.propTypes = {
  src: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
};

export default ProfileImage;
