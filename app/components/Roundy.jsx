import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/common/images';

const cx = classNames.bind(styles);

const Roundy = ({ user, ...props }) => {
  return (
    <span className={cx('maker-round')} key={user.userid} >
      <Link to={'/maker/'  + user.userid}>
        <Image className={cx('maker-round-image')} src={user.picture} x={110} y={110} />
      </Link>
      {user.name}
    </span>
  );
};

Roundy.propTypes = {
  user: PropTypes.object.isRequired
};

export default Roundy;
