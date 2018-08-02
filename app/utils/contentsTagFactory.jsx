import React from 'react';
import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import CompanyInfo from '../components/CompanyInfo';
import PortfolioItem from '../components/PortfolioItem';
import ProductItem from '../components/ProductItem';
import PortfolioItemWide from '../components/PortfolioItemWide';
import PortfolioItemExternal from '../components/PortfolioItemExternal';
import PortfolioDetail from '../components/PortfolioDetail';
import Padding from '../components/Padding';
import NULL from '../components/null';

import ProjectInfo from '../components/ProjectInfo';
import AddPortfolio from '../components/AddPortfolio';
import AddProduct from '../components/AddProduct';
import Popup from '../components/Popup';

import { Maker, Project, Company } from '../utils/objects'

import styles from '../css/components/contents-section';
const cx = classNames.bind(styles);

class ContentsTagFactory {

  constructor(source, type) {
    this.source = source || {};
    this.getSetups(source.getType());
  }

  getSetups(contentsType) {
    switch(contentsType) {
      case 'maker':
        this.set =  {
          info: MakerInfo,
          item: PortfolioItem,
          
        };
        break;
      case 'project':
        this.set = {
          info: ProjectInfo,
          item: PortfolioItemExternal,
          
        };
        break;
      case 'company':
        this.set = {
          info: CompanyInfo,
          item: PortfolioItemWide,
        };
        break;
      default:
        this.set = {
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
      return (<Item portfolio={portfolio} key={portfolio.pid} />);
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

    let companyPortfolios = this.source.portfolios? this.source.companyPortfolios.map(portfolio => {
      return (<PortfolioItemWide portfolio={portfolio} key={portfolio.pid} />);
    }) : [];

    if(isOwnPage) {
      companyPortfolios.push(<PortfolioItemWide key={'__new__'} />);
    }

    let products = this.source.products? this.source.products.map(product => {
      return (<ProductItem product={product} key={product.pid} />);
    }) : [];

    if(isOwnPage) {
      products.push(<ProductItem key={'__new__'} />);
    }

    let portfolios = this.source.portfolios? this.source.portfolios.map(portfolio => {
      return (<PortfolioItem portfolio={portfolio} key={portfolio.pid} />);
    }) : [];

    return (<div>
              <p className={cx('main-panel-title')}>수행 프로젝트</p>
              <div className={cx('portfolio-list')}>
                {companyPortfolios}
              </div>

              <Padding height={'3.5rem'} />
              
              <p className={cx('main-panel-title')}>제품 목록</p>
              <div className={cx('portfolio-list')}>
                {products}
              </div>

              <Padding height={'3.5rem'} />
              
              <p className={cx('main-panel-title')}>메이커의 포트폴리오</p>
              <div className={cx('portfolio-list')}>
                {portfolios}
              </div>
              
              <Popup show={this.source.isAddingPortfolio} name="AddPortfolioPopup">
                <AddPortfolio title="포트폴리오 추가하기" />
              </Popup>
              <Popup show={this.source.isAddingProduct} name="AddProductPopup">
                <AddProduct title="보유 제품 추가하기" company={this.source} />
              </Popup>
            </div>);
  }

  getMakerDetail(isOwnPage) {
    if(this.source.portfolioSelected && this.source.portfolioSelected.portfolio)
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