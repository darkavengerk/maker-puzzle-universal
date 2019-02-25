import React from 'react';
import PropTypes from 'prop-types';
import Padding from '../../components/Padding';

const Component = ({ children, label, height='0.3rem', labelWidth='0.55rem', inputWidth='1rem', padding='0.35rem', cx }) => {
  if(typeof(label) === 'string') {
    label = label.split('')
  }
  return (
    <div style={{display:'flex', height, alignItems: 'center'}}>
      <div style={{display:'flex', justifyContent: 'space-between', width: labelWidth}}>
        {label.map((l,i) => <span key={i}>{l}</span>)}
      </div>
      <Padding width={padding} />
      { children }
    </div>
  );
};

Component.propTypes = {
};

export default Component;


