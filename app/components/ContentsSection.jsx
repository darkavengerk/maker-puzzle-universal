import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { portfoiloEditorCancel } from '../actions/makers';
import styles from '../css/components/contents-section';

import createRestApiClient from '../utils/createRestApiClient';
import ContentsTagFactory from '../utils/contentsTagFactory';
import { createObject } from '../utils/objects';

const cx = classNames.bind(styles);

const ContentsSection = ({ owner, isOwnPage, param, contentsType, portfoiloEditorCancel }) => {

  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        {owner.getInfo()}
      </span>
      <span className={cx('main-panel')} >
          {owner.getContent(param, isOwnPage)}
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