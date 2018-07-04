import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MakerProfile from '../components/MakerProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import styles from '../css/components/maker-info';

const cx = classNames.bind(styles);

const CompanyInfo = ({ owner }) => {

  const company = owner;

  return company && company.companyProfile ? (
    <div className={cx('main-section')}>
      <GreyTitle title={'기업 정보'} bottom="13" />
      <MakerProfile maker={company} />

      <GreyTitle title={'소속 메이커'} top="38" />
      {/*<CompanyHistory company={company} />*/}

    </div>
  ) : <div></div>;
};

CompanyInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

export default CompanyInfo;
