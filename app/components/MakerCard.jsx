import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import FlexibleImage from '../components/FlexibleImageLazy';
import Padding from '../components/Padding';

// import { portfoiloEditorCancel, portfoiloSubmit } from '../actions/makers';
// import { companyPortfoiloEditorCancel, companyPortfoiloSubmit } from '../actions/companies';
import styles from '../css/components/business-card';

const cx = classNames.bind(styles);

const MakerCardSection = ({picture, title, subTitle, linkTo, screen, isCompany=false, autoMargin=false, ...props}) => {  
  if(screen.showing === 'loading') return <Link className={cx(['maker-tile', autoMargin? 'maker-tile-margin':null])}></Link>
  return (
    <Link className={cx(['maker-tile', autoMargin? 'maker-tile-margin':null])} to={linkTo} role="button" count={isCompany? 'company' : 'maker'}>
      {isCompany? 
        <div className={cx('maker-tile-image-boundary')}>
          <FlexibleImage className={cx('maker-tile-image')} x={180} y={180} source={picture} contain={true} version="medium" />
        </div> : 
      <FlexibleImage className={cx('maker-tile-image')} x={213} y={213} source={picture} contain={false} version="medium" />}
      
      <div className={cx('header')}>
        <Padding height="18" />
        <div className={cx('title')}>
          {title}
        </div>
        <Padding height="6" />
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
  return {
    screen: state.screen
  };
}

export default connect(mapStateToProps, {})(MakerCardSection);