import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import FlexibleImage from '../components/FlexibleImage';
import Padding from '../components/Padding';
import Assist from '../utils/assist'

import styles from '../css/components/business-card';

const cx = classNames.bind(styles);

const CompanyCardSection = ({company, ...props}) => {
  if(!(company && company.name)) return null;

  return (
    <div className={cx('company-card-section')}>
      <FlexibleImage 
        className={cx('company-tile-image')} 
        x={60} y={60} 
        src={Assist.Company.getProfileImage(company)} 
        contain={true} 
        version="medium"
      />
      <Padding width="15px" />
      
      <div className={cx('text-section')}>
        <div className={cx('company-card-text-section')}>
          {Assist.Company.getName(company)}
        </div>
        <Link className={cx('company-card-button')} to={Assist.Company.getHomeLink(company)}>
          <label className={cx('company-card-button-text')} role="button">
            소유한 기업페이지로 가기
          </label>
        </Link>
      </div>
    </div>

  );
};

CompanyCardSection.propTypes = {
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(CompanyCardSection);