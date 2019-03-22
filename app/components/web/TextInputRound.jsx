import React from 'react';

const TextInput = ({ height='100%', width='100%', data, ...props }) => {
  const style = {
    width, height,
    border: 'solid 1px #979797',
    borderRadius: '0.1rem',
    padding: '0 0.1rem  '
  }
  return <input 
            type="text" 
            style={style} 
            value={data.get()} 
            onChange={data.attach()} 
            {...props} />
};

export default TextInput;
