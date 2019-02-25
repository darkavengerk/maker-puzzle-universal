import React from 'react';
import PropTypes from 'prop-types';
import Padding from '../../components/Padding';

const Component = ({ children, label, onChange, height='0.3rem', labelWidth='0.5rem', inputWidth='1rem', padding='0.3rem', cx }) => {
  const style={

  }
  return (
    <div style={{display:'flex', heigth}}>
      <div style={{display:'flex', justifyContent: 'space-between'}} className={cx('text-input-label')}>
        {label}
      </div>
      <Padding width={padding} />
      <div style={{borderRadius: '25%'}} className={cx('text-input-box')}>
        <input type="text" className={cx('text-input-text')} />
      </div>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


