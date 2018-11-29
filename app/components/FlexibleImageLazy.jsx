import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import LazyLoad from 'react-lazyload';
import { forceCheck} from 'react-lazyload';

import FlexibleImage from './FlexibleImage';

class LazyFlexibleImage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    forceCheck();
  }

  render() {
    const { y, children, screen, ...props } = this.props;

    const height = y || 40;

    if(screen.loadingCount > 1)
      return (
        <LazyLoad height={height}>
          <FlexibleImage y={y} {...props} >
            {children}
          </FlexibleImage>
        </LazyLoad>
      );
    return (
      <FlexibleImage y={y} {...props} >
        {children}
      </FlexibleImage>
    );
  }
}

function mapStateToProps(state) {
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, {})(LazyFlexibleImage);
