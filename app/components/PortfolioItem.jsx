import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Image from '../components/FlexibleImageLazy';
import Link from '../components/Link';
import IconPortfolioLocked from '../components/IconPortfolioLocked';
import styles from '../css/components/portfolio-item';
import { portfoiloEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const PortfolioItem = ({ portfolio, owner, referrer, portfoiloEditorStart, external, screen }) => {

  if(screen.showing === 'loading') return <div className={cx('main-section')}></div>
    
  if(portfolio) {
    const data = owner.getDataFromPortfolio(portfolio);
    return (
      <div className={cx('main-section') + ' dragItem'}>
        <Link to={referrer.createPortfolioLink(portfolio)} count="portfolio">
          <div className={cx('text', 'text-section', external? 'type2' : '')}>
            { external? <Image source={owner.getProfileImage(data)} x={31} y={31} className={cx('profile-image')} /> : null }
            <div>
              <h1>
                {referrer.createPortfolioTitle(portfolio)}
              </h1>
              <p>
                {referrer.createPortfolioSubtitle(portfolio)}
              </p>
                { portfolio.isPrivate? 
                  <IconPortfolioLocked className={cx('locked')} /> : null
                }
            </div>
          </div>
          <Image source={portfolio.images[0]} x={214} y={214} version="medium" />
        </Link>        
      </div>
    );
  }
  else 
    return (
      <div className={cx('main-section')}>
        <div className={cx('add-portfolio')}>
          <div className={cx('add-portfolio-title')}>
            내 포트폴리오
          </div>
          <div className={cx('add-portfolio-title')}>
            추가하기        
          </div>
          <div className={cx('add-portfolio-icon')} role="button" onClick={portfoiloEditorStart}>
            <Image source={"/site/images/add-button-1.png"} x={73} y={73} />
          </div>
        </div>
      </div>
    );
};

PortfolioItem.propTypes = {
  portfolio: PropTypes.object,
  maker: PropTypes.object
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    screen: state.screen
  };
}

export default connect(mapStateToProps, {portfoiloEditorStart})(PortfolioItem);
