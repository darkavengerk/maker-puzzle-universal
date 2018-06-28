import React from 'react';
import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import PortfolioItem from '../components/PortfolioItem';
import PortfolioItemExternal from '../components/PortfolioItemExternal';
import PortfolioDetail from '../components/PortfolioDetail';

import ProjectInfo from '../components/ProjectInfo';
import { Maker, Project, Company } from '../utils/objects'

import styles from '../css/components/contents-section';

class ContentsTagFactory {

  constructor(contentsType, param) {
    this.set = {
      maker: {
        info: MakerInfo,
        item: PortfolioItem,
        getDetail: function(owner, isOwnPage) {
          if(owner.portfolioSelected)
            return <PortfolioDetail 
              portfolio={owner.portfolioSelected.portfolio} 
              edit={isOwnPage}
              referer={new Project(owner.portfolioSelected.portfolio.project)}
            />
          return null;
        }
      }, 
      project: {
        info: ProjectInfo,
        item: PortfolioItemExternal,
        getDetail: function(owner) {
          return null;
        }
      },
      project_maker: {
        info: ProjectInfo,
        item: PortfolioItemExternal,
        getDetail: function(owner) {
          const { pid } = param;
          for(let portfolio of owner.portfolios) {
            if(portfolio.pid === pid)
              return <PortfolioDetail portfolio={portfolio} referer={new Maker(portfolio.user)} />
          }
          return <PortfolioDetail portfolio={{}} />
        }
      }
    }
    [contentsType];
    this.param = param;
  }

  getInfoTag() {
    return this.getTag('info');
  }

  getItemTag() {
    return this.getTag('item');
  }

  getDetailTag() {
    return this.getTag('detail');
  }

  getTag(name) {
    return this.set[name];
  }

  getContent(owner, isOwnPage) {
    const Info = this.getInfoTag();
    const Item = this.getItemTag();
    
    if(this.param.pid) {
      return this.set.getDetail(owner, isOwnPage);
    }

    let contents = owner.portfolios? owner.portfolios.map(portfolio => {
      return (<Item portfolio={portfolio} key={portfolio.title} />);
    }) : [];

    if(isOwnPage) {
      contents.push(<Item key={'__new__'} />);
    }

    return contents;
  }
}

export default ContentsTagFactory;