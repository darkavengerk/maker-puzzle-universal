import React from 'react';

const ButtonInput = ({ 
  children,
  height='100%',
  width='100%',
  thickness='0.01rem',
  borderType='solid',
  borderColor='black',
  backgroundColor='white',
  radius='0.1rem',
  shadow='0',
  padding="0.1rem",
  value,
  onClick,
  ...props
}) => {
  const style = {
    width, height,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    radius: radius,
    padding: '0 ' + padding,
    backgroundColor,
    border: borderType + ' ' + thickness + ' ' + borderColor,
    boxShadow: `0 3px 15px 0 rgba(141, 141, 141, ${shadow})`
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
