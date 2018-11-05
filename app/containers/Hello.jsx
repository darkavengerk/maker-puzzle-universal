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

import styles from '../css/components/main-page';
const cx = classNames.bind(styles);

import { loginMenu, cancelLogin } from '../actions/users';

class HelloPageSection extends Component {

  constructor(props) {
    super(props);
  }

  render() {   
    return (
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
      </FullPage>);
  }
};

HelloPageSection.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, 
  { loginMenu, cancelLogin })(HelloPageSection);