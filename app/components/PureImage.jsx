import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import LazyLoad from 'react-lazyload';

const ProfileImage = ({ source, x='auto', y='auto', ...props }) => {

  let url = source? source : "/images/default.jpg";
  if(typeof(source) === 'object' && source.original) {
    url = source.original;
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
    <img {...props} src={url} style={imageStyle} >
    </img>
  );
};

export default ProfileImage;
