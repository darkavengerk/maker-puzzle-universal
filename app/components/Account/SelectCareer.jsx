import React from 'react';

import Select from '../../components/web/Select';


const SelectComponent = ({ height='100%', width='100%', placeholder, data, ...props }) => {
  const years = ['재직중', '1년 미만'];
  const now = new Date().getFullYear();
  for(let y = 1; y <= 6; y++) {
    years.push(y + '년 이상');
  }
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
