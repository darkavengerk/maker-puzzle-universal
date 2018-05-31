import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import MakerInfo from '../components/MakerInfo';
import PortfolioItem from '../components/PortfolioItem';
import PortfolioDetail from '../components/PortfolioDetail';
import AddPortfolio from '../components/AddPortfolio';
import Popup from '../components/Popup';
import { portfoiloEditorCancel } from '../actions/makers';
import styles from '../css/components/contents-section';

const cx = classNames.bind(styles);

const ContentsSection = ({ owner, isOwnPage, portfoiloEditorCancel }) => {

  let portfolios = owner.portfolios? owner.portfolios.map(portfolio => {
    return (<PortfolioItem portfolio={portfolio} key={portfolio.title} />);
  }) : [];

  if(isOwnPage) {
    portfolios.unshift(<PortfolioItem key={'__new__'} />);
  }

  if(owner.portfolioSelected) {
    portfolios = (<PortfolioDetail portfolio={owner.portfolioSelected.portfolio} edit={isOwnPage} />);
  }

  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        <MakerInfo maker={owner} />
      </span>
      <span className={cx('main-panel')} >
        <p className={cx('main-panel-title')}>포트폴리오</p>
        <div className={cx('portfolio-list')}>
          {portfolios}
        </div>
        <Popup show={owner.isAddingPortfolio} name="AddPortfolio">
          <AddPortfolio 
            title="포트폴리오 수정하기"
          />
        </Popup>
      </span>
    </div>
  );
};

ContentsSection.propTypes = {
  owner: PropTypes.object.isRequired,
  contentsType: PropTypes.string.isRequired
};

export default connect(null, {portfoiloEditorCancel})(ContentsSection);