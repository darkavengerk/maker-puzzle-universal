import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import styles from '../css/components/maker-info';

// const cx = classNames.bind(styles);

const MakerInfo = ({ maker }) => {

  return (
    <div>
      Maker: {maker.userid}
    </div>
  );
};

MakerInfo.propTypes = {
  maker: PropTypes.object.isRequired
};

export default MakerInfo;
