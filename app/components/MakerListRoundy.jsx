import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Roundy from '../components/Roundy';

import styles from '../css/components/images';

const cx = classNames.bind(styles);

const MakerListRoundy = ({ makers=[] }) => {

  const users = makers.map(user => <Roundy className={cx('maker-roundy')} user={user} key={user.userid} ></Roundy>);

  return <div className={cx('main-section')}>
            {users}
          </div>;
};

MakerListRoundy.propTypes = {
};

export default MakerListRoundy;
