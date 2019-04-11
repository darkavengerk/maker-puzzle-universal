import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import FlexibleImage from '../../components/FlexibleImage';
import Padding from '../../components/Padding';
import TextInputRound from '../../components/web/TextInputRound';

const Component = ({ data, cx }) => {

  const abilityClicked = (clicked, index) => evt => {
    clicked.dataChanged(index);
  }

  const fillOvals = ab => {
    var made = [];
    for(let i=1; i<=5; i++) {
      made.push( 
        <span 
          key={i} 
          className={cx(ab.get('ability') < i ? 'ovalEmpty' : 'ovalFill')} 
          onClick={abilityClicked(ab.access('ability'), i)}
          role={'button'}
        ></span>
      );
    }
    return made;
  }

  const removeEntry = index => evt => {
    data.removeRow(index);
  }

  const addEntry = evt => {
    data.push({title:'', ability:0});
  };

  return (
    <div className={cx('info-main')}>
      <div className={cx('account-section-title')}>
        능력치
      </div>
      <section className={cx('account-section-form-area')}>
        <div className={cx('ability-section')}>
          <div className={cx('ability-section-colums')}>
            <Padding width="2.87rem">
              스킬명
            </Padding>
            <Padding width="0.38rem" />
            <Padding width="1.85rem">
              숙련도
            </Padding>
          </div>
          <div className={cx('ability-entries')} > {
            data.map((ab, i) => [
                <div key={i} className={cx('ability-item')}>
                  <TextInputRound 
                    width="2.87rem"
                    height="0.29rem"
                    placeholder="스킬명을 입력하세요" 
                    data={ab.access('title')}
                  />
                  <Padding width="0.38rem" />                  
                
                  { fillOvals(ab) }

                  <FlexibleImage 
                    source={"/site/images/ic_highlight_remove_black_48dp.png"} 
                    x={17} y={17} 
                    role="button"
                    onClick={removeEntry(i)}
                    pureImage={true}
                  />
                </div>, <div className={cx('ability-item-separator')}/>]
            )
          }</div>
          <Padding width="100%" height="0.27rem">
            <div className={cx('add-entry')} role="button" onClick={addEntry} >+ 항목 추가하기</div>
          </Padding>
        </div>
      </section>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


