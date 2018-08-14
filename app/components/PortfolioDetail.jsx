import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Image from '../components/FlexibleImage';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import DateFormat from '../components/DateFormat';

import styles from '../css/components/portfolio-detail';

const cx = classNames.bind(styles);

const ContentsSection = ({ portfolio, user, referer }) => {

  const imgs = portfolio.images.map(img => (
    <div key={img._id} className={cx('image')} >
      <Image src={img} x={'100%'} pureImage={true}/>
    </div>)
  );

  const imageUrl = referer.getProfileImage();
  const projectArea = (
    <div className={cx('project-area')}>
      <Image src={imageUrl} x={33} y={33} />
      <span>
        <Link className={cx('project-name')} to={referer.getHomeLink()}>{referer.getName()}</Link>
      </span>
    </div>
  );

  const tags = portfolio.tags.map(tag => (<label key={tag} className={cx('tag')}>{tag}</label>));

  return (
    <div className={cx('main-section')}>
      <div className={cx('title-area')}>
        <h1 className={cx('portfolio-title')}>
          {portfolio.title}
        </h1>
        <div>
          <div className={cx('create-date')} >등록 일자</div>
          <Padding width={'0.8rem'} inline={true} />
          <DateFormat className={cx('create-date')} datestring={portfolio.created || portfolio.lastUpdated} />
        </div>
      </div>
      <SingleLine width='auto' color='#dadada' thickness={1} extend={20}/>
      <section className={cx('contents')}>
        {projectArea}
        <p className={cx('description')}>
          {portfolio.description}
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
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, {})(ContentsSection);
