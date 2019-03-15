import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../../components/Link';
import FlexibleImage from '../../components/FlexibleImageLazy';
import Padding from '../../components/Padding';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../../css/components/main-page-v2';

const cx = classNames.bind(styles);

class ProjectFocus extends Component {
  constructor(props) {
    super(props);
    this.state = { mouseover: false, projectIndex: 0 };
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.clickLeft = this.clickLeft.bind(this);
    this.clickRight = this.clickRight.bind(this);
  }

  clickLeft(evt) {
    evt.preventDefault();
    this.setState(prev => {
      let nextIndex = prev.projectIndex - 1;
      if(nextIndex >= 0)
        return {projectIndex: nextIndex};
      else return {projectIndex: this.props.projects.length-1};
    });
  }

  clickRight(evt) {
    evt.preventDefault();
    this.setState(prev => {
      let nextIndex = prev.projectIndex + 1;
      if(nextIndex < this.props.projects.length)
        return {projectIndex: nextIndex};
      else return {projectIndex: 0};
    });
  }

  extractProjectSummary(project, key) {
    const result = [];
    for(let i=0; i<8; i++) {
      result.push(project.portfolios[i]? project.portfolios[i][key] : '-');
    }
    return result;
  }

  extractImages(project) {
    let cycle = 0;
    const images = [];
    while(images.length < 12 && cycle < 12) {
      project.portfolios.map(p => {
        if(images.length < 12 && p.images[cycle]) {
          images.push(p.images[cycle]);
        }
      });
      cycle += 1;
    }
    return [images.slice(0, 4), images.slice(4, 8), images.slice(8, 12)];
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
    const { projects, project } = this.props;
    // if(!projects || !projects.length) return <div></div>;
    // const project = projects[this.state.projectIndex];
    const boxRows = this.extractImages(project);
    return (
      <Link to={'/project/' + project.link_name} className={cx('project-focus')} onMouseOver={this.mouseover}>
        <div className={cx('project-focus-boxes')}>
          <div className={cx('project-focus-box-row')}>
            {boxRows[0].map((img, i) => <FlexibleImage key={i} className={cx('project-focus-box')} x={226} y={229} source={img} />)}
          </div>
          <Padding height={3} />
          <div className={cx('project-focus-box-row')}>
          {boxRows[1].map((img, i) => <FlexibleImage key={i} className={cx('project-focus-box')} x={226} y={229} source={img} />)}
          </div>
          <Padding height={3} />
          <div className={cx('project-focus-box-row')}>
          {boxRows[2].map((img, i) => <FlexibleImage key={i} className={cx('project-focus-box')} x={226} y={229} source={img} />)}
          </div>
        </div>
        <div
          className={cx('project-focus-main-space')}
          role="button"
        />
        <div className={cx('hide-overflow')}>
          <FlexibleImage 
            source={project.profilePicture} x={'100%'} y={'100%'}
            className={cx('project-focus-main', {'project-focus-main-hover': this.state.mouseover})}
            zIndex="2"
          />
        </div>
        <div className={cx('project-focus-filter')} onMouseLeave={this.mouseout} role="button">
          <div className={cx('project-focus-filter-title-area')}>
            <div className={cx('project-focus-filter-title')}>
              { project.name }
            </div>
            <div className={cx('project-focus-filter-title2')}>
            </div>
          </div>
          <Padding height={100} />
          <div className={cx('project-focus-filter-makers')}>
            <div className={cx('project-focus-filter-makers-button', {'filter-makers-button': this.state.mouseover})}>
              엔딩크레딧 보러가기
            </div>
            <Padding height={10} />
            <div className={cx('project-focus-filter-makers-text')}>
              <div className={cx('project-tile-image-text-item', 'right')}>
                {this.extractProjectSummary(project, 'companyName').map((name, i) => <div key={i}>{name}</div>)}
              </div>
              <div className={cx('project-tile-seperator')}>
                <div className={cx('project-tile-seperator-main')}>
                </div>
                <div className={cx('project-tile-seperator-dot')}>
                </div>
                <div className={cx('project-tile-seperator-dot')}>
                </div>
                <div className={cx('project-tile-seperator-dot')}>
                </div>
              </div>
              <div className={cx('project-tile-image-text-item', 'left')}>
                {this.extractProjectSummary(project, 'title').map((title, i) => <div key={i}>{title}</div>)}
              </div>
            </div>
          </div>
        </div>
        
        
      </Link>
    );
  }
}


ProjectFocus.propTypes = {
};

function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, {})(ProjectFocus);