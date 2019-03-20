import React from 'react';
import Select from 'react-select';

const SelectComponent = ({ height='100%', width='100%', placeholder, value, options, eventHandler, ...props }) => {
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
  return <Select 
            value={{value, label:value}}
            styles={customStyles}
            onChange={eventHandler}
            options={options}
            placeholder={placeholder}
            {...props}
          />
};

export default SelectComponent;
