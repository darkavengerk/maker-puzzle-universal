import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/layout';

const cx = classNames.bind(styles);

class Layout extends Component {

  render() {
    return (
      <div>
        <div>
          Users
        </div>
        <div>
          ImageUpload
        </div>
        <div>
        </div>
      </div>
    );
  }
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default Layout;
