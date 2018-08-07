import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../css/components/contents-section';

import createRestApiClient from '../utils/createRestApiClient';
import ContentsTagFactory from '../utils/contentsTagFactory';
import { createObject } from '../utils/objects';

const cx = classNames.bind(styles);

const ContentsSection = ({owner, ...props}) => {

  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        {owner.getInfo(props)}
      </span>
      <span className={cx('main-panel')} >
        {owner.getContent(props)}
      </span>
    </div>
  );
};

ContentsSection.propTypes = {
  owner: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    param: state.param
  };
}

export default connect(mapStateToProps, { portfoiloEditorCancel, portfoiloSubmit, 
                                          companyPortfoiloEditorCancel, companyPortfoiloSubmit })(ContentsSection);