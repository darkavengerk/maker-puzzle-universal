import React, { Component } from 'react';

class Floater extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      show=false,
      width,
      height='auto',
      top,
      left,
      right,
      bottom,
      children,
      ...props
    } = this.props;

    if(!show) return null;

    const style= {
      position: 'absolute',
      width, height,
      zIndex: 9,
      padding: 0,
      margin: 0,
    }

    if(top) style.top = top;
    if(bottom) style.bottom = bottom;
    if(left) style.left = left;
    if(right) style.right = right;

    return (
      <div style={style} {...props}>
        {children}
      </div>
    );
  }
}

export default Floater;
