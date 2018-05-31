import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Switch from "react-switch";

import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';
import Scatter from '../components/Scatter';
import styles from '../css/components/add-portfolio';

const cx = classNames.bind(styles);

const OnOffSwitch = ({ onChange, checked, name, ...props }) => {

  return (
    <Switch 
        onChange={onChange}
        checked={checked || false}
        id={name}
        onColor="#ee5400"
        uncheckedIcon={false}
        checkedIcon={false}
      />
  );
}

OnOffSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  // name: PropTypes.string.isRequired,
};

export default OnOffSwitch;
