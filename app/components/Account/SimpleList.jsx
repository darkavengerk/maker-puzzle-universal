import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const Component = ({ items, selected, onClick, cx }) => {

  const menu = items.map((item, i) => (
    <div 
      key={i} 
      onClick={e => onClick(i)}
      className={cx('list-item', (i === selected? 'list-item-selected' : ''))}
      role="button"
    >
      {item}
    </div>
  ));

  return (
    <div className={cx('list-main')}>
      {menu}
    </div>
  );
};

Component.propTypes = {
};

export default Component;


