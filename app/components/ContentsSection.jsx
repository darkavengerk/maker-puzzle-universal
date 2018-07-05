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
import { createObject } from '../utils/objects';

const cx = classNames.bind(styles);

const ContentsSection = ({ owner, isOwnPage, param, contentsType, portfoiloEditorCancel }) => {

  const Info = owner.getInfoTag();
  const contents = owner.getContent(param, isOwnPage);

  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        <Info owner={owner} />
      </span>
      <span className={cx('main-panel')} >
        <p className={cx('main-panel-title')}>포트폴리오</p>
        <div className={cx('portfolio-list')}>
          {contents}
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

function mapStateToProps(state) {
  return {
    param: state.param
  };
}

export default connect(mapStateToProps, { portfoiloEditorCancel })(ContentsSection);