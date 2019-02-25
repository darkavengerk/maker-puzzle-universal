import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FormItem from '../../components/Account/FormItem';

const Component = ({ user, items, selected, onClick, cx }) => {

  return (
    <div className={cx('info-main')}>
      <div className={cx('account-section-title')}>
        계정 기본정보
      </div>

      <section className={cx('account-section-form-area')}>
        <FormItem label="이메일주소">
          <input type="text" value={user.email} />
        </FormItem>

        <FormItem label="이름">
          <input type="text" value={user.name} />
        </FormItem>

        <FormItem label="비밀번호">
          <input type="button" />
        </FormItem>

        <FormItem label="성별">
          <input type="radio" /> 남자 <input type="radio" /> 여자
        </FormItem>

        <FormItem label="출생연도">
          <input type="list" value={user.birthYear} />
        </FormItem>

        <FormItem label={['로그인', '계정', '연결']} labelWidth={'1rem'} padding="0.23rem" >
          <div>
            <div>
              <input type="button" value="facebook" />
            </div>
            <div>
              <input type="button" value="google" />
            </div>
          </div>
        </FormItem>

      </section>
      <div className={cx('info-form-1')}>
        <input type="checkbox" />
        <label className={cx('info-title')}>
          메이커퍼즐에서 진행하는 이벤트, 프로모션에 대한 광고를 수신하겠습니다.
        </label>
      </div>
      
    </div>
  );
};

Component.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Component;


