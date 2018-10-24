import React, { Component } from 'react';

class ControllableTextInput extends Component {
  componentDidMount() {
    if(this.props.onRef)
      this.props.onRef(this.node);
  }

  render() {
    const { 
      text,
      notify,
      keyHook,
      onChange, 
      onBlur,
      className, 
      placeholder, 
      width, 
      top 
    } = this.props;
    return (
      <input
        className={className}
        value={text}
        onChange={evt => notify(evt.target.value)}
        onKeyDown={keyHook}
        placeholder={placeholder}
        onBlur={onBlur}
        ref={n => {this.node = n}}
      />
    );
  }
}

export default ControllableTextInput;
