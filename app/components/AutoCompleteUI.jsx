import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import ControllableTextInput from '../components/ControllableTextInput';
import FloatingList from '../components/FloatingList';

import styles from '../css/components/auto-complete';

const cx = classNames.bind(styles);

const Component = ({ 
    text,
    textChanged,
    textSelected,
    keyHook,
    onChange, 
    onBlur,
    className, 
    placeholder, 
    items,
    showList,
    width='32.7rem', 
    top='2.7rem' 
  }) => {  

  return (
    <div className={cx('relative')} >
      <ControllableTextInput           
        notify={textChanged} 
        text={text}
        keyHook={keyHook}
        placeholder={'기업명을 입력 후 선택하세요'}
        onBlur={onBlur}
      />
      <FloatingList
        className={cx('relative')} 
        notify={textSelected} 
        items={items}
        show={showList}
      />
    </div>
  );
}

export default Component;
