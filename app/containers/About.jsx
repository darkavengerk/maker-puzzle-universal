import React from 'react';
// import classNames from 'classnames/bind';
import styles from 'css/components/about';
import ui from '../utils/ui';

console.log(styles);

const cx = ui.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <div className={cx('foldable')}>
      <div className={cx('top', 'fold')}>

        <div className={cx('part1', 'fold-1')}>
        LOGO
        </div>

        <div className={cx('part2', 'fold-1')}>
        SEARCH
        </div>

        <div className={cx('part4', 'fold-1')}>
        LOGIN
        </div>
      </div>
      <div className={cx('main', 'row')}>
        <div className={cx('left', 'fold-1')}>
        info
        </div>    
        <div className={cx('right', 'fold-2')}>
        main
        </div>    
      </div>    
    </div>    
  );
};

export default About;
