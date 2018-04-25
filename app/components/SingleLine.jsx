import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const SingleLine = ({width, color, thickness}) => {
  let style = {
    height : thickness + 'px',
    width : width + 'px',
    borderTop: `solid ${thickness}px ${color}`
  };
  return (
    <div style={style}>
    </div>
  );
};

SingleLine.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number
};

export default SingleLine;
