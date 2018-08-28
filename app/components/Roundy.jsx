import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import Padding from '../components/Padding';
import styles from '../css/common/images';

const cx = classNames.bind(styles);

const Roundy = ({ user, x=110, y=110, showName=true, defaultImage, ...props }) => {
  return (
    <span className={cx('maker-round')} key={user.userid} >
      <Link to={'/maker/'  + user.userid}>
        <Image className={cx('maker-round-image')} src={user.picture || defaultImage} x={x} y={y} />
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
