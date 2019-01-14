import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import Link from '../components/Link';
import Padding from '../components/Padding';
import FlexibleImage from '../components/FlexibleImage';
import AutoComplete from '../components/AutoComplete';
import { Company } from '../services';

import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const Component = ({ maker, editing, onChange, ...props }) => {

  if(!(maker.makerProfile && maker.makerProfile.companies)) return null;

  let history = maker.makerProfile.companies;

  const featureChanged = (order, category) => evt => {
    const value = evt.target.value;
    const newState = history.map(info => {
      if(info.order === order) return {...info, [category]: value};
      return info;
    });
    onChange({companies: newState}, 'makerProfile');
  }

  const companyNameChanged = order => name => {
    const newState = history.map(info => {
      if(info.order === order) return {...info, name};
      return info;
    });
    onChange({companies: newState}, 'makerProfile');
  }

  const addEntry = evt => {
    onChange({companies: [...history, {order: history.length, name:'', period:'', position:'', newItem: true, }]}, 'makerProfile');
  }

  const preventEnter = evt => {
    if(evt.keyCode === 13) {evt.preventDefault();}
  }

  const removeEntry = order => evt => {
    let newState = history.filter(info => info.order !== order);
    newState = newState.map( (s, i) => ({...s, order: i}));
    onChange({companies: newState}, 'makerProfile');
  }

  const swapEntries = (i, direction) => evt => {
    if(i+direction < 0 || i+direction >= history.length) return;
    const temp = history[i+direction];
    history[i+direction] = {...history[i], order: temp.order};
    history[i] = {...temp, order: history[i].order};
    onChange({companies: [...history]}, 'makerProfile');
  }

  let lines = history.map(info => {
    return (
      <tr key={info.order}>
        {editing? 
          <td className={cx('col-info', 'first-item')}>
            <div className={cx('triangle-up')} onClick={swapEntries(info.order, -1)} role="button"></div>
            <Padding height="5"/>
            <div className={cx('triangle-down')} onClick={swapEntries(info.order, 1)} role="button"></div>
          </td> : 
          <td className={cx('col-info', 'first-item')}>{info.order + 1}</td>
        }
        
        {editing && info.newItem?
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
            disabled={!editing}
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
            disabled={!editing}
            onChange={featureChanged(info.order, 'position')}
            onKeyPress={preventEnter}
            onKeyDown={preventEnter}
          />
        </td>
        {editing? 
        <td className={cx('text-input', 'erase-buttons')} >
          <FlexibleImage 
            source={"/site/images/ic_highlight_remove_black_48dp.png"} 
            x={17} y={17} 
            role="button"
            onClick={removeEntry(info.order)}
            pureImage={true}
          />
        </td>: null}
      </tr>)
  });
  return (
    <div className={cx('comapny-history-area')}>
      <table className={cx('history')} {...props} >
        <tbody>
          <tr>
            {history.length? <th className={cx('first-item')}></th>: null}
            <th>기업명</th>
            <th>재직여부</th>
            <th className={cx('last-item')}>최종 직급</th>
            {editing? <th className={cx('erase-buttons')}></th> : null}
          </tr>
          {lines}
        </tbody>
      </table>
      <Padding height="15" />
      {editing? <div className={cx('add-entry')} role="button" onClick={addEntry} >+ 항목 추가하기</div> : null}
      
    </div>
  );
};

Component.propTypes = {
  maker: PropTypes.object.isRequired
};

export default Component;
