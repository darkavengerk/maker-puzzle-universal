import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FlexibleImage from '../components/FlexibleImage';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../css/components/main-page';

const cx = classNames.bind(styles);

const ContentsSection = ({owner, ...props}) => {

  return (
    <div className={cx('main-section')}>
      <FlexibleImage src="/images/site/main-1.jpeg" x={"100%"} y={426} >
      Test Main
      </FlexibleImage>
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

export default connect(mapStateToProps, {})(ContentsSection);