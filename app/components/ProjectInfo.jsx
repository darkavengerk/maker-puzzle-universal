import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

const ProjectInfo = ({ owner }) => {

  const project = owner;

  return project? (
    <div className={cx('main-section')}>
      <GreyTitle title={'프로젝트 개요'} bottom="13" />

      <GreyTitle title={'참여 기업'} top="38" />

      <GreyTitle title={'프로젝트 참여 메이커'} top="33" bottom="27" />

    </div>
  ) : <div></div>;
};

ProjectInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

export default ProjectInfo;
