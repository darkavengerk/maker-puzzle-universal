import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-item';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio }) => {

  return (
    <div className={cx('main-section')}>
      <div className={cx('text-section')}>
        <h1>
          {portfolio.title}
        </h1>
        <p>
          {portfolio.descriptions}
        </p>
      </div>
      <Image x={214} y={214}/>
    </div>
  );
};

ContentsSection.propTypes = {
  portfolio: PropTypes.object.isRequired
};

export default ContentsSection;
