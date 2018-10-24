import React, { Component } from 'react';

class FloatingList extends Component {
  constructor(props) {
    super(props);
    this.mouseOver = this.mouseOver.bind(this);
  }

  mouseOver(i) {
    const { update } = this.props;
    return evt => update(i);
  }

  render() {
    const { 
      notify,
      items=[],
      show=false,
      className, 
      itemClassName,
      width, 
      top,
      margin,
      index
    } = this.props;
    if(!show) return null;
    const listItems = items.map((word, i) => (
      <li 
        className={i === index? itemClassName : ''} 
        style={{padding: '0 0.5rem'}}
        onMouseOver={this.mouseOver(i)}
        key={word} 
        onMouseDown={evt => notify(word)}>
        {word}
      </li>)
    );

    const style= {
      position: 'absolute',
      left: 0,
      top: top,
      marginTop: margin,
      width,
      zIndex: 9,
      background: 'white',
      'listStyleType': 'none',
      padding: 0,
      border: '1px dashed',
    }

    return (
      <ul className={className} style={style}>
        {listItems}
      </ul>
    );
  }
}

export default FloatingList;
