import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CompanyProfile from '../components/CompanyProfile';
import CompanyHistory from '../components/CompanyHistory';
import GreyTitle from '../components/GreyTitle';
import Abilities from '../components/Abilities';
import MakerListRoundy from '../components/MakerListRoundy';

import styles from '../css/components/company-info';

const cx = classNames.bind(styles);

const CompanyInfo = ({ owner }) => {

  const company = owner;

  const users = <MakerListRoundy makers={company.users} />;

  return <div className={cx('main-section')}>
          <GreyTitle title={'기업 정보'} bottom="13" />
          {company && company.name ? <CompanyProfile /> : <div></div>}          

          <GreyTitle title={'소속 메이커'} top="38" bottom="26" />
          <div className={cx('maker-area')}>
            {users}
          </div>

        </div>;
};

CompanyInfo.propTypes = {
  owner: PropTypes.object.isRequired
};

export default CompanyInfo;
