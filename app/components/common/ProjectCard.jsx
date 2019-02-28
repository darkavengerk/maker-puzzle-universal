import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../../components/Link';
import FlexibleImage from '../../components/FlexibleImageLazy';
import Padding from '../../components/Padding';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../../css/components/business-card-v2';

const cx = classNames.bind(styles);

const ProjectCardSection = ({project, screen, direction, ...props}) => {

  let location = project.features.filter(f => f.repr === 'location');
  location = location[0]? location[0] : null;
  const locationName = location && location.content? location.content : '';
  if(screen.showing === 'loading') {
    return <Link className={cx('project-tile')} to={'/project/' + project.link_name} role="button" count="project"></Link>
  }
  return (
    <Link className={cx('project-tile')} to={'/project/' + project.link_name} role="button" count="project">
      <div className={cx('header')}>
        <div className={cx('title')}>
          {project.name.split(' ').map((word, i) => <label key={i}>{word}</label>)}
        </div>
        <div className={cx('sub-title')}>
          {locationName}
        </div>
      </div>
      <div className={cx('project-tile-image-area')}>
        <FlexibleImage 
          className={cx('project-tile-image')} 
          x={'100%'} y={'100%'} 
          source={project.profilePicture || project.portfolios[0].images[0]} 
          version="large"
        />
      </div>
      <div className={cx('project-info-text', 'project-info-text-'+direction )}>
        { `+${project.portfolios.length} Portfolios`}
      </div>
    </Link>

  );
};

ProjectCardSection.propTypes = {
  project: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, {})(ProjectCardSection);