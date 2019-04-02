import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ContentEditable from 'react-contenteditable'

import FlexibleImage from '../../components/FlexibleImage';
import Padding from '../../components/Padding';
import TextInputRound from '../../components/web/TextInputRound';
import FlexibleButton from '../../components/web/FlexibleButton';

const Component = ({ data, cx }) => {

  return (
    <div className={cx('info-main')}>
      <div className={cx('account-section-title')}>
        탈퇴하기
      </div>
      <section className={cx('account-section-form-area')}>
        이 계정을 영구히 삭제합니다
        <Padding width={22} />
        <FlexibleButton
          value="탈퇴하기"
          width={84}
          height={29}
          radius={8}
          backgroundColor="#b1b1b1"
          borderColor="#979797"
          className={cx('quit-button')} />
      </section>
    </div>
  );
};

Component.propTypes = {
};

export default Component;


