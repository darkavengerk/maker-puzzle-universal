import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import MakerInfo from '../components/MakerInfo';
import PortfolioItem from '../components/PortfolioItem';
import styles from '../css/components/contents-section';

const cx = classNames.bind(styles);

const ContentsSection = ({ owner, contentsType }) => {

  const portfolios = owner.portfolios.map(portfolio => {
    return (<PortfolioItem portfolio={portfolio} key={portfolio.title} />);
  });

  return (
    <div className={cx('main-section')}>
      <span className={cx('left-panel')} >
        <MakerInfo maker={owner} />
      </span>
      <span className={cx('main-panel')} >
        <p className={cx('main-panel-title')}>포트폴리오</p>
        {portfolios}
      </span>
    </div>
  );
};

ContentsSection.propTypes = {
  owner: PropTypes.object.isRequired,
  contentsType: PropTypes.string.isRequired
};

export default ContentsSection;
