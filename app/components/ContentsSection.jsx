import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Account from '../containers/Account';

import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';

import styles from '../css/components/contents-section';

const cx = classNames.bind(styles);

const ContentsSection = ({provider, data, attempt, ...props}) => {
  const mainContents = attempt === 'edit:account'? <Account /> : provider.getContent(data, props);
  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        {provider.getInfo(data, props)}
      </span>
      <span className={cx('main-panel')} >
        { mainContents }
      </span>
    </div>
  );
};

ContentsSection.propTypes = {
  provider: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    attempt: state.user.attempt,
    param: state.param
  };
}

export default connect(mapStateToProps, { portfoiloEditorCancel, portfoiloSubmit, 
                                          companyPortfoiloEditorCancel, companyPortfoiloSubmit })(ContentsSection);