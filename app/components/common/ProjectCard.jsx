import React, { Component } from 'react';
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

class ProjectCardSection extends Component {
  constructor(props) {
    super(props);
    this.state = { mouseover: false };
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
  }

  extractProjectSummary(key) {
    const { project } = this.props;
    const result = [];
    for(let i=0; i<4; i++) {
      result.push(project.portfolios[i]? project.portfolios[i][key] : '');
    }
    return result;
  }

  mouseover(evt) {
    if(!this.state.mouseover)
      this.setState({ mouseover: true });
  }

  mouseout(evt) {
    if(this.state.mouseover)
      this.setState({ mouseover: false });
  }

  render() {
    const { project, screen, direction } = this.props;
    let location = project.features.filter(f => f.repr === 'location');
    location = location[0]? location[0] : null;
    const locationName = location && location.content? location.content : '';
    if(screen.showing === 'loading') {
      return <Link className={cx('project-tile')} to={'/project/' + project.link_name} role="button" count="project"></Link>
    }
    return (
      <Link 
        to={'/project/' + project.link_name}
        count="project"
        role="button" 
      >
        <div
          className={cx('project-tile', {'project-tile-hover': this.state.mouseover})} 
          onMouseOver={this.mouseover}
          onMouseLeave={this.mouseout}
        >
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
              className={cx('project-tile-image', { 'project-tile-image-hover': this.state.mouseover })} 
              x={'100%'} y={'100%'} 
              source={project.profilePicture || project.portfolios[0].images[0]} 
              version="large"
            />
            <div 
              className={cx({'project-tile-image-filter':this.state.mouseover})}
              onMouseLeave={this.mouseout}
            >
              <div className={cx('project-tile-image-text')}>
              { this.state.mouseover && <div className={cx('project-tile-image-text-item', 'right')}>
                {this.extractProjectSummary('companyName').map((name, i) => <div key={i}>{name}</div>)}
                </div> }
              { this.state.mouseover && <div className={cx('project-tile-seperator')}></div> }
              { this.state.mouseover && <div className={cx('project-tile-image-text-item', 'left')}>
                {this.extractProjectSummary('title').map((title, i) => <div key={i}>{title}</div>)}
                </div> }
              </div>
            </div>
          </div>
          <div className={cx('project-info-text', {'project-info-text-hover': this.state.mouseover}, 'project-info-text-'+direction )}>
            { `+${project.portfolios.length} Portfolios`}
          </div>
        </div>
      </Link>
    );
  }
}


ProjectCardSection.propTypes = {
  project: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, {})(ProjectCardSection);