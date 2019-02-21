import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import SingleLine from '../../components/SingleLine';

const Component = ({ left, middle, bottom, cx}) => {

  return (
    <div>
      <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      <div 
        className={cx('layout-main')}
        style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
          { left }
          { middle }
        </div>
        { bottom }
      </div>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


