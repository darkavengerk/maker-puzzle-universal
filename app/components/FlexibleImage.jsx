import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import PureImage from './PureImage';

const ProfileImage = ({ src, x, y, pureImage=false }) => {

  const url = src? src : "/images/default.jpg";

  if(pureImage) {
    return (<PureImage src={src} x={x} y={y} />);
  }

  if(!x) x=40;
  if(!y) y=40;

  var imageStyle = {
    display: 'inline-block',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize:'cover',
    height: y/10+'rem',
    width: x/10+'rem'
  };

  if(typeof(x) === 'string') {
    imageStyle.width = x;
  }
  if(typeof(y) === 'string') {
    imageStyle.width = y;
  }

  return (
    <span style={imageStyle} >
    </span>
  );
};

ProfileImage.propTypes = {
  src: PropTypes.string,
};

export default ProfileImage;
