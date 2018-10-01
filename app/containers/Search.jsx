import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import ProjectCard from '../components/ProjectCard';
import PortfolioItemWide from '../components/PortfolioItemWide';
import PortfolioItem from '../components/PortfolioItem';

import { create as createObject } from '../utils/objects'

import styles from '../css/components/search';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const { user, search, param } = this.props;
    const { portfolios } = search.result || { portfolios:[] };
    
    const companyPortfolios = portfolios.filter(p => p.type === 'company');
    const makerPortfolios = portfolios.filter(p => p.type === 'maker');

    const companyPortfolioTags = companyPortfolios.map(portfolio => {
      const owner = createObject('company', portfolio.company);
      return <PortfolioItemWide portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} imageFit={true} external={true} />
    });

    const referrer = createObject('main');
    let makerPortfolioTags = makerPortfolios.map(portfolio => {
        const owner = createObject('maker', portfolio.user);
        return (<PortfolioItem portfolio={portfolio} referrer={referrer} owner={owner} key={portfolio.pid} external={true} />);
      });

    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={ param && param.keyword? param.keyword + ' 검색 결과' : ''}
          to={'/'}
          thumbnailURL={null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        {/*<div className={cx('projects-section')}>
          <div className={cx('title')}>
            프로젝트 
            <div className={cx('small-title')}>
              ({projects.length}개의 검색결과가 있습니다)
            </div>
          </div>
          <div className={cx('project-tiles')}>
            {projects.map(p => <ProjectCard key={p.name} project={p} />)}
          </div>
        </div>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />*/}
        <div className={cx('projects-section')}>
          <div className={cx('title')}>
            포트폴리오 
            <div className={cx('small-title')}>
              ({companyPortfolioTags.length + makerPortfolioTags.length}개의 검색결과가 있습니다)
            </div>
          </div>
          <div className={cx('project-tiles')}>
            {companyPortfolioTags} {makerPortfolioTags}
          </div>
        </div>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      </div>
    );
  }
}

Container.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user,
    search: state.search,
    param: state.param
  };
}

export default connect(mapStateToProps, {})(Container);
