import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import ContentEditable from 'react-contenteditable'

import AutoComplete from '../../components/AutoComplete';
import Features from '../../components/Features';
import Padding from '../../components/Padding';
import FlexibleImage from '../../components/FlexibleImage';
import Link from '../../components/Link';

import { Company } from '../../services';
import { createTextLinks } from '../../utils/functions';

const Component = ({ history, swapEntries, companyNameChanged, featureChanged, addEntry, removeEntry, cx }) => {

  const preventEnter = evt => {
    if(evt.keyCode === 13) {evt.preventDefault();}
  }

  let lines = history.map(info => {
    return (
      <tr key={info.order}>
        <td className={cx('col-info', 'first-item')}>
          <div className={cx('triangle-up')} onClick={swapEntries(info.order, -1)} role="button"></div>
          <Padding height="5"/>
          <div className={cx('triangle-down')} onClick={swapEntries(info.order, 1)} role="button"></div>
        </td>
        
        {info.newItem?
          <td>
            <AutoComplete
              request={Company().searchCompaniesByName}
              title="new-company-name"
              update={companyNameChanged(info.order)}
              text={info.name}
              className={cx('text-input', 'company-title', 'new-company-name')}
              textLimit={50}
              top="2.2rem"
              width="16rem"
              placeholder="기업명을 입력 후 선택하세요"
            />
          </td> :
          <td className={cx('text-input', 'company-title', (info.current? "col-selected": ""))}>
            <Link to={'/company/' + info.name.replace(' ', '_')} count="company">{info.name}</Link>
          </td>
        }
        <td>
          <ContentEditable 
            className={cx('text-input', 'company-period', (info.current? "col-selected": ""))}
            html={info.period} 
            tagName="span"
            placeholder="ex)1년2개월"
            onChange={featureChanged(info.order, 'period')}
            onKeyPress={preventEnter}
            onKeyDown={preventEnter}
          />
        </td>
        <td className={cx('last-item')}>
          <ContentEditable 
            className={cx('text-input', 'company-position', (info.current? "col-selected": ""), 'last-item')}
            html={info.position} 
            tagName="span"
            placeholder="&nbsp;ex)대리, 팀장"
            onChange={featureChanged(info.order, 'position')}
            onKeyPress={preventEnter}
            onKeyDown={preventEnter}
          />
        </td>
        <td className={cx('text-input', 'erase-buttons')} >
          <FlexibleImage 
            source={"/site/images/ic_highlight_remove_black_48dp.png"} 
            x={17} y={17} 
            role="button"
            onClick={removeEntry(info.order)}
            pureImage={true}
          />
        </td>
      </tr>)
  });

  return (
    <div className={cx('comapny-history-area')}>
      <table className={cx('history')} >
        <tbody>
          <tr>
            {history.length? <th className={cx('first-item')}></th>: null}
            <th>기업명</th>
            <th>재직여부</th>
            <th className={cx('last-item')}>최종 직급</th>
            <th className={cx('erase-buttons')}></th>
          </tr>
          {lines}
        </tbody>
      </table>
      <Padding height="15" />
      <div className={cx('add-entry')} role="button" onClick={addEntry} >+ 항목 추가하기</div>
      
    </div>
  );
};

Component.propTypes = {
};

export default Component;




