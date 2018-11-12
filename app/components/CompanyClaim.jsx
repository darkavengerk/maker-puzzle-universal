import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import SingleLine from '../components/SingleLine';
import Popup from '../components/Popup';
import Padding from '../components/Padding';
import FlexibleImage from '../components/FlexibleImage';
import Assist from '../utils/assist'

import { addOwnCompany } from '../actions/makers';

import styles from '../css/components/company-claim';
const cx = classNames.bind(styles);

class CompanyClaim extends Component {

  constructor(props) {
    super(props);
    this.state = {showPopup: false};
    this.clicked = this.clicked.bind(this);
    this.submit = this.submit.bind(this);
    this.ignore = this.ignore.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  submit() {
    const { user, company, addOwnCompany } = this.props;
    if(user.userid) {
      addOwnCompany(user.userid, company.name, () => {
        this.setState({showPopup: false});
      });
    }
    else {
      alert('로그인이 필요합니다.');
    }
  }

  clicked(evt) {
    evt.preventDefault();
    if(!this.state.showPopup) {
      this.setState({showPopup: true});
    }
  }

  cancel(evt) {
    evt.preventDefault();
    this.setState({showPopup: false});
  }

  ignore(evt) {
    evt.preventDefault();
  }

  render() {
    return (
      <div className={cx('main-section')} onClick={this.ignore}>
        <div className={cx('main-button')} onClick={this.clicked}>
          무료 기업페이지 소유하기
        </div>
        <Popup show={this.state.showPopup} name="ClaimPopup" cancel={this.cancel} roll={false} top={100}>
          <div className={cx('popup-area')} >
            <div className={cx('popup-title')} >
              무료 기업페이지 이용방법
            </div>
            <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
            <Padding height={'2.3rem'} />
            <div className={cx('popup-message')}>
              대표님은 프로젝트에만 집중하세요.<br/>
              홍보, 영업은 메이커퍼즐이 도와드려요!
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
            <div className={cx('circles')}>
              <div className={cx('blue-circle')}>
                회원가입<br/>
                로그인
              </div>
              <FlexibleImage src={'/site/images/main-arrow.png'} x={53} y={53} />
              <div className={cx('blue-circle')}>
                생성된<br/>
                기업페이지<br/>
                방문
              </div>
              <FlexibleImage src={'/site/images/main-arrow.png'} x={53} y={53} />
              <div className={cx('blue-circle')}>
                ‘이 페이지<br/>
                소유하기’<br/>
                신청
              </div>
            </div>
            <Padding height={'4rem'} />
            <div className={cx('details')}>
              * ‘<span className={cx('point-text')}>이 페이지 소유하기</span>’를 클릭하면 프로필 편집, 수행실적 등록이 가능합니다.<br/>
              * 이 기업 관계인이 아님에도 페이지를 부당하게 선점하여 기업의 이미지를 실추시킬 경우 <br/>
              &nbsp;&nbsp;즉각적인 제재가 가해짐을 알립니다.<br/>
              * 실수로 신청한 소유권 철회나, 선점된 페이지에 대한 이의를 제기하실 수 있습니다.<br/>
              &nbsp;&nbsp;[문의 메일 : help@maker-puzzle.com]
            </div>            
            <Padding height={'3rem'} />
            <SingleLine width={'100%'} color={'#e5e5e5'} thickness={1} />
            <div className={cx('buttons')}>
              <label className={cx('submit-button', 'cancel')} onClick={this.cancel} role="button">
                취 소
              </label>
              <label className={cx('submit-button')} onClick={this.submit} role="button">
                이 페이지 소유하기
              </label>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

CompanyClaim.propTypes = {
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    user: state.user.account
  };
}

export default connect(mapStateToProps, { addOwnCompany })(CompanyClaim);
