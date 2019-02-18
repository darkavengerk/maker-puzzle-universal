import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroller';

import PortfolioItemWide from '../components/PortfolioItemWide';
import PortfolioItem from '../components/PortfolioItem';
import TopTitle from '../components/TopTitle';
import SingleLine from '../components/SingleLine';
import ProjectCard from '../components/ProjectCardMedium';
import MakerCard from '../components/MakerCard';
import Assist from '../utils/assist'

import { loadMoreData } from '../actions/main';

import styles from '../css/components/search';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
    this.state = {loading: true, loaded: -1};
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
    const { more, param, loadMoreData } = this.props;

    const { topic, subtype } = more;

    const data = (more[topic] || {})[subtype] || [];
    let tags = [];

    if(topic === 'project') {
      tags = data.map(p => <ProjectCard key={p.name} project={p} />)
    }

    if(topic === 'portfolio' || topic === 'category') {
      tags = data.map(portfolio => {
        if(subtype.startsWith('company') || topic === 'category') {
          return (<PortfolioItemWide portfolio={portfolio} referrer={Assist.Company} owner={Assist.Company} key={portfolio.pid} imageFit={true} external={true} />);
        }
        if(subtype.startsWith('maker')) {
          return <PortfolioItem portfolio={portfolio} referrer={Assist.Main} owner={Assist.Maker} key={portfolio.pid} external={true} />
        }
      });
    }

    if(topic === 'company') {
      tags = data.map(company => {
        let business = company.features.filter(f => f.repr === 'business');
        business = business[0]? business[0] : null;
        const businessName = business && business.content? business.content : '';
        return <MakerCard
                key={company.name}
                picture={Assist.Company.getProfileImage(company)}
                title={company.name}
                subTitle={businessName}
                isCompany={true}
                autoMargin={true}
                linkTo={'/company/' + company.link_name} />;
      });
    }

    if(topic === 'maker') {
      tags = data.map(maker => {
        let occupation = maker.features.filter(f => f.repr === 'occupation');
        occupation = occupation[0]? occupation[0] : null;
        const occupationName = occupation && occupation.content? occupation.content : '';
        return <MakerCard 
                  key={maker.userid} 
                  picture={Assist.Maker.getProfileImage(maker)}
                  title={maker.name} 
                  subTitle={occupationName} 
                  autoMargin={true}
                  linkTo={'/maker/' + maker.userid} />;
      });
    }

    const loadFunc = (page) => {
      if(!more.loading && param.topic && this.state.loaded < data.length) {
        this.setState({loaded: data.length});
        loadMoreData({...param, current: data.length});
      }
    }

    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={more.title}
          to={`/more/${param.topic}/${param.subtype}/${param.sort}`}
          thumbnailURL={null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={ data && data.length > 0 && more.hasMore}
            useWindow={true}
        >
          <div className={cx('projects-section')}>
            <div className={cx('project-tiles')}>
                {tags}
            </div>
          </div>
        </InfiniteScroll>
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
    more: state.more,
    param: state.param
  };
}

export default connect(mapStateToProps, { loadMoreData })(Container);
