import React from 'react';

const ButtonInput = ({ children, height='100%', width='100%', padding="0.1rem", placeholder, value, onClick, ...props }) => {
  const style = {
    width, height,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #979797',
    borderRadius: '0.1rem',
    padding: '0 ' + padding
  }
  return <div 
            type="button" 
            style={style} 
            onClick={onClick} 
            role="button"
            {...props}>
            { children }
            { value }
          </div>
};

export default ButtonInput;
