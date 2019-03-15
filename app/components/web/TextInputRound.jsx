import React from 'react';

const TextInput = ({ height='100%', width='100%', placeholder, value, onChange, ...props }) => {
  const style = {
    width, height,
    border: 'solid 1px #979797',
    borderRadius: '0.1rem',
    padding: '0 0.1rem  '
  }
  return <input 
            type="text" 
            style={style} 
            value={value} 
            onChange={onChange} 
            {...props} />
};

export default TextInput;
