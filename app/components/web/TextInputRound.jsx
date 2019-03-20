import React from 'react';

const TextInput = ({ height='100%', width='100%', placeholder, data, ...props }) => {
  const style = {
    width, height,
    border: 'solid 1px #979797',
    borderRadius: '0.1rem',
    padding: '0 0.1rem  '
  }
  const handler = event => {
    data.setData(event.target.value);
  }
  return <input 
            type="text" 
            style={style} 
            value={data.getData()} 
            onChange={handler} 
            {...props} />
};

export default TextInput;
