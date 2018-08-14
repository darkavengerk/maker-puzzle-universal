import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const Component = ({ datestring, ...props }) => {

  const d = new Date(datestring);

  return (
    <div {...props}>{`${d.getFullYear()}. ${d.getMonth()+1}. ${d.getDate()}`}</div>
  );
};

export default Component;


