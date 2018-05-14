import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import ContentEditable from 'react-contenteditable'


const Comp = ({ features, featureEdited, classNames, placeHolder, editing=false, ...props }) => {

  let splitLetters = word => {
    return word.split('').map((letter,i) => {
      return (<span key={i}>{letter}</span>);
    })
  }

  const preventEnter = evt => {
    if (evt.key === 'Enter') {
        evt.preventDefault();
    }
  }

  const handleChange = title => {
    return evt => {
        featureEdited(title, evt.target.innerText);
    }
  }

  let longest = Math.max.apply(null, features.map(feature => feature.title.length));

  let featureElements = features.map(feature => {
    return (
      <div className={classNames.row} key={feature.title}>
        <span className={classNames.title} style={{width:longest*1.3 + 'rem'}}>
          {splitLetters(feature.title)}
        </span>
        <ContentEditable 
          tagName="span"
          className={classNames.content}
          html={ feature.content }
          onKeyPress={preventEnter}
          onKeyUp={handleChange(feature.title)}
          placeholder={placeHolder}
          disabled={!editing}
        />
        
      </div>
    );
  });

  let featureArea = (
    <div {...props}>
        {featureElements}
    </div>
  );

  return featureArea;
};

Comp.propTypes = {
  features: PropTypes.array.isRequired,
  featureEdited: PropTypes.func,
  classNames: PropTypes.object,
  placeHolder: PropTypes.string,
  editing: PropTypes.bool
};

export default Comp;
