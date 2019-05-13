import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import ContentEditable from 'react-contenteditable'

import AutoComplete from '../../components/AutoComplete';
import Features from '../../components/Features';
import Padding from '../../components/Padding';
import FlexibleImage from '../../components/FlexibleImage';
import Link from '../../components/Link';

import TextInputRound from '../../components/web/TextInputRound';
import SelectCareer from '../../components/Account/SelectCareer';

import { Company } from '../../services';
import { createTextLinks } from '../../utils/functions';

const Component = ({ data, history, cx }) => {

  const preventEnter = evt => {
    if(evt.keyCode === 13) {evt.preventDefault();}
  }

  const addEntry = evt => data.push({name:'', period: '', position:'', newItem: 'true'});
  const removeEntry = node => evt => data.removeRow(node);  
  const swapEntries = (node, direction) => evt => data.swapRows(node.key, node.key + direction);  

  return (
     <div className={cx('info-main')}>
      <div className={cx('account-section-title')}>
        소속 기업
      </div>
      <Padding height={17} />
      <div className={cx('comapny-history-area')}>
        <Padding width={40} />
        <Padding width={215}>기업명</Padding>
        <Padding width={16} />
        <Padding width={130}>재직여부</Padding>
        <Padding width={16} />
        <Padding width={130}>최종 직급</Padding>
        <Padding height={10} />
        {
          data.map(info => [<div className={cx('career-item')}>
            <div className={cx('col-info', 'first-item')}>
              <div className={cx('triangle-up')} onClick={swapEntries(info, -1)} role="button"></div>
              <Padding height="5"/>
              <div className={cx('triangle-down')} onClick={swapEntries(info, 1)} role="button"></div>
            </div>
            <Padding width={24} />
            <span
              className={cx('career-item-company')}
            >
              {info.get('newItem')? 
                <TextInputRound width={215} height={38}>
                  <AutoComplete
                    request={Company().searchCompaniesByName}
                    title="new-company-name"
                    update={info.access('name').attach('direct')}
                    text={info.get('name')}
                    className={cx('text-input', 'company-title', 'new-company-name')}
                    textLimit={50}
                    top="2.2rem"
                    width="16rem"
                    placeholder="기업명을 입력 후 선택하세요"
                  />
                </TextInputRound> : info.get('name')
              }
            </span>
            <Padding width={16} />
            <SelectCareer
              className={cx('career-item-period')}
              width={130}
              height={29}
              data={info.access('period')}
              placeholder={'선택해 주세요'}
            />
            <Padding width={16} />
            <TextInputRound 
              width={130}
              height={38}
              placeholder="ex) 대리, 팀장" 
              data={info.access('position')}
            />
            <Padding width={7} />
            <FlexibleImage 
              source={"/site/images/ic_highlight_remove_black_48dp.png"} 
              x={17} y={17} 
              role="button"
              onClick={removeEntry(info)}
              pureImage={true}
            />
          </div>, <div className={cx('ability-item-separator')}/>])
        }
        <Padding height="15" />
        <Padding width="100%">
          <div className={cx('add-entry')} role="button" onClick={addEntry} >+ 항목 추가하기</div>
        </Padding>
        
      </div>
    </div>
  );
};

Component.propTypes = {
};

export default Component;




