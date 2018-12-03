import React from 'react';

function convertToFloat(input) {
  if(input && !isNaN(input)) {
    return parseFloat(input)/100 + 'rem';
  }
  return input;
}

const Padding = ({width=0, height=0, inline=false}) => {
  width = convertToFloat(width);
  height = convertToFloat(height);
  const style = { width, height };
  if(width || inline) {
    style.display = 'inline-block'
  }
  return (
    <div style={style}>
    </div>
  );
};

export default Padding;
