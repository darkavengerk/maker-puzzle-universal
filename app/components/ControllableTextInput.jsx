import React from 'react';

const Component = ({ 
    text,
    notify,
    keyHook,
    onChange, 
    onBlur,
    className, 
    placeholder, 
    width, 
    top 
  }) => {  

  return (
    <input
      value={text}
      onChange={evt => notify(evt.target.value)}
      onKeyDown={keyHook}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
}

export default Component;
