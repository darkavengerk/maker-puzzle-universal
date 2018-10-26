import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import Image from '../components/FlexibleImage';
import Padding from '../components/Padding';
import Assist from '../utils/assist';

import styles from '../css/common/images';

const cx = classNames.bind(styles);

const Roundy = ({ user, x=110, y=110, showName=true, ...props }) => {
  return (
    <span className={cx('maker-round')} key={user.userid} {...props} style={{width:x, height:y}}>
      <Link to={'/maker/'  + user.userid} count="maker">
        <Image className={cx('maker-round-image')} src={Assist.Maker.getProfileImage(user)} x={x} y={y} />
      </Link>
      { showName?
          <div>
            {user.name}
          </div> : null}
    </span>
  );
};

Roundy.propTypes = {
  user: PropTypes.object.isRequired
};

export default Roundy;
