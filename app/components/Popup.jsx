import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { showingPopup } from '../actions/users';
import Padding from '../components/Padding';
import styles from '../css/components/popup';

const cx = classNames.bind(styles);

class Popup extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(evt) {
    // evt.preventDefault();
    let { cancel, showingPopup, name } = this.props;
    if(cancel && evt.target.id === name) {
      cancel(evt);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { showingPopup, show } = this.props;
    if(show !== nextProps.show) {
      showingPopup(nextProps.show);
      return nextProps;
    }
  }

  render() {
    let { show, name, children, cancel, top='15rem', left=0, roll=false, target, showingPopup } = this.props;

    if(show) {      
      if(target) {
        if(!document.getElementById(target)) return null;

        const targetElement = document.getElementById(target);
        const paddingTop = targetElement.offsetTop + top;
        const paddingLeft = targetElement.offsetLeft + left;

        return (
          <div>
            <div className={cx('main-section', 'background')} id={name} onClick={this.onClick} >
            </div>
            <div className={cx('main-section')} id={name} onClick={this.onClick}
              style={{padding: paddingTop + 'px 0 0 ' + paddingLeft +'px'}} >
              {children}
            </div>
          </div>
        );
      }

      if(roll) {
        top = window.scrollY + top + 'px';
      }
      else {
        window.scrollTo(0, 0);
      }

      return (
        <div>
          <div className={cx('main-section', 'background')} id={name} onClick={this.onClick} >
          </div>
          <div className={cx('main-section')} id={name} onClick={this.onClick} >
            <Padding height={top} />
            <div className={cx('middle')} id={name} onClick={this.onClick}>
              {children}
            </div>
          </div>
        </div>
      );
    }
    else return null;
  };
}

Popup.propTypes = {
  name: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, { showingPopup })(Popup);
