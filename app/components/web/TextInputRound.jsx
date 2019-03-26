import React from 'react';

function convertToFloat(input) {
  if(input && !isNaN(input)) {
    return parseFloat(input)/100 + 'rem';
  }
  return input;
}

const TextInput = ({ height='100%', width='100%', data, children, ...props }) => {
  width = convertToFloat(width);
  height = convertToFloat(height);
  const style = {
    width, height,
    border: 'solid 1px #979797',
    borderRadius: '0.1rem',
    padding: '0 0.1rem',
  }
  if(children) {
    style.display = 'inline-block';
    return <div style={style} {...props}> { children } </div>
  }
  return <input 
            type="text" 
            style={style} 
            value={data.get()} 
            onChange={data.attach()} 
            {...props} />
};

export default TextInput;
