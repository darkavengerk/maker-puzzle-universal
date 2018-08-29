import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const Component = ({ abilities }) => {

  function fillOvals(limit) {
    var made = [];
    for(let i=0;i<5;i++) {
      if(limit < i)
        made.push(<span key={i} className={cx('ovalEmpty')}></span>);
      else
        made.push(<span key={i} className={cx('ovalFill')}></span>);
    }
    return made;
  }

  let abilitiesHTML = abilities.map(ab => {
    return (
      <div key={ab.title} className={cx('ability-item')}>
        <ContentEditable 
          className={cx('ability-title')}
          html={ab.title} 
          tagName="span"
          placeholder="간단한 자기 소개를 입력해주세요."
        />
        {fillOvals(ab.ability)}
      </div>);
  });

  return (
    <div className={cx('ability-section')}>
      {abilitiesHTML}
    </div>
  );
};

Component.propTypes = {
  abilities: PropTypes.array.isRequired
};

export default Component;


