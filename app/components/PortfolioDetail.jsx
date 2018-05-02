import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import styles from '../css/components/portfolio-detail';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, user, maker }) => {

  const imgs = portfolio.images.map(img => (<Image key={img} src={"/images/portfolio/" + img} y={523} x={'100%'} />));

  return (
    <div className={cx('main-section')}>
      <h1>
        {portfolio.title}
      </h1>
      <p>
        {portfolio.descriptions}
      </p>
      {imgs}
    </div>
  );
};

ContentsSection.propTypes = {
  portfolio: PropTypes.object.isRequired,
  user: PropTypes.object,
  maker: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {})(ContentsSection);
