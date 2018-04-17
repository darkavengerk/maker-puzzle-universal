import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TopicItem from '../components/TopicItem';
import styles from '../css/components/top-title';

const cx = classNames.bind(styles);

const TitleSection = ({ title, thumbnailURL }) => {

  const url = thumbnailURL? thumbnailURL : "/images/IU-2.jpg";

  return (
    <div className={cx('main-section')}>
      <div className={cx('bar')} >
        <img src={url} className={cx('thumbnail')} />
        <span className={cx('title')}>
          {title}
        </span>
      </div>
    </div>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string
};

export default TitleSection;
