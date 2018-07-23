import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Switch from "react-switch";

const OnOffSwitch = ({ onChange, checked, name, ...props }) => {

  return (
    <span style={{'textAlign':'left'}}>
      <Switch 
          onChange={onChange}
          checked={checked || false}
          id={name}
          onColor="#ee5400"
          uncheckedIcon={false}
          checkedIcon={false}
        />
    </span>
  );
}

OnOffSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  // name: PropTypes.string.isRequired,
};

export default OnOffSwitch;
