import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import AddPortfolio from '../components/AddPortfolio';
import Popup from '../components/Popup';
import { portfoiloEditorCancel } from '../actions/makers';
import styles from '../css/components/contents-section';

import createRestApiClient from '../utils/createRestApiClient';
import ContentsTagFactory from '../utils/contentsTagFactory';

const cx = classNames.bind(styles);

const ContentsSection = ({ owner, isOwnPage, contentsType, portfoiloEditorCancel }) => {

  const factory = new ContentsTagFactory(contentsType);

  const Info = factory.getInfoTag();
  const Item = factory.getItemTag();
  const Detail = factory.getDetailTag();

  let portfolios = owner.portfolios? owner.portfolios.map(portfolio => {
    return (<Item portfolio={portfolio} key={portfolio.title} />);
  }) : [];

  if(isOwnPage) {
    portfolios.push(<Item key={'__new__'} />);
  }

  if(owner.portfolioSelected) {
    portfolios = (<Detail portfolio={owner.portfolioSelected.portfolio} edit={isOwnPage} />);
  }

  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        <Info owner={owner} />
      </span>
      <span className={cx('main-panel')} >
        <p className={cx('main-panel-title')}>포트폴리오</p>
        <div className={cx('portfolio-list')}>
          {portfolios}
        </div>
        <Popup show={owner.isAddingPortfolio} name="AddPortfolioPopup">
          <AddPortfolio title="포트폴리오 수정하기" />
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