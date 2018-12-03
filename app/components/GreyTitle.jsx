import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const GreyTitle = ({ className='title', title, top=0, bottom=0 }) => {

  let styleOption = {
    'width': '100%',
    'letterSpacing': 'normal',
    'fontWeight': 'bold',
    'fontStyle': 'normal',
    'fontStretch': 'normal',
    'letterSpacing': 'normal',
    'textAlign': 'left',
    'verticalAlign': 'middle',
    'marginTop': `${top/100}rem`,
    'marginBottom': `${bottom/100}rem`,
    'paddingLeft': '0.07rem'
  };

  return (
    <div className={cx(className)} style={styleOption}>
      {title}
    </div>
  );
};

GreyTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default GreyTitle;
