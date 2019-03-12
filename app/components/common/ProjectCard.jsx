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

  extractProjectSummary(key, count) {
    const { project } = this.props;
    const result = [];
    for(let i=0; i < count; i++) {
      result.push(project.portfolios[i]? project.portfolios[i][key] : '');
    }
    return result;
  }

  extractImages(project, count) {
    let cycle = 0;
    let found = false;
    const images = [];
    while(images.length < count) {
      project.portfolios.map(p => {
        if(images.length < count && p.images[cycle]) {
          found = true;
          images.push(p.images[cycle]);
        }
      });
      if(!found) break;
      cycle += 1;
    }
    return images;
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
    const { project, screen, direction, population=4 } = this.props;
    let location = project.features.filter(f => f.repr === 'location');
    location = location[0]? location[0] : null;
    const locationName = location && location.content? location.content : '';

    if(screen.showing === 'loading') {
      return <Link className={cx('project-tile')} to={'/project/' + project.link_name} role="button" count="project"></Link>
    }

    let images = <FlexibleImage 
      x={'100%'} y={'100%'} 
      source={project.profilePicture || project.portfolios[0].images[0]} 
      version="large"
    />

    if(this.state.mouseover) {
      const imageList = this.extractImages(project, population);
      images = imageList.map((img,i) => <FlexibleImage 
        x={(200 / population) + '%'} y={'50%'} 
        key={i}
        source={img} 
        version="medium"
      />)
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
            {images}
            <div 
              className={cx({'project-tile-image-filter':this.state.mouseover})}
              onMouseLeave={this.mouseout}
            >
              <div className={cx('project-tile-image-text')}>
              { this.state.mouseover && <div className={cx('project-tile-image-text-item', 'right')}>
                {this.extractProjectSummary('companyName', population).map((name, i) => 
                  <div className={cx('text-strict')} key={i}>{name}</div>)}
                </div> }
              { this.state.mouseover && <div className={cx('project-tile-seperator', {'seperator-long':population === 6})}></div> }
              { this.state.mouseover && <div className={cx('project-tile-image-text-item', 'left')}>
                {this.extractProjectSummary('title', population).map((title, i) => 
                  <div className={cx('text-strict')} key={i}>{title}</div>)}
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