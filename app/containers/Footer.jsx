import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Footer = () => {
  return (
    <div className={cx('footer')}>
      <h1>Maker Puzzle</h1>
      <div className={cx('description')}>
        <p>Footer description
        </p>
      </div>
    </div>
  );
};

export default Footer;
