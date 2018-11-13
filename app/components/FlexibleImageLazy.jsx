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

  ComponentDidMount() {
    forceCheck();
  }

  render() {
    const { y, children, ...props } = this.props;

    const height = y || 40;



    return (
      <LazyLoad height={height} throttle={200}>
        <FlexibleImage y={y} {...props} >
          {children}
        </FlexibleImage>
      </LazyLoad>
    );
  }
}

export default LazyFlexibleImage;
