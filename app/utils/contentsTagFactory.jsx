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

import Assist from '../utils/assist';
import ProjectInfo from '../components/ProjectInfo';
import AddPortfolio from '../components/AddPortfolio';
import AddProduct from '../components/AddProduct';
import Popup from '../components/Popup';

// import { Maker, Project, Company, create as createObject } from '../utils/objects'

import styles from '../css/components/contents-section';
const cx = classNames.bind(styles);

class ContentsTagFactory {

  constructor(source) {
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

  getInfoTag(contentsType) {
    return this.getTag('info', contentsType);
  }

  getItemTag(contentsType) {
    return this.getTag('item', contentsType);
  }

  getTag(name, contentsType) {
    return this.getSet(contentsType)[name];
  }

  getMakerContent({user, source, param, isOwnPage, portfoiloSubmit, portfoiloEditorCancel}) {
    if(param && param.pid) {
      return this.getMakerDetail(source, param, isOwnPage);
    }

    const Item = this.getItemTag('maker');

    let contents = Assist.Maker.getEligiblePortfolios(source, user.account);

    contents = contents.map(portfolio => {
      // const owner = createObject('maker', portfolio.user);
      return (<Item portfolio={portfolio} owner={Assist.Maker} referrer={Assist.Maker} key={portfolio.pid} external={false} />);
    });

    if(isOwnPage) {
      contents.unshift(<Item key={'__new__'} />);
    }

    return (<div>
              <p className={cx('main-panel-title')}>포트폴리오</p>
              <div className={cx('portfolio-list')} id="portfolio-list">
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
      return this.getProjectDetail(source, param, isOwnPage)
    }

    const portfolios = Assist.Maker.getEligiblePortfolios(source, user);

    const companyPortfolios = portfolios.filter(portfolio => portfolio.type === 'company');
    const makerPortfolios = portfolios.filter(portfolio => portfolio.type !== 'company');

    let companyContents = companyPortfolios.map(portfolio => {
      // portfolio.project = source;
      const Item = this.getItemTag('company');
      return (<Item portfolio={portfolio} referrer={Assist.Project} owner={Assist.Company} key={portfolio.pid} imageFit={true} external={true} />);
    });

    let makerContents = makerPortfolios.map(portfolio => {
      // portfolio.project = source;
      const Item = this.getItemTag('maker');
      return (<Item portfolio={portfolio} referrer={Assist.Project} owner={Assist.Maker} key={portfolio.pid} external={true} />);
    });

    if(user.authenticated) {
      makerContents.unshift(<PortfolioItem key={'__new__'} />);
    }

    return (<div>
              <p className={cx('main-panel-title')}>포트폴리오</p>
              <div className={cx('portfolio-list')} id="portfolio-list">
                {companyContents}
                {makerContents}
              </div>
              <Popup show={user.attempt === 'edit:portfolio'} name="AddPortfolioPopup" roll={true} top={100}>
                <AddPortfolio 
                  title="포트폴리오 추가하기" 
                  portfolio={{location: source.name}}
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
      // const owner = createObject('project', portfolio.project);
      // portfolio.company = source;
      return (<PortfolioItemWide portfolio={portfolio} referrer={Assist.Company} owner={Assist.Project} key={portfolio.pid} external={false} />);
    }) : [];

    if(isOwnPage) {
      companyPortfolios.unshift(<PortfolioItemWide key={'__new__'} />);
    }

    let products = source.products? source.products.map(product => {
      return (<ProductItem product={product} key={product.pid} />);
    }) : [];

    if(isOwnPage) {
      products.unshift(<ProductItem key={'__new__'} />);
    }

    let portfolios = Assist.Maker.getEligiblePortfolios(source, user);

    portfolios = portfolios.map(portfolio => {
      // const maker = createObject('maker', portfolio.user);
      // portfolio.company = source;
      return (<PortfolioItem portfolio={portfolio} referrer={Assist.Company} owner={Assist.Maker} key={portfolio.pid} external={true} />);
    });

    return (<div>
              <p className={cx('main-panel-title')}>수행 프로젝트</p>
              <div className={cx('portfolio-list')} id="portfolio-list">
                {companyPortfolios}
              </div>

{/*              <Padding height={'3.5rem'} />
              
              <p className={cx('main-panel-title')}>제품 목록</p>
              <div className={cx('portfolio-list')}>
                {products}
              </div>*/}

              <Padding height={'35'} />
              
              { portfolios.length > 0 && <p className={cx('main-panel-title')}>메이커의 포트폴리오</p>}
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
              type={'maker'}
              // owner={[new Project(portfolioFound.project), new Company(portfolioFound.company)]}
              owner={[Assist.Project, Assist.Company]}
            />
          </div>)
    }
    else return null;
  }

  getProjectDetail(source, param, isOwnPage) {
    let portfolios = source.portfolios;
    let portfolioFound = null;

    for(let portfolio of portfolios) {
      if(portfolio.pid === param.pid) {
        portfolioFound = portfolio;
        break;
      }
    }
    if(portfolioFound) {
      let owner = [Assist.Company];
      if(param.mid) {
        owner.push(Assist.Maker);
      }
      return (
        <div>
          <p className={cx('main-panel-title')}>포트폴리오</p>
          <PortfolioDetail 
            portfolio={portfolioFound} 
            edit={isOwnPage}
            type={'project'}
            owner={owner} />
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
      let owner = [Assist.Project];
      if(param.mid) {
        owner.push(Assist.Maker);
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