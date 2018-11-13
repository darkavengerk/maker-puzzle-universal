import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import ControllableTextInput from '../components/ControllableTextInput';
import FloatingList from '../components/FloatingList';

import styles from '../css/components/auto-complete';

const cx = classNames.bind(styles);

class autoComplete extends Component {

  constructor(props) {
    super(props);

    const { target } = this.props;
    this.state = {showDropdown: false, selected: -1, height: 0, width: 0};
    this.hideDropdown = this.hideDropdown.bind(this);
    this.showList = this.showList.bind(this);
    this.onTextChage = this.onTextChage.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.onTextSelected = this.onTextSelected.bind(this);
    this.itemSelected = this.itemSelected.bind(this);
  }

  componentDidMount() {
    const { height, width } = this.input.getBoundingClientRect();
    this.setState({ height, width });
  }

  keyPressed(evt) {
    const e = evt || window.event;

    if (e.keyCode == '38') { // up arrow
      if(this.state.selected >= 0)
        this.itemSelected(this.state.selected - 1);
      e.preventDefault();
    }
    else if (e.keyCode == '40') { // down arrow
      if(this.state.projectSuggestion && this.state.projectSuggestion.length - 1 > this.state.selected)
        this.itemSelected(this.state.selected + 1);
      e.preventDefault();
    }
    else if (e.keyCode == '13' || e.keyCode == '9') { // Enter or Tab
      if(this.state.selected >= 0) {
        const word = this.state.projectSuggestion[this.state.selected];
        this.setState({showDropdown: false, selected: -1});
        this.props.update(word);
        e.preventDefault();
      }
      else if(e.keyCode == '13') {
        e.preventDefault();
      }
    }
    else if (e.keyCode == '27') { // ESC
      this.setState({showDropdown: false, selected: -1});
    }
  }

  itemSelected(i) {
    const word = this.state.projectSuggestion[i];
    this.props.update(word);
    this.setState({selected: i});
  }

  hideDropdown() {
    this.setState({showDropdown: false});
  }

  componentWillMount() {
    if(typeof variable !== 'undefined')
      document.body.addEventListener('mouseup', this.hideDropdown);
  }

  componentWillUnmount() {
    if(typeof variable !== 'undefined')
      document.body.removeEventListener('mouseup', this.hideDropdown);
  }

  onTextChage(key, lengthLimit) {
    const { update, request } = this.props;
    return (textInput) => {
      let newState = {selected: -1};
      let length = 0;
      let text = '';

      for(let ch of textInput) {
        length += (escape(ch).length > 4? 2 : 1);
        text += ch;

        if(length >= lengthLimit) break;
      }

      if(this.props.text !== text) {
        update(text);
        request({keyword: text}).then(res => this.showList(res.data));
        return true;
      }
      else {
        return false;
      }

    }
  }

  onTextSelected(text) {
    const { update } = this.props;
    this.setState({ showDropdown: false});
    update(text);
  }

  showList(info) {
    if(!info) info=[];
    const words = info.map(d => d.word);
    if(words.length > 0) {
      this.setState({showDropdown: true, projectSuggestion: words});
    }
    else {
      this.setState({showDropdown: false, projectSuggestion: []});
    }
  }

  render() {
    const { text, className, top, width, placeholder, textLimit=30 } = this.props;
    return (
      <div className={className + ' ' + cx('relative')} >
        <ControllableTextInput
          className={cx('fillXY', 'clear-border')}
          notify={this.onTextChage('text', textLimit)} 
          text={text}
          keyHook={this.keyPressed}
          placeholder={placeholder}
          onBlur={this.hideDropdown}
          onRef={ref => (this.input = ref)}
        />
        <FloatingList
          width={this.state.width + 12}
          top={this.state.height}
          margin={2}
          notify={this.onTextSelected} 
          items={this.state.projectSuggestion}
          itemClassName={cx('selected')}
          show={this.state.showDropdown}
          index={this.state.selected}
          update={this.itemSelected}
        />
      </div>
    );
  }
}

export default autoComplete;
