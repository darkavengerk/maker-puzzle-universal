import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/top-title';
import ProfileImage from '../components/FlexibleImage';

const cx = classNames.bind(styles);

const TitleSection = ({ title, thumbnailURL }) => {

  const url = thumbnailURL? thumbnailURL : "/images/default_profile.jpg";

  return (
    <div className={cx('main-section')}>
        <span className={cx('profile-image')}>
          <ProfileImage src={url} x={40} y={40} />
        </span>
        <label className={cx('title')}>
          {title}
        </label>
    </div>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string
};

export default TitleSection;
