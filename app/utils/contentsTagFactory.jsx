import React from 'react';
import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import CompanyInfo from '../components/CompanyInfo';
import PortfolioItem from '../components/PortfolioItem';
import PortfolioItemExternal from '../components/PortfolioItemExternal';
import PortfolioDetail from '../components/PortfolioDetail';
import NULL from '../components/null';

import ProjectInfo from '../components/ProjectInfo';
import AddPortfolio from '../components/AddPortfolio';
import Popup from '../components/Popup';

import { Maker, Project, Company } from '../utils/objects'

import styles from '../css/components/contents-section';
const cx = classNames.bind(styles);

class ContentsTagFactory {

  constructor(source) {
    this.source = source || {};
    this.set = this.getSetups(source.type);
  }

  getSetups(contentsType) {
    switch(contentsType) {
      case 'maker':
        return  {
          info: MakerInfo,
          item: PortfolioItem,
          
        };
      case 'project':
        return {
          info: ProjectInfo,
          item: PortfolioItemExternal,
          
        };
      case 'company':
        return {
          info: CompanyInfo,
          item: PortfolioItem,
          
        };
      default:
        return {
          info: NULL,
          item: NULL,
      }
    }
  }

  getInfoTag() {
    return this.getTag('info');
  }

  getItemTag() {
    return this.getTag('item');
  }

  getTag(name) {
    return this.set[name];
  }

  getMakerContent(param, isOwnPage) {
    
    if(param.pid) {
      return this.getMakerDetail(this.source, param.pid);
    }

    const Item = this.getItemTag();

    let contents = this.source.portfolios? this.source.portfolios.map(portfolio => {
      return (<Item portfolio={portfolio} key={portfolio.title} />);
    }) : [];

    if(isOwnPage) {
      contents.push(<Item key={'__new__'} />);
    }

    return (<div>
              <p className={cx('main-panel-title')}>포트폴리오</p>
              <div className={cx('portfolio-list')}>
                {contents}
              </div>
              <Popup show={this.source.isAddingPortfolio} name="AddPortfolioPopup">
                <AddPortfolio title="포트폴리오 수정하기" />
              </Popup>
            </div>);
  }

  getProjectContent(param, isOwnPage) {
    if(param.pid) {
      return this.getProjectDetail(param.pid) || this.getProjectContent({}, isOwnPage);
    }
    return this.getMakerContent(param, isOwnPage);
  }

  getCompanyContent(param, isOwnPage) {
    
    if(param.pid) {
      return this.set.getCompanyDetail(this.source, param.pid);
    }

    const Item = this.getItemTag();

    let contents = this.source.portfolios? this.source.portfolios.map(portfolio => {
      return (<Item portfolio={portfolio} key={portfolio.title} />);
    }) : [];

    if(isOwnPage) {
      contents.push(<Item key={'__new__'} />);
    }

    return (<div>
              <p className={cx('main-panel-title')}>수행 프로젝트</p>
              <div className={cx('portfolio-list')}>
                {contents}
              </div>
              <Popup show={this.source.isAddingPortfolio} name="AddPortfolioPopup">
                <AddPortfolio title="포트폴리오 수정하기" />
              </Popup>
              <p className={cx('main-panel-title')}>제품 목록</p>
              <div className={cx('portfolio-list')}>
                {contents}
              </div>
              <Popup show={this.source.isAddingPortfolio} name="AddPortfolioPopup">
                <AddPortfolio title="포트폴리오 수정하기" />
              </Popup>
            </div>);
  }

  getMakerDetail(isOwnPage) {
    if(this.source.portfolioSelected)
      return <PortfolioDetail 
        portfolio={this.source.portfolioSelected.portfolio} 
        edit={isOwnPage}
        referer={new Project(this.source.portfolioSelected.portfolio.project)}
      />
    return null;
  }

  getProjectDetail(pid) {
    if(!this.source.portfolios) return null;

    for(let portfolio of this.source.portfolios) {
      if(portfolio.pid === pid)
        return <PortfolioDetail portfolio={portfolio} referer={new Maker(portfolio.user)} />
    }
    return null;
  }

  getCompanyDetail() {
    return null;
  }

}

export default ContentsTagFactory;