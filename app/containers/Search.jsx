import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroller';

import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import ProjectCard from '../components/ProjectCard';
import PortfolioItem from '../components/common/PortfolioItem';

import { loadSearchData } from '../actions/main';
import Assist from '../utils/assist';

import styles from '../css/components/search';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
    this.state = {loading: true, hasMore: true};
    this.loadFunc = this.loadFunc.bind(this);
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  loadFunc(page) {
    const { search, param, loadSearchData } = this.props;
    const { portfolios } = search.result || { portfolios:[] };

    if(!this.state.loading && !search.loading && portfolios.length < search.result.total) {
      this.setState({loading: true});
      loadSearchData(
        {keyword: param.keyword, current: portfolios.length}, 
        res => this.setState({loading: false})
      );
    }
  }

  render() {
    const { user, search, param, loadSearchData } = this.props;
    const { portfolios } = search.result || { portfolios:[] };

    let portfolioTags = portfolios.map(portfolio => {
      if(portfolio.type === 'company') {
        return (<PortfolioItem portfolio={portfolio} referrer={Assist.Company} owner={Assist.Company} key={portfolio.pid} imageFit={true} external={true} />);
      }
      else {
        return <PortfolioItem portfolio={portfolio} referrer={Assist.Main} owner={Assist.Maker} key={portfolio.pid} external={true} />
      }
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
              ({search.result.total}개의 검색결과가 있습니다)
            </div>
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={ search.hasMore }
            useWindow={true}
          >
            <div className={cx('project-tiles')}>
              {portfolioTags}
            </div>
          </InfiniteScroll>
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

export default connect(mapStateToProps, { loadSearchData })(Container);
