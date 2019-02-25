import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import FlexibleImage from '../../components/FlexibleImage';

const Component = ({ abilities, onChange, cx }) => {

  const featureEdited = abilities => {
    onChange({ abilities }, 'makerProfile');
  }

  const titleChanged = order => evt => {
    const value = evt.target.value;
    const newState = abilities.map(ab => {
      if(ab.order === order) return {...ab, title: value};
      return ab;
    });
    featureEdited(newState);
  }

  const abilityClicked = (clicked, index) => evt => {
    const newState = abilities.map(ab => {
      if(ab.order === clicked.order) return {...ab, ability: index};
      else return ab;
    })
    featureEdited(newState);
  }

  const fillOvals = ab => {
    var made = [];
    for(let i=1; i<=5; i++) {
      made.push( 
        <span 
          key={i} 
          className={cx(ab.ability < i ? 'ovalEmpty' : 'ovalFill')} 
          onClick={abilityClicked(ab, i)}
          role={'button'}
        ></span>
      );
    }
    return made;
  }

  const removeEntry = order => evt => {
    let  newState = abilities.filter(ab => ab.order !== order);
    newState = newState.map( (s, i) => ({...s, order: i}));
    featureEdited(newState);
  }

  const addEntry = evt => featureEdited([...abilities, {order: abilities.length, title:'', ability:0 }]);

  let abilitiesHTML = abilities.map(ab => {
    return (
      <div key={ab.order} className={cx('ability-item')}>
        <ContentEditable 
          className={cx('ability-title')}
          html={ab.title} 
          tagName="span"
          placeholder="입력해주세요."
          onChange={titleChanged(ab.order)}
          disabled={false}
        />
        
        { fillOvals(ab) }
        
        <FlexibleImage 
          source={"/site/images/ic_highlight_remove_black_48dp.png"} 
          x={17} y={17} 
          role="button"
          onClick={removeEntry(ab.order)}
          pureImage={true}
        />
      </div>);
  });

  return (
    <div className={cx('ability-section', 'ability-section-editing')}>
      <div className={cx('ability-entries')} >
        {abilitiesHTML}
      </div>
      <div className={cx('add-entry')} role="button" onClick={addEntry} >+ 항목 추가하기</div>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


