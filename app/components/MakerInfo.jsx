import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MakerProfile from '../components/MakerProfile';
import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

const MakerInfo = ({ maker }) => {

  return (
    <div className={cx('main-section')}>
      <MakerProfile maker={maker} />
      <p className={cx('title')}>
        {maker.profile.name}
      </p>
      Maker: {maker.profile.userid}
    </div>
  );
};

MakerInfo.propTypes = {
  maker: PropTypes.object.isRequired
};

export default MakerInfo;
