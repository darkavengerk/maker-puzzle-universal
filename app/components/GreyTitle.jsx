import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const GreyTitle = ({ title }) => {

  return (
    <p className={cx('title')}>
      {title}
    </p>
  );
};

GreyTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default GreyTitle;
