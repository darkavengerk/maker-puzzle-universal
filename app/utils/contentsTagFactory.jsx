import React from 'react';
import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import CompanyInfo from '../components/CompanyInfo';
import PortfolioItem from '../components/PortfolioItem';
import PortfolioItemExternal from '../components/PortfolioItemExternal';
import PortfolioDetail from '../components/PortfolioDetail';
import NULL from '../components/null';

import ProjectInfo from '../components/ProjectInfo';
import { Maker, Project, Company } from '../utils/objects'

import styles from '../css/components/contents-section';

class ContentsTagFactory {

  constructor(source) {
    this.source = source
    this.set = this.getSetups(source.type);
  }

  getSetups(contentsType) {
    switch(contentsType) {
      case 'maker':
        return  {
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
        };
      case 'project':
        return {
          info: ProjectInfo,
          item: PortfolioItemExternal,
          getDetail: function(owner, pid) {
            for(let portfolio of owner.portfolios) {
              if(portfolio.pid === pid)
                return <PortfolioDetail portfolio={portfolio} referer={new Maker(portfolio.user)} />
            }
            return <PortfolioDetail portfolio={{images:[], tags:[]}} />
          }
        };
      case 'company':
        return {
          info: CompanyInfo,
          item: PortfolioItem,
          getDetail: function(owner) {
            return null;
          }
        };
      default:
        return {
          info: NULL,
          item: NULL,
          getDetail: function(owner) {
            return NULL;
          }
      }
    }
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

  getContent(param, isOwnPage) {
    
    const Item = this.getItemTag();
    
    if(param.pid) {
      return this.set.getDetail(this.source, param.pid);
    }

    let contents = this.source.portfolios? this.source.portfolios.map(portfolio => {
      return (<Item portfolio={portfolio} key={portfolio.title} />);
    }) : [];

    if(isOwnPage) {
      contents.push(<Item key={'__new__'} />);
    }

    return contents;
  }
}

export default ContentsTagFactory;