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
import MakerCard from '../components/MakerCard';
import PortfolioItem from '../components/PortfolioItem';
import Assist from '../utils/assist'

import { create as createObject } from '../utils/objects'

import styles from '../css/components/search';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const { more, param } = this.props;

    const topic = param.topic;

    const data = more[topic];
    let tags = [];

    if(topic === 'project') {
      tags = data.map(p => <ProjectCard key={p.name} project={p} />)
    }

    if(topic === 'portfolio') {
      const referrer = createObject('main');
      tags = data.map(portfolio => {
        if(param.subtype === 'company') {
          const owner = createObject('company', portfolio.company);
          return (<PortfolioItemWide portfolio={portfolio} referrer={owner} owner={owner} key={portfolio.pid} imageFit={true} external={true} />);
        }
        else {
          const owner = createObject('maker', portfolio.user);
          return <PortfolioItem portfolio={portfolio} referrer={referrer} owner={owner} key={portfolio.pid} external={true} />
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
                  picture={maker.picture}
                  title={maker.name} 
                  subTitle={occupationName} 
                  autoMargin={true}
                  linkTo={'/maker/' + maker.userid} />;
      });
    }

    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={more.title}
          to={'/'}
          thumbnailURL={null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <div className={cx('projects-section')}>
          <div className={cx('project-tiles')}>
            {tags}
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
    more: state.more,
    param: state.param
  };
}

export default connect(mapStateToProps, {})(Container);
