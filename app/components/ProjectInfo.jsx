import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import ProjectProfile from '../components/ProjectProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import MakerListRoundy from '../components/MakerListRoundy';
import Image from '../components/FlexibleImage';
import { refineCompanyName } from '../utils/functions';

import styles from '../css/components/project-info';

const cx = classNames.bind(styles);

const ProjectInfo = ({ owner }) => {

  const project = owner;

  const users = <MakerListRoundy makers={project.users} />;

  return (project && project.name )? (
    <div className={cx('main-section')}>
      <GreyTitle title={'프로젝트 개요'} bottom="12" />
      <ProjectProfile />

      <GreyTitle title={'참여 기업'} top="38" bottom="16" />
      {project.portfolios.map((p,i) => p.companyName && p.title?
        <div key={i}>
          <Link to={'/company/' + refineCompanyName(p.companyName).replace(' ', '_')} count="company">
            <div className={cx('ref-title')}>{p.companyName}</div>
          </Link>
          <div className={cx('ref-content')}>{p.title}</div>
        </div> : null)
      }

    </div>
  ) : <div></div>;
};

ProjectInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

export default ProjectInfo;
