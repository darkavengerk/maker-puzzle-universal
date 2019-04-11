import React from 'react';

function convertToFloat(input) {
  if(input && !isNaN(input)) {
    return parseFloat(input)/100 + 'rem';
  }
  return input;
}

const Padding = ({width=0, height=0, inline=false, children}) => {
  width = convertToFloat(width);
  height = convertToFloat(height);
  const style = { width, height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',    
  };
  if(width || inline) {
    style.display = 'inline-flex'
  }
  return (
    <div style={style}>
      { children }
    </div>
  );
};

export default Padding;
