import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const SingleLine = ({width, color, thickness}) => {
  let style = {
    height : thickness + 'px',
    width : width + 'px',
    'border-bottom': `solid ${thickness}px ${color}`
  };
  return (
    <div style={style}>
    </div>
  );
};

SingleLine.propTypes = {
  width: PropTypes.number,
  color: PropTypes.string,
  thickness: PropTypes.number
};

export default SingleLine;
