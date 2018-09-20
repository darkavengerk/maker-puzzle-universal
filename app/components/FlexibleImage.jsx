import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import PureImage from './PureImage';
import { loadImage } from '../actions/images';

const S3_URL = 'https://s3.ap-northeast-2.amazonaws.com/maker-puzzle-images';
const IMAGE_PROCESSING_VERSION = 'v1.0'

class FlexibleImage extends Component {

  constructor(props) {
    super(props);
    this.state = {shouldLoad: false};

    const { src } = this.props;

    if(typeof(src) === 'string' && !src.includes('/')) {
      this.state.shouldLoad = true;
    }
  }

  componentWillMount() {
    if(this.state.shouldLoad) {
      const { src, loadImage } = this.props;
      loadImage(src);
    }
  }

  render() {
    const { src, x, y, children, loadImage, version='original', pureImage=false, ...props } = this.props;

    let url;

    if(typeof(src) === 'string') {
      if(src.includes('/')) {
        url = src;
      }
      else {
        const newImage = loadImage(src);
        url = newImage.original || '';
        if(newImage.status === IMAGE_PROCESSING_VERSION) {
          url = S3_URL + newImage.versions[version];
        }
      }
    }
    else {
      url = src? src.original : '';
      if(src && src.status === IMAGE_PROCESSING_VERSION) {
        url = S3_URL + src.versions[version];
      }
    }

    const { className, onClick, role } = this.props;
    const renderProps = { className, onClick, role };

    if(pureImage) {
      return (<PureImage src={url} x={x} y={y} {...renderProps} />);
    }

    const width = x || 40;
    const height = y || 40;

    var imageStyle = {
      display: 'inline-block',
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize:'cover',
      height: height/10+'rem',
      width: width/10+'rem'
    };

    if(typeof(width) === 'string') {
      imageStyle.width = width;
    }
    if(typeof(height) === 'string') {
      imageStyle.height = height;
    }

    return (
      <div {...renderProps} style={imageStyle} >
        {children}
      </div>
    );
  }
}

FlexibleImage.propTypes = {
};

function mapStateToProps(state) {
  return {
    image: state.image
  };
}

export default connect(mapStateToProps, { loadImage })(FlexibleImage);
