import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import Image from '../components/FlexibleImageLazy';
import Assist from '../utils/assist';

import styles from '../css/common/images';

const cx = classNames.bind(styles);

const Roundy = ({ user, x=110, y=110, showName=true, ...props }) => {
  if(showName) {
    return (
      <div className={cx('main-section')} {...props} >
        <span key={user.userid}>
          <Link to={'/maker/'  + user.userid} count="maker">
            <Image className={cx('maker-round-image')} source={Assist.Maker.getProfileImage(user)} x={x} y={y} />
          </Link>
        </span>
        <div className={cx('maker-round')} >
          {user.name}
        </div>
      </div>
    );
  }
  return <Link to={'/maker/'  + user.userid} count="maker" style={{width:x, height: y}}>
            <Image className={cx('maker-round-image', user.picture? '' : 'round-border')} source={Assist.Maker.getProfileImage(user)} x={x} y={y} />
          </Link>
  
};

Roundy.propTypes = {
  user: PropTypes.object.isRequired
};

export default Roundy;
