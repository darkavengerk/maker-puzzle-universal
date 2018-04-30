import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const MakerProfile = ({ maker }) => {

  let stats = (
    <span className={cx('stats-area', 'flex-row')}>
      <span className={cx('maker-stats', 'flex-col')}>
        <span className={cx('figure')}>
          {maker.portfolios.length}
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
    </span>);

  let splitLetters = word => {
    return word.split('').map((letter,i) => {
      return (<span key={i}>{letter}</span>);
    })
  }

  let features = maker.features.map(feature => {
    return (
      <div className={cx('feature-item')} key={feature.title}>
        <span className={cx('feature-title')}>
          {splitLetters(feature.title)}
        </span>
        <span className={cx('feature')}>
          {feature.content}
        </span>
      </div>
    );
  });

  let featureArea = (
    <div className={cx('feature-area')}>
        {features}
    </div>
  );

  return (
    <div className={cx('main-section')}>
      <span className={cx('flex-row')}>
        <FlexibleImage src="/images/default_profile.jpg" x={144} y={144} />
        <span className={cx('user-info')}>
          <span className={cx('name')}>
            {maker.profile.name}
          </span>
          <Border width={181} thickness={2} color={'#dadada'} />
          {stats}
          <span className={cx('follow-button')} role="button">
            FOLLOW
          </span>
        </span>
      </span>
      <div>
        {featureArea}
        <div className={cx('about-maker')}>
          {maker.about.split('\n').map((sen,i) => (<p key={i}>{sen}</p>))}
        </div>
      </div>
    </div>
  );
};

MakerProfile.propTypes = {
  maker: PropTypes.object.isRequired
};

export default MakerProfile;
