import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

const MakerInfo = ({ owner }) => {

  const maker = owner;

  return maker && maker.makerProfile ? (
    <div className={cx('main-section')}>
      <GreyTitle title={'메이커 프로필'} bottom="13" />
      <MakerProfile maker={maker} />

      <GreyTitle title={'소속 기업'} top="38" />
      <CompanyHistory maker={maker} />

      <GreyTitle title={'능력치'} top="33" bottom="27" />
      <Abilities abilities={maker.makerProfile.abilities} />

      <GreyTitle title={'관련된 메이커'} top="24" bottom="26" />
    </div>
  ) : <div></div>;
};

MakerInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

export default MakerInfo;
