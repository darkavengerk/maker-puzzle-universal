import React from 'react';
import classNames from 'classnames/bind';

import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import FlexibleImage from '../components/FlexibleImage';

import styles from '../css/components/company-claim';
const cx = classNames.bind(styles);

const Component = ({ cancel, submit, isOwned, isMain=false }) => {
  if(isOwned) {
    return (
      <div className={cx('popup-area', 'popup-area-owned', 'small-area')} >
        <div className={cx('popup-title')} >
          이미 소유된 페이지입니다.
        </div>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <Padding height={'1.6rem'} />
        <div className={cx('details-owned')}>
          * 실수로 신청한 소유권 철회나, 선점된 페이지에 대한 이의를 제기하실 수 있습니다.<br/>
          &nbsp;&nbsp;[문의 메일 : help@maker-puzzle.com]
        </div>
        <Padding height={'1.8rem'} />
      </div>
    );
  }

  return (
    <div className={cx(isMain? 'main-area' : 'popup-area')} >
      <div className={cx('popup-title')} >
        무료 기업페이지 이용방법
      </div>
      <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      <Padding height={'2.3rem'} />
      <div className={cx('popup-message')}>
        대표님! 온라인 홍보에 시간 뺏기지 마세요.
        <div className={cx('popup-message-sub')}>
          프로젝트에만 집중하시도록 메이커퍼즐이 도와드립니다.
        </div>
      </div>
      <Padding height={'3.5rem'} />
      <div className={cx('box')}>
        <div className={cx('box-title')}>
          누구에게 필요할까? 
        </div>
        홈페이지가 없는 중,소기업<br/>
        홈페이지가 있지만 업데이트가 불편하고, 매년 리뉴얼 비용을 지불하는 기업<br/>
        온라인마케팅 채널(포털광고,블로그,SNS)을 운영하지만 효과가 낮은 기업
      </div>
      <Padding height={'2rem'} />
      <div className={cx('main-title')}>
        기업페이지 소유하기
      </div>
      <Padding height={'1.5rem'} />
      <SingleLine width={'12.2rem'} color={'#5d5d5d'} thickness={3} />
      <Padding height={'2.2rem'} />
      <div className={cx(isMain? ['circles', 'circles-big'] : 'circles')}>
        <div className={cx('blue-circle')}>
          회원가입<br/>
          로그인
        </div>
        {isMain? [
          <FlexibleImage source={'/site/images/main-arrow.png'} x={53} y={53} />,
          <div className={cx('blue-circle')}>
            개인 프로필<br/>
            소속기업 수정
          </div>
        ]: null}
        
        <FlexibleImage source={'/site/images/main-arrow.png'} x={53} y={53} />
        <div className={cx('blue-circle')}>
          생성된<br/>
          기업페이지<br/>
          방문
        </div>
        <FlexibleImage source={'/site/images/main-arrow.png'} x={53} y={53} />
        <div className={cx('blue-circle')}>
          ‘무료 기업<br/>
          페이지소유하기’<br/>
          신청
        </div>
      </div>
      <Padding height={'4rem'} />

      {isMain? null: [
      <div className={cx('details')}>
        * ‘<span className={cx('point-text')}>이 페이지 소유하기</span>’를 클릭하면 프로필 편집, 수행실적 등록이 가능합니다.<br/>
        * 이 기업 관계인이 아님에도 페이지를 부당하게 선점하여 기업의 이미지를 실추시킬 경우 <br/>
        &nbsp;&nbsp;즉각적인 제재가 가해짐을 알립니다.<br/>
        * 실수로 신청한 소유권 철회나, 선점된 페이지에 대한 이의를 제기하실 수 있습니다.<br/>
        &nbsp;&nbsp;[문의 메일 : help@maker-puzzle.com]
      </div>,            
      <Padding height={'3rem'} />,
      <SingleLine width={'100%'} color={'#e5e5e5'} thickness={1} />,
      <div className={cx('buttons')}>
        <label className={cx('submit-button', 'cancel')} onClick={cancel} role="button">
          취 소
        </label>
        <label className={cx('submit-button')} onClick={submit} role="button">
          이 페이지 소유하기
        </label>
      </div>]}
      
    </div>
  );
}

export default Component;
