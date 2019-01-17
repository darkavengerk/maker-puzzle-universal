import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import { Maker, Project, Company, create as createObject } from '../utils/objects'
import Assist from '../utils/assist'
import ProjectCard from '../components/ProjectCardMedium';
import MakerCard from '../components/MakerCard';
import Padding from '../components/Padding';
import PortfolioItemWide from '../components/PortfolioItemWide';
import PortfolioItem from '../components/PortfolioItem';
import Popup from '../components/Popup';
import AddPortfolio from '../components/AddPortfolio';
import CompanyClaimUI from '../components/CompanyClaimUI';
import SectionItem from '../components/SectionItem';
import Login from '../components/Login';
import Link from '../components/Link';

import { portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import { loginMenu, cancelLogin } from '../actions/users';

import styles from '../css/components/main-page';

const cx = classNames.bind(styles);

class MainPageSection extends Component {

  constructor(props) {
    super(props);
    this.state = {isAddingPortfolio:false, showClaim:false};
    this.showPortfolioPopup = this.showPortfolioPopup.bind(this);
    this.showMakerPage = this.showMakerPage.bind(this);
    this.cancelShow = this.cancelShow.bind(this);
    this.showClaim = this.showClaim.bind(this);
  }

  cancelShow() {
    this.setState({showClaim: false});
  }

  showClaim() {
    this.setState({showClaim: true});
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
    let { main={}, user, portfoiloEditorCancel, loginMenu, cancelLogin } = this.props;
    let { 
      users=[], 
      projects=[],
      companies=[],
      portfolios=[],
      companyPortfolios=[],
      portfoliosRecent=[],
      companyPortfoliosRecent=[],
    } = main;

    const referrer = createObject('main');

    let feed = user.account.feed || [];
    let feedCount = 0;

    const portfolioFeeds = feed.map(portfolio => {
      if(portfolio.type === 'company') {
        if(feedCount + 2 > 18) return null;
        feedCount += 2;
        const owner = createObject('company', portfolio.company);
        return <PortfolioItemWide imageFit={true} portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} external={true} />  
      }
      else {
        if(feedCount + 1 > 18) return null;
        feedCount += 1;
        const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem portfolio={portfolio} referrer={referrer} owner={owner} key={portfolio.pid} external={true} />);
      }
    })

    const popularCompanyPortfolios = companyPortfolios.map(portfolio => {
      const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide imageFit={true} portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} external={true} />
    })

    const recentCompanyPortfolios = companyPortfoliosRecent.map(portfolio => {
      const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide imageFit={true} portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} external={true} />
    })

    let popularMakerPortfolios = portfolios.map(portfolio => {
        const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem portfolio={portfolio} referrer={referrer} owner={owner} key={portfolio.pid} external={true} />);
      });

    const companyHighlights = companies.map(company => {
      let business = company.features.filter(f => f.repr === 'business');
      business = business[0]? business[0] : null;
      const businessName = business && business.content? business.content : '';
      return <MakerCard
                key={company.name} 
                picture={Assist.Company.getProfileImage(company)}
                title={company.name} 
                subTitle={businessName} 
                isCompany={true}
                linkTo={'/company/' + company.link_name} />;
    });

    const portfoliosByCategory = (main.subContents || []).map(content => {
      return <SectionItem key={content.category} title={content.category} link={'/more/category/' + content.category + '/p'}>
                {
                  content.portfolios.map(portfolio => {
                    const owner = createObject('company', portfolio.company);
                    return <PortfolioItemWide imageFit={true} portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} external={true} />
                  })
                }
              </SectionItem>
    });

    return (
      <div className={cx('main-section')}>

        <section className={cx('title-section')}>
          <Padding height="42" />
          <div className={cx('main-title')}>
            “여긴 누가 지었을까?”
          </div>
          <Padding height="42" />
          <div className={cx('main-desc')}>
            설계, 시공, 조경, 전기, 환경, 구조, 색채, 인테리어, 가구, 조명, 영상…<br/>
            수많은 전문 분야 메이커들의 협력이 필요한 건축.<br/>
            프로젝트에 ‘실제로 참여한’ 메이커들과 그 작품들을 검색해보세요
          </div>
        </section>

        {user.authenticated && 
        <section className={cx('project-section')}>
          <div className={cx('title')}>
            Following
          </div>
          
          {portfolioFeeds.length > 0? 
          <div className={cx('project-tiles')}>
            { portfolioFeeds }
          </div> : 
          <div className={cx('feed-empty')}>
              아직 아무도 팔로우하지 않으셨네요.<br/>
              관심있는 기업이나 메이커를 팔로우 해보세요.
          </div>}          
        </section>}        

        <SectionItem title="Puzzles" link='/more/project/p/popular'>
          {projects.map(p => <ProjectCard key={p.name} project={p} />)}
        </SectionItem>

        <section className={cx('title-section', 'background2')}>
          <Padding height="45" />
          <div className={cx('main-title')}>
            건축인들을 위한 플랫폼서비스
          </div>
          <Padding height="22" />
          <div className={cx('main-desc')}>
            제일 효과적인 영업 무기는 ‘프로젝트 수행 실적’<br/>
            기업페이지를 소유해 영업망을 확장해 보세요.<br/>
            모든 기능들은 ‘무료’입니다!
          </div>
          <Padding height="42" />
          <div className={cx('rectangle')} onClick={this.showClaim} role="button" id="AddPortfolioButton">
            무료 기업페이지 이용방법
          </div>
          <Popup show={this.state.showClaim} name="ClaimPopup" cancel={this.cancelShow} roll={true} top={100}>
            <CompanyClaimUI isMain={true} />
          </Popup>
        </section>      

        <SectionItem title="New" link='/more/portfolio/company/recent'>
          {recentCompanyPortfolios}
        </SectionItem>

        { portfoliosByCategory }

        <SectionItem title="Company" link="/more/company/c/popular">
          {
            companyHighlights.map((c,i) => (
              <div key={i} className={cx('maker-card')}>
                { c }
              </div>)
            )
          }
        </SectionItem>

        <section className={cx('title-section', 'background3')}>
          <Padding height="45" />
          <div className={cx('main-title')}>
            메이커들이 채워가는 엔딩크레딧
          </div>
          <Padding height="22" />
          <div className={cx('main-desc')}>
            전세계 도시들의 엔딩크레딧에 당신의 이름도 새겨보세요.<br/>
            ‘비밀’ 설정으로 포트폴리오 저장고로 쓸 수도 있어요.
          </div>
          <Padding height="42" />
          <div className={cx('rectangle')} onClick={this.showPortfolioPopup} role="button">
            포트폴리오 등록하기
          </div>
          <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
            <AddPortfolio title="포트폴리오 추가하기" submit={portfoiloSubmit} cancel={portfoiloEditorCancel} />
          </Popup>
        </section>

        <SectionItem title="Maker" link="/more/portfolio/maker/recent">
          {popularMakerPortfolios}
        </SectionItem>

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