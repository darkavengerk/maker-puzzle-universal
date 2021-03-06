import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import Image from '../components/FlexibleImageLazy';
import Window from '../components/PortfolioImagesWindow';
import styles from '../css/components/portfolio-item';
import { portfoiloEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const PortfolioItemWideSection = ({ portfolio, owner, referrer, portfoiloEditorStart, company, external, screen, imageFit=false }) => {

  if(screen.showing === 'loading') return <div className={cx('main-section', 'wide')}></div>
  if(portfolio) {
    const link_name = company.link_name;
    const data = owner.getDataFromPortfolio(portfolio);
    return (
      <div className={cx('main-section', 'wide') + ' dragItem'}>
        <Link to={referrer.createPortfolioLink(portfolio)} count="portfolio">
          <div className={cx('text', 'text-section-wide', external? 'type2' : null)}>
            {external? <Image source={owner.getProfileImage(data)} contain={imageFit} x={50} y={39} className={cx('company-image')} /> : null }
            <span>
              <h1>
                {referrer.createPortfolioTitle(portfolio)}
              </h1>
              <p>
                {referrer.createPortfolioSubtitle(portfolio)}
              </p>
            </span>
          </div>
          <Window images={portfolio.images} />
        </Link>        
      </div>
    );
  }
  else 
    return (
      <div className={cx('main-section', 'wide')}>
        <div className={cx('add-portfolio')}>
          <div className={cx('add-portfolio-title')}>
            포트폴리오 추가하기
          </div>
          <div className={cx('add-portfolio-icon')} role="button" onClick={portfoiloEditorStart}>
            <Image source={"/site/images/add-button-1.png"} x={73} y={73} />
          </div>
        </div>
      </div>
    );
};

PortfolioItemWideSection.propTypes = {
  portfolio: PropTypes.object,
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company,
    screen: state.screen
  };
}

export default connect(mapStateToProps, {portfoiloEditorStart})(PortfolioItemWideSection);
