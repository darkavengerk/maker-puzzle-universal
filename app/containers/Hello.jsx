import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import Assist from '../utils/assist'
import ProjectCard from '../components/ProjectCard';
import Padding from '../components/Padding';
import AddPortfolio from '../components/AddPortfolio';
import Login from '../components/Login';
import Link from '../components/Link';
import FullPage from '../components/FullPage';
import FlexibleImage from '../components/FlexibleImage';
import Roundy from '../components/Roundy';
import Popup from '../components/Popup';

import styles from '../css/components/main-page';
import NavStyles from '../css/components/navigation';
const cx = classNames.bind(styles);
const nav = classNames.bind(NavStyles);

import { loginMenu, cancelLogin } from '../actions/users';

class HelloPageSection extends Component {

  constructor(props) {
    super(props);
    this.defaultKeyword = '여의도 한강공원 조명';
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const element = document.getElementById('user-search-input');
    const keyword = element.value || this.defaultKeyword;
    element.value = '';
    browserHistory.push('/search/' + keyword);
  }

  render() {
    const { user, loginMenu, cancelLogin } = this.props;

    const login = user.authenticated? 
          <Roundy 
            user={user.account} 
            x={36} y={36} 
            showName={false}
          /> : 
          <div className={cx('login-button')} onClick={loginMenu} role="button">
            로그인하기
          </div>

    return (
      <div className={cx('landing-main')}>
        <Popup show={user.attempt === 'login'} name="LoginPopup" cancel={cancelLogin} roll={true} top={100}>
          <Login />
        </Popup>
        <div className={cx('landing-top')}>
          <Link to="/main">
            <FlexibleImage src="/site/images/landing-logo.png" x={276} y={118} contain={true} className={cx('landing-logo')}/>
          </Link>
          <div className={cx('login-area')} >
            {login}
          </div>
        </div>
        <FullPage>
          <section className={cx("page", "one")}>
            <div className={cx("title")}>
              “여긴 누가 지었을까?”
            </div>
            <div className={cx("description")}>
              설계, 시공, 조경, 전기, 환경, 구조, 색채, 인테리어, 가구, 조명, 영상…<br/>
              수많은 전문 분야 메이커들의 협력이 필요한 건축.<br/>
              프로젝트에 ‘실제로 참여한’ 메이커들과 그 작품들을 검색해보세요
            </div>
            <Padding height={20} />
            <form onSubmit={this.handleOnSubmit} className={cx('search-bar')}>
              <input type="text" id="user-search-input" className={cx('search-input')} placeholder={this.defaultKeyword} />
              <FlexibleImage src="/site/images/search.png" className={cx('search-icon')} x={21.8} y={21.8} role="button" onClick={this.handleOnSubmit} />
            </form>
            <Padding height={21} />
            <div className={cx('button-main')} role="button">
               메인페이지 구경하기
            </div>
            <Padding height={200} />
          </section>
          <section className={cx("page", "two")}>
            <div className={cx("title")}>
              건축인들을 위한 플랫폼서비스
            </div>
            <div className={cx("description")}>
              건축인들에게 가장 중요한 커리어는 ‘프로젝트 수행 실적’<br/>
              메이커퍼즐로 경력을 관리하고 새로운 기회를 잡아보세요.<br/>
              모든 기능들은 “무료”입니다!
            </div>
          </section>
          <section className={cx("page", "three")}>
            <div className={cx("title")}>
              메이커들이 채워가는<br/>
              건축 작품의 엔딩크레딧
            </div>
            <div className={cx("description")}>
              전세계 도시들의 엔딩크레딧에<br/>
              당신의 이름도 새겨보세요.
            </div>
          </section>
          <section className={cx("page", "four")}>
            <div className={cx("title")}>
              Who we are
            </div>
            <div className={cx("description")}>
              (주)메이커퍼즐은 건축 시장의 불편을 해소하기 위해 뭉친 스타트업 입니다.<br/>
              매일매일 새로운 기능들과 더많은 메이커들의 작품이 업데이트 됩니다.<br/>
              <br/>
              PC로 접속 가능한 Web서비스만 현재 가능하며, (추천 브라우저 : 크롬, 파이어폭스, MS 엣지) <br/>
              모바일 App은 열심히 개발중! 곧 만날 수 있습니다.
            </div>
          </section>
        </FullPage>
      </div>
      );
  }
};

HelloPageSection.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, 
  { loginMenu, cancelLogin })(HelloPageSection);