import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import FlexibleImage from '../components/FlexibleImage';
import Padding from '../components/Padding';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../css/components/business-card';

const cx = classNames.bind(styles);

const ContentsSection = ({picture, title, subTitle, linkTo, ...props}) => {  
  return (
    <Link className={cx('maker-tile')} to={linkTo} role="button">
      <FlexibleImage className={cx('maker-tile-image')} x={213} y={213} src={picture} >
      </FlexibleImage>
      <div className={cx('header')}>
        <Padding height="1.8rem" />
        <div className={cx('title')}>
          {title}
        </div>
        <Padding height="0.6rem" />
        <div className={cx('sub-title')}>
          {subTitle}
        </div>
      </div>
    </Link>

  );
};

ContentsSection.propTypes = {
  maker: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(ContentsSection);