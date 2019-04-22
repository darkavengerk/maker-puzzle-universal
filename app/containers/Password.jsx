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
  }

  render() {
    const { hash, id } = this.props.routeParams;
    return (
      <div>
        <Padding height={50} />
        <Password cx={cx} hash={hash} userid={id}/>
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
