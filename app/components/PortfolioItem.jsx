import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-item';
import { portfoiloEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const PortfolioItem = ({ portfolio, owner, referrer, portfoiloEditorStart }) => {

  if(portfolio) {
    const ownerId = portfolio.user? portfolio.user.userid : 'unknown';
    return (
      <div className={cx('main-section')}>
        <Link to={referrer.createPortfolioLink(portfolio)}>
          <div className={cx('text', 'text-section')}>
            <h1>
              {portfolio.location}
            </h1>
            <p>
              {portfolio.title}
            </p>
          </div>
          <Image src={portfolio.images[0]} x={214} y={214}/>
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
            +
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
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {portfoiloEditorStart})(PortfolioItem);
