import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import styles from '../css/components/add-portfolio';

const cx = classNames.bind(styles);

class autoComplete extends Component {

  constructor(props) {
    super(props);

    const { target, text='' } = this.props;
    this.state = {showDropdown: false, text: text};

    this.hideDropdown = this.hideDropdown.bind(this);
    this.showList = this.showList.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.onTextChage = this.onTextChage.bind(this);

    document.body.addEventListener('mouseup', this.hideDropdown);
  }

  hideDropdown() {
    const { update } = this.props;
    update(this.state.text);
    this.setState({showDropdown: false});
  }

  autoComplete(word) {
    const { update } = this.props;
    return evt => {
      this.setState({text: word});
      update(word);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.hideDropdown);
  }

  onTextChage(key, lengthLimit) {
    return (evt) => {
      let newState = {};
      let length = 0;
      let text = '';

      for(let ch of evt.target.value) {
        length += (escape(ch).length > 4? 2 : 1);
        text += ch;

        if(length >= lengthLimit) break;
      }

      if(this.state[key] !== text) {
        newState[key] = text;
        this.setState(newState);
        return true;
      }
      else {
        return false;
      }

    }
  }

  async showList(evt) {
    const { request, update, textLimit=10 } = this.props;
    const updated = this.onTextChage('text', textLimit)(evt);
    let text = evt.target.value;
    if(text) {
      if(updated) {
        const {data} = await request({keyword: text});
        const words = data.map(d => d.word);
        if(words.length > 0) {
          this.setState({showDropdown: true, projectSuggestion: words});
        }
      }
    }
    else {
      this.setState({showDropdown: false});
    }
  }

  render() {
    const { title, id, className, update } = this.props;
    const list = this.state.showDropdown ?
        <ul className={cx('auto-complete')}>
          {(this.state.projectSuggestion || []).map(
            word => <li key={word} className={cx('auto-complete-word')} onMouseDown={this.autoComplete(word)}>{word}</li>)}
        </ul> : null;

    return (
      <div>
        <input 
          id={title}
          type="text" className={className} 
          value={this.state.text} 
          onChange={this.showList} 
          onBlur={this.hideDropdown}
        />
        {list}  
      </div>                
    );
  }
}

autoComplete.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(autoComplete);
