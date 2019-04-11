import React from 'react';

import Select from '../../components/web/Select';

const years = [];
const now = new Date().getFullYear();
for(let y = now-14; y > now-100; y--) {
  years.push(y);
}

const SelectComponent = ({ height='100%', width='100%', placeholder, data, ...props }) => {
  return <Select 
            height={height}
            width={width}
            value={data.get()}
            onChange={data.attach('direct')}
            options={years}
            placeholder={placeholder}
            {...props}
          />
};

export default SelectComponent;
