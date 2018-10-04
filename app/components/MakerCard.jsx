import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import FlexibleImage from '../components/FlexibleImage';
import Padding from '../components/Padding';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../css/components/business-card';

const cx = classNames.bind(styles);

const MakerCardSection = ({picture, title, subTitle, linkTo, isCompany=false, autoMargin=false, ...props}) => {  
  return (
    <Link className={cx(['maker-tile', autoMargin? 'maker-tile-margin':null])} to={linkTo} role="button" count={isCompany? 'company' : 'maker'}>
      {isCompany? 
        <div className={cx('maker-tile-image-boundary')}>
          <FlexibleImage className={cx('maker-tile-image')} x={180} y={180} src={picture} contain={true} version="medium" />
        </div> : 
      <FlexibleImage className={cx('maker-tile-image')} x={213} y={213} src={picture} contain={false} version="medium" />}
      
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

MakerCardSection.propTypes = {
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(MakerCardSection);