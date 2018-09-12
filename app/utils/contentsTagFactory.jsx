import React from 'react';
import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import CompanyInfo from '../components/CompanyInfo';
import PortfolioItem from '../components/PortfolioItem';
import ProductItem from '../components/ProductItem';
import PortfolioItemWide from '../components/PortfolioItemWide';
import PortfolioDetail from '../components/PortfolioDetail';
import Padding from '../components/Padding';
import NULL from '../components/null';

import ProjectInfo from '../components/ProjectInfo';
import AddPortfolio from '../components/AddPortfolio';
import AddProduct from '../components/AddProduct';
import Popup from '../components/Popup';

import { Maker, Project, Company, create as createObject } from '../utils/objects'

import styles from '../css/components/contents-section';
const cx = classNames.bind(styles);

class ContentsTagFactory {

  constructor(source, type) {
    // source = source || {};
    // this.getSetups(source.getType());
  }

  getSet(contentsType) {
    switch(contentsType) {
      case 'maker':
        return  {
          info: MakerInfo,
          item: PortfolioItem,
        };
      case 'project':
        return {
          info: ProjectInfo,
          item: PortfolioItem,
        };
      case 'company':
        return {
          info: CompanyInfo,
          item: PortfolioItemWide,
        };
      default:
        return {
          info: NULL,
          item: NULL,
      }
    }
  }

  getInfoTag(source) {
    return this.getTag(source, 'info');
  }

  getItemTag(source) {
    return this.getTag(source, 'item');
  }

  getTag(source, name) {
    return this.getSet(source.getType())[name];
  }

  getMakerContent({user, source, param, isOwnPage, portfoiloSubmit, portfoiloEditorCancel}) {
    if(param && param.pid) {
      return this.getMakerDetail(source, param, isOwnPage);
    }

    const Item = this.getItemTag(source);

    let contents = source.portfolios? source.portfolios.map(portfolio => {
      const owner = createObject('maker', portfolio.user);
      return (<Item portfolio={portfolio} owner={owner} referrer={source} key={portfolio.pid} external={false} />);
    }) : [];

    if(isOwnPage) {
      contents.push(<Item key={'__new__'} />);
      if(contents.length >=12) {
        contents = [<Item key={'__new__front_'} />, ...contents];
      }
    }

    return (<div>
              <p className={cx('main-panel-title')}>포트폴리오</p>
              <div className={cx('portfolio-list')}>
                {contents}
              </div>
              <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
                <AddPortfolio 
                  title="포트폴리오 추가하기" 
                  submit={portfoiloSubmit} 
                  cancel={portfoiloEditorCancel} 
                />
              </Popup>
            </div>);
  }

  getProjectContent({user, source, param, isOwnPage, portfoiloSubmit, portfoiloEditorCancel}) {
    if(source.name && param && param.pid) {
      return this.getProjectDetail(source, param)
    }

    const portfolios = source.portfolios || [];
    const companyPortfolios = portfolios.filter(portfolio => portfolio.type === 'company');
    const makerPortfolios = portfolios.filter(portfolio => portfolio.type !== 'company');

    let companyContents = companyPortfolios.map(portfolio => {
      const owner = createObject('company', portfolio.company);
      const Item = this.getItemTag(owner);
      return (<Item portfolio={portfolio} referrer={source} owner={owner} key={portfolio.pid} external={true} />);
    });

    let makerContents = makerPortfolios.map(portfolio => {
      const owner = createObject('maker', portfolio.user);
      const Item = this.getItemTag(owner);
      return (<Item portfolio={portfolio} referrer={source} owner={owner} key={portfolio.pid} external={true} />);
    });

    // if(isOwnPage) {
    //   companyContents.push(<Item key={'__new__'} />);
    // }

    return (<div>
              <p className={cx('main-panel-title')}>포트폴리오</p>
              <div className={cx('portfolio-list')}>
                {companyContents}
                {makerContents}
              </div>
              <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
                <AddPortfolio 
                  title="포트폴리오 추가하기" 
                  submit={portfoiloSubmit} 
                  cancel={portfoiloEditorCancel} 
                />
              </Popup>
            </div>);
  }

