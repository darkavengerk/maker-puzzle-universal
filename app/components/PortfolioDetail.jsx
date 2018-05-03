import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import SingleLine from '../components/SingleLine';
import styles from '../css/components/portfolio-detail';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, user, maker }) => {

  const imgs = portfolio.images.map(img => (
    <div className={cx('image')} >
      <Image key={img} src={"/images/portfolio/" + img} x={'100%'} pureImage={true}/>
    </div>)
  );

  const tags = portfolio.tags.map(tag => (<label key={tag} className={cx('tag')}>{tag}</label>));

  return (
    <div className={cx('main-section')}>
      <h1 className={cx('title-area')}>
        {portfolio.title}
      </h1>
      <SingleLine width='auto' color='#dadada' thickness={1} extend={20}/>
      <section className={cx('contents')}>
        <p className={cx('description')}>
          {portfolio.descriptions}
        </p>
        <div className={cx('tag-area')}>
          {tags}
        </div>
        <div className={cx('image-area')}>
          {imgs}
        </div>
      </section>
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
