import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import Password from '../components/Account/Password';
import { Main } from '../services';

import styles from '../css/components/account';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {done: false, message: ''};
  }

  onChange() {
    this.setState({done: true, message: '비밀번호가 변경되었습니다'});
  }

  onCancel() {
    this.setState({done: true, message: '취소되었습니다'});
  }

  render() {
    const { hash, id } = this.props.routeParams;
    if(this.state.done) {
      return <div>
        <Padding height={50} width="100%"/>
        <Padding height={30} width="100%">
          <h1 className={cx('title')}>{this.state.message}</h1>
        </Padding>
      </div>;
    }
    return (
      <div>
        <Padding height={50} width="100%"/>
        <Padding height={30} width="100%">
          <h1 className={cx('title')}>비밀번호 재설정</h1>
        </Padding>
        <Password
          cx={cx}
          hash={hash}
          userid={id}
          onChange={this.onChange}
          cancel={this.onCancel}
        />
        <Padding height={200} />
      </div>
    );
  }
}

Container.propTypes = {
};

function mapStateToProps(state) {
  return {
    param: state.param
  };
}

export default connect(mapStateToProps, {})(Container);
