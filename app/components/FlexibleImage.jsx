import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/flexible-image';

const cx = classNames.bind(styles);

const ProfileImage = ({ thumbnailURL, x=40, y=40 }) => {

  const url = thumbnailURL? thumbnailURL : "/images/IU-2.jpg";

  var imageSize = {
    height: x/10+'rem',
    width: y/10+'rem'
  };

  return (
    <div className={cx('main-section')}>
      <img src={url} style={imageSize} />
    </div>
  );
};

ProfileImage.propTypes = {
  thumbnailURL: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
};

export default ProfileImage;
