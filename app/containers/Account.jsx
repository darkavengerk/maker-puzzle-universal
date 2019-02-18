import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Padding from '../components/Padding';
import SimpleList from '../components/Account/SimpleList';
import Assist from '../utils/assist';
import { changePortfoiloOrder } from '../actions/makers';

import styles from '../css/components/account';

const cx = classNames.bind(styles);

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedMenu: 0};
    this.onClick = this.onClick.bind(this);
  }

  onClick(index) {
    this.setState({selectedMenu: index});
  }

  render() {
    return (
      <div className={cx('account-main')}>
        <div>
          <SimpleList 
            items={['계정 기본정보', '메이커 프로필', '소속 기업', '능력치', '탈퇴하기']} 
            cx={cx}
            cxPrefix={'menu-'}
            selected={this.state.selectedMenu}
            onClick={this.onClick}
          />
        </div>
        <div>
          <p className={cx('main-panel-title')}>계정 기본정보</p>
        </div>
      </div>
    );
  }
}

Container.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(Container);
