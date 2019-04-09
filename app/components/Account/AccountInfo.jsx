import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FlexibleImage from '../../components/FlexibleImage';
import Padding from '../../components/Padding';

import SelectYear from '../../components/Account/SelectYear';
import FormItem from '../../components/web/FormItem';
import FormItemMedium from '../../components/web/FormItemMedium';
import TextInputRound from '../../components/web/TextInputRound';
import FlexibleButton from '../../components/web/FlexibleButton';

const years = [];
const now = new Date().getFullYear();
for(let y = now-14; y > now-100; y--) {
  years.push({value:y, label:y});
}

const disconnectGoogle = user => event => {
  user.access('google').dataChanged(null);
}

const Component = ({ data, cx }) => {
  const facebook = data.access('makerProfile').access('facebook');
  const google = data.access('makerProfile').access('google');
  const marketingAgreed = data.access('marketingAgreed');
  return (
    <div className={cx('info-main')}>
      <div className={cx('account-section-title')}>
        계정 기본정보
      </div>

      <section className={cx('account-section-form-area')}>
        <FormItem label="이메일주소">
          <TextInputRound 
            width="4.58rem" 
            data={data.access('email')}
          />
        </FormItem>

        <FormItem label="이름">
          <TextInputRound
            width="4.58rem"
            data={data.access('name')}
          />
        </FormItem>

        <FormItem label="비밀번호">
          <FlexibleButton
            value="비밀번호 변경"
            width="1rem"
            height="0.3rem"
            backgroundColor="#b1b1b1"
            className={cx('password-button')} />
        </FormItem>

        <FormItem label="성별">
          <input
            type="radio"
            value="M"
            name="gender"
            onChange={data.access('gender').attach()}
            checked={data.get('gender') === 'M'}
          /> 
          <Padding width={9} />
          남자 
          <Padding width={20} />
          <input
            type="radio"
            value="F"
            name="gender"
            onChange={data.access('gender').attach()}
            checked={data.get('gender') === 'F'}
          /> 
          <Padding width={9} />
          여자
        </FormItem>

        <FormItem label="출생연도">
          <SelectYear 
            height={'0.3rem'}
            width={'2.3rem'}
            placeholder="선택해 주세요" 
            data={data.access('birthYear')}
          />
        </FormItem>

        <FormItemMedium label={['로그인', '계정', '연결']} height="0.62rem" labelWidth={'1rem'} padding="0.23rem" >
          <div>
            <div className={cx('auth-button-row')}>
              <FlexibleButton
                onClick={e => window.open("/auth/facebook")}
                width="1.96rem"
                height="0.24rem"
                padding="0"
                backgroundColor="#485b97"
                className={cx('auth-button-fb')}
              >
                <FlexibleImage source="/site/images/FB-icon.jpg" x={16} y={16} />
                <Padding width={6} />
                {data.get('facebook')? facebook.get('name') : '로그인에 Facebook 계정 사용'}
              </FlexibleButton>
              <Padding width={12} />
              <label>
                {data.get('facebook') && '연결해제'}
              </label>
            </div>
            <Padding height={13} />
            <div className={cx('auth-button-row')}>
              <FlexibleButton 
                onClick={e => window.open("/auth/google")}
                width="1.96rem"
                height="0.24rem"
                className={cx('auth-button-google')}
              >
                <FlexibleImage source="/site/images/G-icon.jpg" x={13} y={13} />
                <Padding width={7} />
                {data.get('google')? google.get('displayName') : '로그인에 Google 계정 사용'}
                <Padding width={10} />
              </FlexibleButton>
              <Padding width={12} />
              <label role="button" onClick={disconnectGoogle(data)}>
                {data.get('google') && '연결해제'}
              </label>
            </div>
          </div>
        </FormItemMedium>
      </section>
      <Padding height={25} />
      <div className={cx('info-form-agree')}>
        <input
          type="checkbox"
          checked={marketingAgreed.get()}
          onChange={marketingAgreed.attach('checkbox')}
        />
        <Padding width={10} />
        <label className={cx('info-title')}>
          메이커퍼즐에서 진행하는 이벤트, 프로모션에 대한 광고를 수신하겠습니다.
        </label>
      </div>
    </div>
  );
};

Component.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Component;


