import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const SingleLine = ({width, color, thickness}) => {
  let style = {
    height : thickness/100 + 'rem',
    width : width/100 + 'rem',
    borderTop: `solid ${thickness/100}rem ${color}`
  };

  if(typeof(width) === 'string') {
    style.width = width;
  }

  return (
    <div style={style}>
    </div>
  );
};

SingleLine.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number,
  extend: PropTypes.number
};

export default SingleLine;
