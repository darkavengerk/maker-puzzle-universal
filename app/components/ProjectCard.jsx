import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import FlexibleImage from '../components/FlexibleImageLazy';
import Padding from '../components/Padding';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../css/components/business-card';

const cx = classNames.bind(styles);

const ProjectCardSection = ({project, ...props}) => {

  let location = project.features.filter(f => f.repr === 'location');
  location = location[0]? location[0] : null;
  const locationName = location && location.content? location.content : '';
  return (
    <Link className={cx('project-tile')} to={'/project/' + project.link_name} role="button" count="project">
      <div className={cx('header')}>
        <Padding height="85" />
        <div className={cx('title')}>
          {project.name.split(' ').map((word, i) => <label key={i}>{word}</label>)}
        </div>
        <Padding height="10" />
        <div className={cx('sub-title')}>
          {locationName}
        </div>
        <Padding height="90" />
        <div className={cx('detail-button')} role="button">
          +{project.portfolios.length} Portfolios
        </div>
      </div>
      <FlexibleImage 
        className={cx('project-tile-image')} 
        x={390} y={320} 
        source={project.profilePicture || project.portfolios[0].images[0]} 
        version="large"
      />
    </Link>

  );
};

ProjectCardSection.propTypes = {
  project: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(ProjectCardSection);