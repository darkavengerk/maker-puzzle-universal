import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../css/components/maker-profile';

const cx = classNames.bind(styles);

const Component = ({ abilities }) => {

  function fillOvals(limit) {
    var made = [];
    for(let i=0;i<5;i++) {
      if(limit < i)
        made.push(<span key={i} className={cx('ovalEmpty')}></span>);
      else
        made.push(<span key={i} className={cx('ovalFill')}></span>);
    }
    return made;
  }

  let abilitiesHTML = abilities.map(ab => {
    return (<div key={ab.title} className={cx('ability-item')}>
          <span className={cx('ability-title')}>
            {ab.title}
          </span>
          {fillOvals(ab.ability)}
        </div>);
  });

  return (
    <div className={cx('ability-section')}>
      {abilitiesHTML}
    </div>
  );
};

Component.propTypes = {
  abilities: PropTypes.object.isRequired
};

export default Component;


