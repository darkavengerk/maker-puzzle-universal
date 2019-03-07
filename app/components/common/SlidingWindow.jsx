import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Image from '../../components/FlexibleImageLazy';

class SlidingWindow extends Component {
  constructor(props) {
    super(props);
    this.state = { mouseover: false, slideIndex: 0 };
    this.mouseover = this.mouseover.bind(this);
    this.mouseout = this.mouseout.bind(this);
    this.getItemStyle = this.getItemStyle.bind(this);
  }

  mouseover(evt) {
    if(!this.state.mouseover)
      this.setState({ mouseover: true });
  }

  mouseout(evt) {
    this.setState(prev => this.setState({slideIndex: prev.slideIndex + 1}));
    if(this.state.mouseover)
      this.setState({ mouseover: false });
  }

  getItemStyle() {
    const { children, width, height='auto', groupSize=1, ...props } = this.props;
    const index = this.state.slideIndex % Math.ceil(children.length / groupSize);
    return {
      display: 'inline-block',
      position: 'relative',
      width, height,
      transform: `translateX(calc(-100% * ${index}))`,
    　WebkitTransform: `translateX(calc(-100% * ${index}))`,
      transition: '0.5s ease-in-out',
      WebkitTransition: '0.5s ease-in-out',
    };
  }

  groupedChildren() {
    const { children, groupSize=1 } = this.props;
    if(!children) return [];
    let index = 0;
    const made = [children.slice(index, groupSize)];
    while(index + groupSize < children.length) {
      index += groupSize;
      made.push(children.slice(index, index + groupSize));
    }
    return made;
  }

  render() {
    const { children, className, width, height, leftSlide, rightSlide, groupSize=1,  ...props } = this.props;
    const style ={
      width,
      height,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    };
    const rows = this.groupedChildren();
    return (
      <div 
        style={style}
        onMouseOver={this.mouseover}
        onMouseLeave={this.mouseout}
        {...props}
      >
        {
          rows.map((row, i) => 
            <div key={i} style={this.getItemStyle(i)}>
              <div className={className}>
              {row}
              </div>
            </div>)
        }
      </div>
    );
  }
}

SlidingWindow.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(SlidingWindow);
