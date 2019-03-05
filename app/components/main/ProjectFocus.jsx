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

  extractImages(project) {
    let cycle = 0;
    const images = [];
    while(images.length < 12) {
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
    const { project } = this.props;
    const boxRows = this.extractImages(project);
    return (
      <div className={cx('project-focus')}>
        <div className={cx('project-focus-boxes')}>
          <div className={cx('project-focus-box-row')}>
            {boxRows[0].map(img => <FlexibleImage className={cx('project-focus-box')} x={226} y={229} source={img} />)}
          </div>
          <Padding height={3} />
          <div className={cx('project-focus-box-row')}>
          {boxRows[1].map(img => <FlexibleImage className={cx('project-focus-box')} x={226} y={229} source={img} />)}
          </div>
          <Padding height={3} />
          <div className={cx('project-focus-box-row')}>
          {boxRows[2].map(img => <FlexibleImage className={cx('project-focus-box')} x={226} y={229} source={img} />)}
          </div>
        </div>
        <div
          className={cx('project-focus-main-space')}
          role="button"
        />
        <FlexibleImage 
          source={project.profilePicture} x={'60%'} y={'100%'}
          className={cx('project-focus-main', {'project-focus-main-hover': this.state.mouseover})}
          zIndex="2"
        />
        <div className={cx('project-focus-filter')} role="button">
          <div className={cx('project-focus-filter-title-area')}>
            <div className={cx('project-focus-filter-title')}>
              { project.name }
            </div>
            <div className={cx('project-focus-filter-title2')}>
              누가 지었을까?
            </div>
          </div>
          <div className={cx('project-focus-filter-makers')}>
            <div className={cx('project-focus-filter-makers-button', {'filter-makers-button': this.state.mouseover})}>
              엔딩크레딧 보러가기
            </div>
            <div className={cx('project-focus-filter-makers-text')}>
              <div className={cx('project-tile-image-text-item', 'right')}>
                {this.extractProjectSummary('companyName').map((name, i) => <div key={i}>{name}</div>)}
              </div>
              <div className={cx('project-tile-seperator')}></div>
              <div className={cx('project-tile-image-text-item', 'left')}>
                {this.extractProjectSummary('title').map((title, i) => <div key={i}>{title}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ProjectFocus.propTypes = {
  project: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, {})(ProjectFocus);