  getCompanyContent({user, source, param, isOwnPage, companyPortfoiloSubmit, companyPortfoiloEditorCancel}) {

    if(param.pid) {
      return this.getCompanyDetail(source, param, isOwnPage);
    }

    let companyPortfolios = source.companyPortfolios? source.companyPortfolios.map(portfolio => {
      const owner = createObject('project', portfolio.project);
      return (<PortfolioItemWide portfolio={portfolio} referrer={source} owner={owner} key={portfolio.pid} external={false} />);
    }) : [];

    if(isOwnPage) {
      companyPortfolios.push(<PortfolioItemWide key={'__new__'} />);
      if(companyPortfolios.length >=6) {
        companyPortfolios = [<PortfolioItemWide key={'__new__front__'} />, ...companyPortfolios];
      }
    }

    let products = source.products? source.products.map(product => {
      return (<ProductItem product={product} key={product.pid} />);
    }) : [];

    if(isOwnPage) {
      products.push(<ProductItem key={'__new__'} />);
      if(products.length >=15) {
        products = [<ProductItem key={'__new__front__'} />, ...products];
      }
    }

    let portfolios = source.portfolios? source.portfolios.map(portfolio => {
      const maker = createObject('maker', portfolio.user);
      return (<PortfolioItem portfolio={portfolio} referrer={source} owner={maker} key={portfolio.pid} external={true} />);
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
              
              <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
                <AddPortfolio 
                  title="포트폴리오 추가하기" 
                  submit={companyPortfoiloSubmit} 
                  cancel={companyPortfoiloEditorCancel}
                  type={'company'}
                />
              </Popup>
              <Popup show={user.attempt === 'edit:product'} name="AddProductPopup" roll={true} top={100}>
                <AddProduct title="보유 제품 추가하기" company={source} />
              </Popup>
            </div>);
  }

  getMakerDetail(source, param, isOwnPage) {
    let portfolios = source.portfolios;
    let portfolioFound = portfolios.filter(p => p.pid === param.pid);
    if(portfolioFound.length > 0) {
      portfolioFound = portfolioFound[0];
      return (
          <div>
            <p className={cx('main-panel-title')}>포트폴리오</p>
            <PortfolioDetail 
              portfolio={portfolioFound} 
              edit={isOwnPage}
              owner={new Project(portfolioFound.project)}
            />
          </div>)
    }
    else return null;
  }

  getProjectDetail(source, param) {
    let portfolios = source.portfolios;
    let portfolioFound = null;

    for(let portfolio of portfolios) {
      if(portfolio.pid === param.pid) {
        portfolioFound = portfolio;
        break;
      }
    }
    if(portfolioFound) {
      let owner = null;
      if(param.mid) {
        owner = new Maker(portfolioFound.user);
      }
      else {
        owner = new Company(portfolioFound.company);
      }
      return (
        <div>
          <p className={cx('main-panel-title')}>포트폴리오</p>
          <PortfolioDetail portfolio={portfolioFound} owner={owner} />
        </div>
      )
    }
    return null;
  }

  getCompanyDetail(source, param, isOwnPage) {
    let portfolios = param.mid? source.portfolios : source.companyPortfolios;
    let portfolioFound = null;

    for(let portfolio of portfolios) {
      if(portfolio.pid === param.pid) {
        portfolioFound = portfolio;
        break;
      }
    }
    if(portfolioFound) {
      let owner = [new Project(portfolioFound.project)];
      if(param.mid) {
        owner.push(new Maker(portfolioFound.user));
      }
      return (
        <div>
          <p className={cx('main-panel-title')}>포트폴리오</p>
          <PortfolioDetail portfolio={portfolioFound} owner={owner} edit={isOwnPage} />
        </div>
      )
    }
    return null;
  }

}

const factory = new ContentsTagFactory();

export default factory;