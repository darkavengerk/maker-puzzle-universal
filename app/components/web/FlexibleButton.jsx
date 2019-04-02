import React from 'react';

function convertToFloat(input) {
  if(input && !isNaN(input)) {
    return parseFloat(input)/100 + 'rem';
  }
  return input;
}

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
  width = convertToFloat(width);
  height = convertToFloat(height);
  const style = {
    width, height,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: convertToFloat(radius),
    padding: '0 ' + convertToFloat(padding),
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
