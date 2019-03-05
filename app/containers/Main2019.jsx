import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import { Maker, Project, Company, create as createObject } from '../utils/objects'
import Assist from '../utils/assist'
import ProjectCard from '../components/common/ProjectCard';
import Title from '../components/main/Title';
import ProjectFocus from '../components/main/ProjectFocus';
import MakerCard from '../components/MakerCard';
import Padding from '../components/Padding';
import PortfolioItemWide from '../components/common/PortfolioItem';
import PortfolioItem from '../components/common/PortfolioItem';
import Popup from '../components/Popup';
import AddPortfolio from '../components/AddPortfolio';
import CompanyClaimUI from '../components/CompanyClaimUI';
import SectionItem from '../components/main/SectionItem';
import Login from '../components/Login';
import Link from '../components/Link';

import { portfoiloEditorStart, portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import { loginMenu, cancelLogin } from '../actions/users';

import styles from '../css/components/main-page-v2';

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
      projects=[],
      projectsNew=[],
      companyPortfoliosRecent=[],
    } = main;

    // const referrer = createObject('main');

    let feed = user.account.feed || [];
    let feedCount = 0;

    const portfolioFeeds = feed.map(portfolio => {
      if(portfolio.type === 'company') {
        if(feedCount + 2 > 18) return null;
        feedCount += 2;
        // const owner = createObject('company', portfolio.company);
        return <PortfolioItemWide 
                  imageFit={true} 
                  portfolio={portfolio} 
                  referrer={Assist.Main} 
                  owner={Assist.COmpany} 
                  key={portfolio.pid} 
                  external={true} />  
      }
      else {
        if(feedCount + 1 > 18) return null;
        feedCount += 1;
        const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem 
                  portfolio={portfolio} 
                  referrer={Assist.Main} 
                  owner={Assist.Maker} 
                  key={portfolio.pid} 
                  external={true} />);
      }
    })

    const recentCompanyPortfolios = companyPortfoliosRecent.map(portfolio => {
      // const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide 
                imageFit={true} 
                portfolio={portfolio} 
                referrer={Assist.Company} 
                owner={Assist.Company} 
                key={portfolio.pid} 
                external={true} />
    })

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
                    return <PortfolioItemWide 
                              imageFit={true} 
                              portfolio={portfolio} 
                              referrer={Assist.Company} 
                              owner={Assist.Company} 
                              key={portfolio.pid} 
                              external={true} />
                  })
                }
              </SectionItem>
    });

    return (
      <div className={cx('main-section')}>
        <ProjectFocus project={projects[1]} />

        <Title text="메이커들이 채워가는 건축의 엔딩크레딧">
          <div className={cx('sub-title-text')}>
            직접 수행한 프로젝트의 엔딩크레딧에 당신의 이름도 새겨보세요
          </div>
        </Title>

        <SectionItem title="Puzzles" link='/more/project/p/popular'>
          {projects.slice(0,6).map((p,i) => <ProjectCard key={p.name} project={p} direction={i % 2 === 0? 'right' : 'left'} />)}
        </SectionItem>

        <SectionItem title="Puzzles New" link='/more/project/p/recent'>
          {projectsNew.slice(0,6).map((p,i) => <ProjectCard key={p.name} project={p} direction={i % 2 === 0? 'right' : 'left'} />)}
        </SectionItem>

        <Title text="분야별 메이커들의 포트폴리오">
          <div className={cx('sub-title-text')}>
            제일 효과적인 영업무기는 ‘프로젝트 수행실적’<br/>
            포트폴리오를 공유해 새로운 기회를 잡아보세요
          </div>
        </Title>

        <SectionItem title="New" link='/more/portfolio/company/recent'>
          {recentCompanyPortfolios}
        </SectionItem>

        { portfoliosByCategory }

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