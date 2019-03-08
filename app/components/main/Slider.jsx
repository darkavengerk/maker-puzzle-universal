import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Link from '../../components/Link';

import SlidingWindow from '../../components/common/SlidingWindow';
import Arrow from '../../components/common/Arrow';

import styles from '../../css/components/main-page-v2';

const cx = classNames.bind(styles);

class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {index: 0};
    this.clickLeft = this.clickLeft.bind(this);
    this.clickRight = this.clickRight.bind(this);
  }

  clickLeft(evt) {
    return this.setState(prev => {
      const index = (prev.index || 0) - 1;
      return { index };
    });
  }

  clickRight(evt) {
    return this.setState(prev => {
      const index = (prev.index || 0) + 1;
      return { index };
    });
  }

  render() {
    const { children, groupSize=1 } = this.props;
    return (
        <SlidingWindow 
          width="100%" 
          header={true} 
          index={this.state.index} 
          groupSize={groupSize} 
          className={cx('project-tiles')}
        >
          <div>
            <div className={cx('arrow-area', 'arrow-area-left')} onClick={this.clickLeft} >
              <Arrow direction="left" color="white" height={'0.48rem'} width={'0.3rem'} />
            </div>
            <div className={cx('arrow-area', 'arrow-area-right')} onClick={this.clickRight} >
              <Arrow direction="right" color="white" height={'0.48rem'} width={'0.3rem'} />
            </div>
          </div>
          { children }
        </SlidingWindow>);
  }
}

Slider.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(Slider);
