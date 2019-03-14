import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { browserHistory } from 'react-router';

import { Maker, Project, Company, create as createObject } from '../utils/objects'
import Assist from '../utils/assist'
import ProjectCard from '../components/common/ProjectCard';
import Slider from '../components/main/Slider';
import SliderMain from '../components/main/SliderMain';
import Arrow from '../components/common/Arrow';
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
  }

  render() {
    let { main={}, user } = this.props;
    let { 
      projects=[],
      projectsNew=[],
      companyPortfoliosRecent=[],
    } = main;

    let feed = user.account.feed || [];
    let feedCount = 0;

    const portfolioFeeds = feed.map(portfolio => {
      if(portfolio.type === 'company') {
        if(feedCount + 2 > 18) return null;
        feedCount += 2;
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
      return <PortfolioItemWide 
                imageFit={true} 
                portfolio={portfolio} 
                referrer={Assist.Company} 
                owner={Assist.Company} 
                key={portfolio.pid} 
                external={true} />
    })

    const portfoliosByCategory = (main.subContents || []).map(content => {
      return <SectionItem key={content.category} title={content.category} link={'/more/category/' + content.category + '/p'}>
                 <Slider groupSize={4}>
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
                </Slider>
              </SectionItem>
    });

    return (
      <div className={cx('main-section')}>
        <SliderMain>
          {
            projects.slice(0, 4).map(p => <ProjectFocus key={p.name} project={p} />)
          }
        </SliderMain>

        <Title text="메이커들이 채워가는 건축의 엔딩크레딧">
          <div className={cx('sub-title-text')}>
            직접 수행한 프로젝트의 엔딩크레딧에 당신의 이름도 새겨보세요
          </div>
        </Title>

        <SectionItem title="New Puzzles" link='/more/project/r/recent'>
          <Slider groupSize={6} type="project">
            {
              projectsNew.map((p,i) => 
                <ProjectCard key={p.name} project={p} direction={i % 2 === 0? 'right' : 'left'} population={4}/>
              )
            }          
          </Slider>
        </SectionItem>

        <SectionItem title="Hot Puzzles" link='/more/project/p/popular'>
          <Slider groupSize={6} type="project" >
            {projects.slice(4).map((p,i) => <ProjectCard key={p.name} project={p} direction={i % 2 === 0? 'right' : 'left'} population={6} />)}
          </Slider>
        </SectionItem>

        <Title text="분야별 메이커들의 포트폴리오">
          <div className={cx('sub-title-text')}>
            제일 효과적인 영업무기는 ‘프로젝트 수행실적’<br/>
            포트폴리오를 공유해 새로운 기회를 잡아보세요
          </div>
        </Title>

        <SectionItem title="New" link='/more/portfolio/company/recent'>
           <Slider groupSize={8} >
            {recentCompanyPortfolios}
          </Slider>
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