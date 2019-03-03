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

    const popularCompanyPortfolios = companyPortfolios.map(portfolio => {
      // const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide 
                imageFit={true} 
                portfolio={portfolio} 
                referrer={Assist.Company} 
                owner={Assist.Company} 
                key={portfolio.pid} 
                external={true} />
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

    let popularMakerPortfolios = portfolios.map(portfolio => {
        // const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem 
                    portfolio={portfolio} 
                    referrer={Assist.Main} 
                    owner={Assist.Maker} 
                    key={portfolio.pid} 
                    external={true} />);
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
        <div className={cx('project-focus')}>
          <div className={cx('project-focus-main')}>
          </div>
        </div>

        <SectionItem title="Puzzles" link='/more/project/p/popular'>
          {projects.map(p => <ProjectCard key={p.name} project={p} />)}
        </SectionItem>     

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