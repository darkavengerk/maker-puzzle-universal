import React from 'react';
import PropTypes from 'prop-types';

const Scatter = ({ text, width, ...props }) => {

  let splitLetters = word => {
    if(!word) word = '';
    return word.split('').map((letter,i) => {
      return (<a key={i}>{letter}</a>);
    })
  }

  return (
    <span {...props} style={{width: width, display: 'flex', justifyContent: 'space-between'}}>
      {splitLetters(text)}
    </span>
  );
};

Scatter.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
};

export default Scatter;
