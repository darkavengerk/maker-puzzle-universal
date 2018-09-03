import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import ContentEditable from 'react-contenteditable'

import Padding from '../components/Padding';
import FlexibleImage from '../components/FlexibleImage';

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

  const addEntry = evt => {
    onChange({companies: [...history, {order: history.length, name:'', period:'', position:'', newItem: true, }]}, 'makerProfile');
  }

  const removeEntry = order => evt => {
    let newState = history.filter(info => info.order !== order);
    newState = newState.map( (s, i) => ({...s, order: i}));
    onChange({companies: newState}, 'makerProfile');
  }

  let lines = history.map(info => {
    return (
      <tr key={info.order} draggable="true">
        <td className={cx('col-info', 'first-item')}>{info.order + 1}</td>
        <ContentEditable 
          className={cx('text-input', 'company-title', (info.current? "col-selected": ""))}
          html={info.name} 
          tagName="td"
          placeholder="기업명을 입력 후 선택하세요"
          disabled={info.newItem? false : true}
          onChange={featureChanged(info.order, 'name')}
        />
        <ContentEditable 
          className={cx('text-input', 'compnay-period', (info.current? "col-selected": ""))}
          html={info.period} 
          tagName="td"
          placeholder="ex)1년2개월"
          disabled={!editing}
          onChange={featureChanged(info.order, 'period')}
        />
        <ContentEditable 
          className={cx('text-input', 'company-position', (info.current? "col-selected": ""), 'last-item')}
          html={info.position} 
          tagName="td"
          placeholder="ex)대리, 팀장"
          disabled={!editing}
          onChange={featureChanged(info.order, 'position')}
        />
        {editing? 
        <td className={cx('text-input', 'erase-buttons')} >
          <FlexibleImage 
            src={"/site/images/ic_highlight_remove_black_48dp.png"} 
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
            <th className={cx('first-item')}></th>
            <th>기업명</th>
            <th>재직여부</th>
            <th className={cx('last-item')}>최종 직급</th>
            {editing? <th className={cx('erase-buttons')}></th> : null}
          </tr>
          {lines}
        </tbody>
      </table>
      <Padding height="1.5rem" />
      {editing? <div className={cx('add-entry')} role="button" onClick={addEntry} >+ 항목 추가하기</div> : null}
      
    </div>
  );
};

Component.propTypes = {
  maker: PropTypes.object.isRequired
};

export default Component;
