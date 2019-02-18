import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const Component = ({ items, selected, onClick, cx, cxPrefix='' }) => {

  const menu = items.map((item, i) => (
    <div 
      key={i} 
      onClick={e => onClick(i)}
      className={cx(cxPrefix + (i === selected? 'item-selected' : 'item'))}
    >
      {item}
    </div>
  ));

  return (
    <div className={cx(cxPrefix + 'main')}>
      {menu}
    </div>
  );
};

Component.propTypes = {
};

export default Component;


