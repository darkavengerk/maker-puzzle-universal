import React from 'react';
import Select from 'react-select';

function convertToFloat(input) {
  if(input && !isNaN(input)) {
    return parseFloat(input)/100 + 'rem';
  }
  return input;
}

const SelectComponent = ({ height='100%', width='100%', placeholder, value, options, onChange, ...props }) => {
  width = convertToFloat(width);
  height = convertToFloat(height);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted gray',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#f46e1f' : 'white',
      padding: '0.15rem',
    }),
    control: (provided, state) => ({
      ...provided,
      width,
      height,
      boxShadow: "none",
      borderColor: 'gray',
      '&:hover': { borderColor: '#f46e1f' }
    })
  }
  const handler = pair => {
    onChange(pair.value);
  }
  return <Select 
            value={{value, label:value}}
            styles={customStyles}
            onChange={handler}
            options={options.map(x => ({value:x, label:x}))}
            placeholder={placeholder}
            {...props}
          />
};

export default SelectComponent;
