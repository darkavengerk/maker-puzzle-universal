import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import Scatter from '../components/Scatter';
import { createTextLinks } from '../utils/functions';

const Comp = ({ features, featureEdited, classNames, editing=false, ...props }) => {

  if(!features) return <div></div>;

  let splitLetters = word => {
    return word.split('').map((letter,i) => {
      return (<span key={i}>{letter}</span>);
    })
  }

  const preventEnter = evt => {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      evt.preventDefault();
    }
  }

  const handleChange = title => {
    return evt => {
      if (evt.key === 'Enter' || evt.keyCode === 13) {
        evt.preventDefault();
        return;
      }
      featureEdited(title, evt.target.innerText);
    }
  }

  let longest = Math.max.apply(null, features.map(feature => feature.title.length));

  let featureElements = features.map(feature => {
    return (
      <div className={classNames.row} key={feature.title}>
        <Scatter text={feature.title} className={classNames.title} width={longest*0.13 + 'rem'} />
        <ContentEditable 
          tagName="span"
          className={classNames.content + (editing && !feature.blocked ? ' ' + classNames.editing : '')}
          html={ createTextLinks(feature.content) || '' }
          onKeyPress={preventEnter}
          onKeyUp={handleChange(feature.title)}
          placeholder={feature.placeholder}
          disabled={!editing || feature.blocked}
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
  editing: PropTypes.bool
};

export default Comp;
