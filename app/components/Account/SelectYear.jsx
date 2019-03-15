import React from 'react';

import Select from '../../components/web/Select';

const years = [];
const now = new Date().getFullYear();
for(let y = now-14; y > now-100; y--) {
  years.push({value:y, label:y});
}

const SelectComponent = ({ height='100%', width='100%', placeholder, value, eventHandler, ...props }) => {

  return <Select 
            height={height}
            width={width}
            value={value}
            onChange={eventHandler}
            options={years}
            placeholder={placeholder}
            {...props}
          />
};

export default SelectComponent;
