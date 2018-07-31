import React from 'react';

const Padding = ({width=0, height=0, inline=false}) => {
  const style = { width, height };
  if(inline) {
    style.display = 'inline-block'
  }
  return (
    <div style={style}>
    </div>
  );
};

export default Padding;
