import React from 'react';
import classNames from 'classnames/bind';

import styles from '../css/components/auto-complete';

const cx = classNames.bind(styles);

const Component = ({ 
    notify,
    items=[],
    show=false,
    className, 
    width='32.7rem', 
    top='2.7rem' 
  }) => {  

  if(!show) return null;
      // className={cx('auto-complete-word', i === this.state.selected? 'selected':'')} 
      // onMouseOver={mouseOver(i)}
  const listItems = items.map((word, i) => (
    <li key={word} 
      onMouseDown={evt => notify(word)}>
      {word}
    </li>)
  );

  return (
    <ul className={className} style={{ width, top }}>
      {listItems}
    </ul>
  );
}

export default Component;
