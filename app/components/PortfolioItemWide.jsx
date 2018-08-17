import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import Window from '../components/PortfolioImagesWindow';
import styles from '../css/components/portfolio-item';
import { portfoiloEditorStart } from '../actions/makers';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, owner, referrer, portfoiloEditorStart, company }) => {

  if(portfolio) {
    const link_name = company.link_name;
    return (
      <div className={cx('main-section', 'wide')}>
        <Link to={referrer.createPortfolioLink(portfolio)}>
          <div className={cx('text', 'text-section-wide', 'middle')}>
            <h1>
              {portfolio.location}
            </h1>
            <p>
              {portfolio.title}
            </p>
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
            +
          </div>
        </div>
      </div>
    );
};

ContentsSection.propTypes = {
  portfolio: PropTypes.object,
  company: PropTypes.object
};

function mapStateToProps(state) {
  return {
    company: state.company.company
  };
}

export default connect(mapStateToProps, {portfoiloEditorStart})(ContentsSection);
