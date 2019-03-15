import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import SingleLine from '../../components/SingleLine';

const Component = ({ left, middle, bottom, leftWidth='auto', middleWidth='auto', cx}) => {

  return (
    <div
      style={{minHeight:'calc(100vh - 2.85rem)'}}>
      <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      <div 
        className={cx('layout-main')}
        style={{display: 'flex', flexDirection: 'column', width: '100%', height:'100%'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
          <div style={{width: leftWidth}}>
          { left }
          </div>
          <div style={{width: middleWidth}}>
          { middle }
          </div>
        </div>
        <div
          style={{flex:1}}
        >
        </div>
        { bottom }
      </div>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


