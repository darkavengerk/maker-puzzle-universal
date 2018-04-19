import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import FlexibleImage from '../components/FlexibleImage';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const MakerProfile = ({ maker }) => {

  return (
    <div className={cx('main-section')}>
      <p className={cx('title')}>
        메이커 프로필
      </p>
      <span>
        <FlexibleImage src="/images/default_profile.jpg" x={144} y={144} />
        <div className={cx('name')}>
          {maker.name}
          <div className={cx('middle-line')}>
          </div>
          <div className={cx('maker-stats')}>
            <div className={cx('figure')}>
              80
            </div>
            <div className={cx('keyword')}>
              Portfolio
            </div>
          </div>
          <div className={cx('maker-stats')}>
            <div className={cx('figure')}>
              421
            </div>
            <div className={cx('keyword')}>
              Follower
            </div>
          </div>
          <div className={cx('maker-stats')}>
            <div className={cx('figure')}>
              421
            </div>
            <div className={cx('keyword')}>
              Following
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

MakerProfile.propTypes = {
  maker: PropTypes.object.isRequired
};

export default MakerProfile;
