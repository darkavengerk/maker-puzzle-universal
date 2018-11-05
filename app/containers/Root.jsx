import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const Root = ({ children }) => {
  return (
    <div className={'root'}>
      {children}
    </div>
  );
};

Root.propTypes = {
  children: PropTypes.object
};

export default Root;
