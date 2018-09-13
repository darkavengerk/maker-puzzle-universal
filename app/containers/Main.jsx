import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import { Maker, Project, Company, create as createObject } from '../utils/objects'
import ProjectCard from '../components/ProjectCard';
import MakerCard from '../components/MakerCard';
import Padding from '../components/Padding';
import PortfolioItemWide from '../components/PortfolioItemWide';
import PortfolioItem from '../components/PortfolioItem';
import Popup from '../components/Popup';
import AddPortfolio from '../components/AddPortfolio';
import Login from '../components/Login';

import { portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import { loginMenu, cancelLogin } from '../actions/users';

import styles from '../css/components/main-page';

const cx = classNames.bind(styles);

class MainPageSection extends Component {

  constructor(props) {
    super(props);
    this.state = {isAddingPortfolio:false};
    this.showPortfolioPopup = this.showPortfolioPopup.bind(this);
    this.showMakerPage = this.showMakerPage.bind(this);
  }

  showPortfolioPopup(evt) {
    const { user, portfoiloEditorStart, loginMenu } = this.props;
    if(user.authenticated) {
      portfoiloEditorStart();
    }
    else {
      loginMenu();
    }
  }

  showMakerPage(evt) {
    const { user, portfoiloEditorStart, loginMenu } = this.props;
    if(user.authenticated) {
      browserHistory.push('/maker/' + user.account.userid);
    }
    else {
      loginMenu();
    }
  }

  render() {
    let { main, user, portfoiloEditorCancel, loginMenu, cancelLogin } = this.props;

    if(!main.users || !main.companies || !main.projects) {
      main = {users:[], companies:[], projects:[] };
    }

    let userPortfolios = [];
    for(let user of main.users) {
      userPortfolios = userPortfolios.concat(user.portfolios);
    }

    let makerPortfoliosSorted = [...userPortfolios];
    makerPortfoliosSorted.sort( (a,b) => a.created < b.created? 1 : -1);

    let companyPortfolios = [];
    for(let company of main.companies) {
      companyPortfolios = companyPortfolios.concat(company.companyPortfolios);
    }

    let companyPortfoliosSorted = [...companyPortfolios];
    companyPortfoliosSorted.sort( (a,b) => a.created < b.created? 1 : -1);

    const referrer = createObject('main');

    const popularCompanyPortfolios = companyPortfolios.slice(0,9).map(portfolio => {
      const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} external={true} />
    })

    const recentCompanyPortfolios = companyPortfoliosSorted.slice(0,6).map(portfolio => {
      const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} external={true} />
    })

    console.log('recent 6---------------------------');
    recentCompanyPortfolios.map(a => console.log(a));

    let popularMakerPortfolios = userPortfolios.map(portfolio => {
        const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem portfolio={portfolio} referrer={referrer} owner={owner} key={portfolio.pid} external={true} />);
      });

    let recentMakerPortfolios = makerPortfoliosSorted.map(portfolio => {
        const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem portfolio={portfolio} referrer={referrer} owner={owner} key={portfolio.pid} external={true} />);
      });

    const makerHighlights = main.users.map(maker => {
      let occupation = maker.features.filter(f => f.repr === 'occupation');
      occupation = occupation[0]? occupation[0] : null;
      const occupationName = occupation && occupation.content? occupation.content : '';
      return <MakerCard 
                key={maker.userid} 
                picture={maker.picture}
                title={maker.name} 
                subTitle={occupationName} 
                linkTo={'/maker/' + maker.userid} />;
    });

    const companyHighlights = main.companies.map(company => {
      let business = company.features.filter(f => f.repr === 'business');
      business = business[0]? business[0] : null;
      const businessName = business && business.content? business.content : '';
      return <MakerCard 
                key={company.name} 
                picture={company.companyPortfolios[0].images[0]}
                title={company.name} 
                subTitle={businessName} 
                linkTo={'/company/' + company.link_name} />;
    });

    return (
      <div className={cx('main-section')}>

        <section className={cx('title-section')}>
          <Padding height="5.8rem" />
          <div className={cx('main-title')}>
            “여긴 누가 지었을까?”
          </div>
          <Padding height="4rem" />
          <div className={cx('main-desc')}>
            건축 공간은 완성된 순간부터 다양한 가치
            <span className={cx('text-style-1')}>(핫플레이스, 부동산, 일터, 숙박, 문화 등)</span>
            를 담는 상징적 그릇이 됩니다<br/>
            그리고, ‘하나의 건축 공간이 완성’되기 위해서는 ‘수많은 분야 전문가들의 협업이 필요’합니다<br/>
            MAKER PUZZLE에는 각 프로젝트에 
            <span className={cx('text-style-2')}>실제로 참여한 모든 전문가들</span>
            과 <span className={cx('text-style-2')}>그들의 작품들</span>이 모여 있습니다
          </div>
          <Padding height="7.6rem" />
          <div className={cx('rectangle')}>
            누가 만들었는지 궁금했던 건축 프로젝트를 검색해보세요
          </div>
        </section>

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            프로젝트 들여다보기 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {main.projects.slice(0,6).map(p => <ProjectCard key={p.name} project={p} />)}
          </div>
        </section>

        <section className={cx('title-section', 'background2')}>
          <Padding height="5.8rem" />
          <div className={cx('main-title')}>
            포트폴리오를 뽐내 새로운 기회를 잡으세요
          </div>
          <Padding height="4rem" />
          <div className={cx('main-desc')}>
            프로젝트를 수행한 경력은 다양한 ‘기회의 확대’로 이어집니다<br/>
            포트폴리오들은 검색 결과 및 여러 채널
            <span className={cx('text-style-1')}>(해당 프로젝트, 기업 및 메이커 채널)</span>
            에서 노출됩니다<br/>
            또한, 본인만 볼 수 있는 ‘비밀’ 기능을 통해 포트폴리오 저장고로 활용하실 수도 있습니다.
          </div>
          <Padding height="7.6rem" />
          <div className={cx('rectangle')} onClick={this.showPortfolioPopup} role="button" id="AddPortfolioButton">
            포트폴리오 등록하기
          </div>
          <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
            <AddPortfolio title="포트폴리오 추가하기" submit={portfoiloSubmit} cancel={portfoiloEditorCancel} />
          </Popup>
        </section>      

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            인기 수행실적 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {popularCompanyPortfolios}
          </div>
        </section>

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            인기 포트폴리오 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {popularMakerPortfolios.slice(0, 18)}
          </div>
        </section>

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            새로 등록된 수행실적 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {recentCompanyPortfolios}
          </div>
        </section>

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            새로 등록된 포트폴리오 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {recentMakerPortfolios.slice(0, 12)}
          </div>
        </section>

        <section className={cx('title-section', 'background3')}>
          <Padding height="5.8rem" />
          <div className={cx('main-title')}>
            당신은 MAKER입니까?
          </div>
          <Padding height="4rem" />
          <div className={cx('main-desc')}>
            설계, 시공, 조경, 전기, 환경, 구조, 색채, 인테리어, 가구, 조명, 통신, 영상…<br/>
            건축 프로젝트에 실제로 참여한 모든 분야 전문가들을 우리는 “MAKER”라 부릅니다<br/>
            간단한 가입절차 후 메이커로 활동하며 경력을 관리해보세요
          </div>
          <Padding height="7.6rem" />
          <div className={cx('rectangle')} onClick={this.showMakerPage} role="button">
            메이커로 활동하기
          </div>
        </section>

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            주목할만한 메이커들 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {
              makerHighlights.slice(0,6).map((m,i) => (<div key={i} className={cx('maker-card')}>
                              { m }
                            </div>))
            }
          </div>
        </section>

        <section className={cx('project-section')}>
          <div className={cx('title')}>
            주목할만한 기업들 <span className={cx('more-detail')}>더 보기</span>
          </div>
          <Padding height="2.5rem" />
          <div className={cx('project-tiles')}>
            {
              companyHighlights.slice(0,6).map((c,i) => (<div key={i} className={cx('maker-card')}>
                              { c }
                            </div>))
            }
          </div>
        </section>
      </div>

    );
  }
};

MainPageSection.propTypes = {
  main: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    main: state.main,
    user: state.user
  };
}

export default connect(mapStateToProps, 
  { portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit, loginMenu, cancelLogin })(MainPageSection);