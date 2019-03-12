import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Image from '../../components/FlexibleImageLazy';
import Padding from '../../components/Padding';

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
    if(this.state.mouseover)
      this.setState({ mouseover: false });
  }

  unitsize() {
    const { children, groupSize=1 } = this.props;
    return Math.ceil(this.getChildren().length / groupSize);
  }

  getItemStyle() {
    const { width, height='auto', index=0 } = this.props;
    let slideIndex = index % this.unitsize();
    if(slideIndex < 0) {
      slideIndex = this.unitsize() + slideIndex;
    }

    return {
      display: 'inline-block',
      marginRight: '0.1rem',
      position: 'relative',
      width, height,
      transform: `translateX(calc(-1*(100% + 0.1rem) * ${slideIndex}))`,
    　WebkitTransform: `translateX(calc(-1*(100% + 0.1rem) * ${slideIndex}))`,
      transition: '0.5s ease-in-out',
      WebkitTransition: '0.5s ease-in-out',
    };
  }

  getLayer() {
    let { children, header=false } = this.props;
    if(header) {
      return children[0].props.children;
    }
    return null;
  }

  getChildren() {
    let { children, header=false } = this.props;
    if(!children) return [];
    if(header) {
      return children[1];
    }
    return children;
  }

  groupedChildren() {
    let { groupSize=1 } = this.props;
    const children = this.getChildren();
    let index = 0;
    const made = [children.slice(index, groupSize)];
    while(index + groupSize < children.length) {
      index += groupSize;
      made.push(children.slice(index, index + groupSize));
    }
    return made;
  }

  render() {
    const { children, header=false, index, className, width, height, leftSlide, rightSlide, groupSize=1,  ...props } = this.props;
    const style ={
      width,
      height,
      whiteSpace: 'nowrap',
      // overflow: 'hidden',
      position: 'relative',
    };
    const headerStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width, height: '100%',
      pointerEvents: 'none',
    };
    const rows = this.groupedChildren();
    const layer = this.getLayer();
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
        <div style={headerStyle}>
          {
            this.state.mouseover && layer && layer.map((l, i) => 
              <div key={i} style={{pointerEvents:'all'}}>{l}</div>
            )
          }
        </div>
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
