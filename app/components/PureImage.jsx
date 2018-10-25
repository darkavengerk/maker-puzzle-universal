import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import LazyLoad from 'react-lazyload';

const ProfileImage = ({ src, x='auto', y='auto', ...props }) => {

  let url = src? src : "/images/default.jpg";
  if(typeof(src) === 'object' && src.original) {
    url = src.original;
  }

  var imageStyle = {
    width : x,
    height : y
  };

  if(typeof(x) === 'number') {
    imageStyle.width = x/10+'rem';
  }

  if(typeof(y) === 'number') {
    imageStyle.height = y/10+'rem';
  }

  return (
    <LazyLoad height={y} >
      <img {...props} src={url} style={imageStyle} >
      </img>
    </LazyLoad>
  );
};

export default ProfileImage;
