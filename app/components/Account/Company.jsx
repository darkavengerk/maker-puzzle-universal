import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const Component = ({ companies, cx }) => {

  return (
    <div className={cx('info-main')}>
      <div className={cx('info-title')}>
        소유한 기업페이지
      </div>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


