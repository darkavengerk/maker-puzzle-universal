import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Link from '../../components/Link';

import styles from '../../css/components/main-page-v2';

const cx = classNames.bind(styles);

const SectionItem = ({ title, children, link }) => {

  return (
      <section className={cx('project-section')}>
        <div className={cx('title')}>
          {title}
          <Link to={link}>
            <span className={cx('more-detail')}>더 보기</span>
          </Link>
        </div>
        <div className={cx('project-tiles')}>
          {children}
        </div>
      </section>);
};

SectionItem.propTypes = {
  title: PropTypes.string.isRequired
};

export default SectionItem;
