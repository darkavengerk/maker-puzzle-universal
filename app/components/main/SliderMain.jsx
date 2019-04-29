import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Link from '../../components/Link';

import SlidingWindow from '../../components/common/SlidingWindow';
import Slider from '../../components/main/Slider';
import Arrow from '../../components/common/Arrow';

import styles from '../../css/components/main-page-v2';

const cx = classNames.bind(styles);

class SliderMain extends Component {

  constructor(props) {
    super(props);
    this.state = {index: 0};
    this.clickLeft = this.clickLeft.bind(this);
    this.clickRight = this.clickRight.bind(this);
    this.autoSlide = this.autoSlide.bind(this);
    this.pager = this.pager.bind(this);
    this.autoSlideRef = setInterval(this.autoSlide, 1000);
    this.slideTime = new Date();
  }

  autoSlide() {
    const now = new Date();
    if(now - this.slideTime >= 3000) {
      this.clickRight();
    }
  }

  clickLeft(evt) {
    this.slideTime = new Date();
    return this.setState(prev => {
      const index = (prev.index || 0) - 1;
      return { index };
    });
  }

  clickRight(evt) {
    this.slideTime = new Date();
    return this.setState(prev => {
      const index = (prev.index || 0) + 1;
      return { index };
    });
  }

  pager() {
    const { children } = this.props;
    const pages = [];
    const nGroups = children.length;
    for(let i=0; i < nGroups; i++) {
      if(i === (this.state.index % nGroups)) {
        pages.push(<div key={i} className={cx('pager', 'pager-active')}></div>);  
      }
      else pages.push(<div key={i} className={cx('pager')}></div>);
    }
    return pages;
  }

  render() {
    const { children } = this.props;
    return (
      <div className={cx('project-focus')}>
        <div className={cx('main-focus-text')}>
          누가 지었을까?
        </div>
        <SlidingWindow 
          width="100%" 
          header={true} 
          index={this.state.index} 
          groupSize={1} 
          className={cx('project-tiles')}
        >
          <div>
            <div className={cx('arrow-area-main', 'arrow-area-left')} onClick={this.clickLeft} role="button">
              <Arrow direction="left" color="white" height={'0.48rem'} width={'0.3rem'} />
            </div>
            <div className={cx('arrow-area-main', 'arrow-area-right-main')} onClick={this.clickRight} role="button">
              <Arrow direction="right" color="white" height={'0.48rem'} width={'0.3rem'} />
            </div>
            <div className={cx('pager-area')}>
              { this.pager() }
            </div>
          </div>
          { children }
        </SlidingWindow>
      </div>
    );
  }
}

SliderMain.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(SliderMain);
