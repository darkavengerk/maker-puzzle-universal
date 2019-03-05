import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import LazyLoad from 'react-lazyload';

import PureImage from './PureImage';
import { loadImage } from '../actions/images';

const S3_URL = 'https://s3.ap-northeast-2.amazonaws.com/maker-puzzle-images';
const IMAGE_PROCESSING_VERSION = 'v1.0'

class FlexibleImage extends Component {

  constructor(props) {
    super(props);
    this.state = {shouldLoad: false};

    const { source } = this.props;

    if(typeof(source) === 'string' && !source.includes('/')) {
      this.state.shouldLoad = true;
    }
    this.postProcess = this.postProcess.bind(this);
  }

  componentWillMount() {
    if(this.state.shouldLoad) {
      const { source, loadImage } = this.props;
      loadImage(source);
    }
  }

  postProcess(source) {
    const { x, y, version='original' } = this.props;
    let url = source? source.original : '';
    if(source && source.status === IMAGE_PROCESSING_VERSION) {
        return S3_URL + source.versions[version];
    }
    else if(source && source.status === 'google') {
      return url.replace('50', ''+ (x>y? x:y));
    }
    else if(source && source.status === 'facebook') {
      const facebookID = url.match(/asid=(\d+)/)[1];
      return `https://graph.facebook.com/${facebookID}/picture?height=${y}&width=${x}`
    }
    else return url;
  }

  render() {
    const { source, x, y, children, loadImage, version='original', zIndex, contain=false, pureImage=false, ...props } = this.props;

    let url;

    if(typeof(source) === 'string') {
      if(source.includes('/')) {
        url = source;
      }
      else {
        const newImage = loadImage(source);
        url = this.postProcess(newImage);
      }
    }
    else {
      url = this.postProcess(source);
    }

    const { className, onClick, onMouseDown, onMouseUp, role } = this.props;
    const renderProps = { className, onClick, onMouseDown, onMouseUp, role };

    if(pureImage) {
      return (<PureImage source={url} x={x} y={y} {...renderProps} />);
    }

    const width = x || 40;
    const height = y || 40;

    var imageStyle = {
      display: 'inline-block',
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize:'cover',
      height: height/100+'rem',
      width: width/100+'rem'
    };

    if(contain) {
      imageStyle.backgroundSize = 'contain';
    }

    if(zIndex) {
      imageStyle.zIndex = zIndex;
    }

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
