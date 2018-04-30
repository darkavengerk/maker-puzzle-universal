import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

const MakerInfo = ({ maker }) => {

  return (
    <div className={cx('main-section')}>
      <GreyTitle title={'메이커 프로필'} />
      <MakerProfile maker={maker} />

      <GreyTitle title={'소속 기업'} />
      <CompanyHistory maker={maker} />

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
