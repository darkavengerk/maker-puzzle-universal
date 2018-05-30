import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const ProfileImage = ({ src, x='auto', y='auto', pureImage=false, ...props }) => {

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
    <img {...props} src={src} style={imageStyle} >
    </img>
  );
};

ProfileImage.propTypes = {
  src: PropTypes.string,
};

export default ProfileImage;
