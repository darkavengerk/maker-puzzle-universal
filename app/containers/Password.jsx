import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import SingleLine from '../components/SingleLine';
import Padding from '../components/Padding';
import { Main } from '../services';

import styles from '../css/components/account';

const cx = classNames.bind(styles);

class Container extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const { routeParams } = this.props;
    return (
      <div>
        123password
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
