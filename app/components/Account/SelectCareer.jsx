import React from 'react';

import Select from '../../components/web/Select';

const years = ['재직중', '1년 이하'];
const now = new Date().getFullYear();
for(let y = 1; y < 10; y++) {
  years.push(y + '년');
}
years.push('10년 이상');

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
