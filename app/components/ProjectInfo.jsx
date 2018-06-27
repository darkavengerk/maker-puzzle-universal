import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ProjectProfile from '../components/ProjectProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import Image from '../components/FlexibleImage';
import styles from '../css/components/project-info';

const cx = classNames.bind(styles);

function createRoundy(maker) {
  return (
    <span className={cx('maker-round')}>
      <Image className={cx('maker-round-image')} src={maker.profile.picture} x={110} y={110} />
      {maker.userid}
    </span>
  );
}

const ProjectInfo = ({ owner }) => {

  const project = owner;

  const users = project.users.map(user => createRoundy(user));

  return (project && project.name )? (
    <div className={cx('main-section')}>
      <GreyTitle title={'프로젝트 개요'} bottom="13" />
      <ProjectProfile />

      <GreyTitle title={'참여 기업'} top="38" />

      <GreyTitle title={'프로젝트 참여 메이커'} top="33" bottom="26" />
      <div className={cx('maker-area')}>
        {users}
        {users}
        {users}
        {users}
      </div>

    </div>
  ) : <div></div>;
};

ProjectInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

export default ProjectInfo;
