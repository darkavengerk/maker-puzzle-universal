import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const MakerProfile = ({ maker }) => {

  return (
    <div className={cx('main-section')}>
      <p className={cx('title')}>
        메이커 프로필
      </p>
      <span className={cx('flex-row')}>
        <FlexibleImage src="/images/default_profile.jpg" x={144} y={144} />
        <span className={cx('user-info')}>
          <span className={cx('name')}>
            {maker.profile.name}
          </span>
          <Border width={181} thickness={2} color={'#dadada'} />
          <span className={cx('stats-area', 'flex-row')}>
            <span className={cx('maker-stats', 'flex-col')}>
              <span className={cx('figure')}>
                80
              </span>
              <span className={cx('keyword')}>
                Portfolio
              </span>
            </span>
            <span className={cx('maker-stats', 'flex-col')}>
              <span className={cx('figure')}>
                421
              </span>
              <span className={cx('keyword')}>
                Follower
              </span>
            </span>
            <span className={cx('maker-stats', 'flex-col')}>
              <span className={cx('figure')}>
                421
              </span>
              <span className={cx('keyword')}>
                Following
              </span>
            </span>
          </span>
          <span className={cx('follow-button')} role="button">
            FOLLOW
          </span>
        </span>
      </span>
    </div>
  );
};

MakerProfile.propTypes = {
  maker: PropTypes.object.isRequired
};

export default MakerProfile;
