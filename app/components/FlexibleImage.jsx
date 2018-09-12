import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import PureImage from './PureImage';
import { loadImage } from '../actions/images';

class ProfileImage extends Component {

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
    const { src, x, y, children, loadImage, pureImage=false, ...props } = this.props;

    let url;

    if(typeof(src) === 'string') {
      if(src.includes('/')) {
        url = src;
      }
      else {
        const newImage = loadImage(src);
        url = newImage.original || '';
      }
    }
    else {
      url = src? src.original : '';
    }

    if(pureImage) {
      return (<PureImage src={url} x={x} y={y} {...props} />);
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
      <div {...props} style={imageStyle} >
        {children}
      </div>
    );
  }
}

ProfileImage.propTypes = {
};

function mapStateToProps(state) {
  return {
    image: state.image
  };
}

export default connect(mapStateToProps, { loadImage })(ProfileImage);
