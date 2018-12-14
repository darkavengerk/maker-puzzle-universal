import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Popup from '../components/Popup';
import TopPanel from '../containers/TopPanel';
import Footer from '../containers/Footer';
import Message from '../containers/Message';
import styles from '../css/main';

const cx = classNames.bind(styles);



/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class App extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { children, screen } = this.props;
    return (
      <div className={cx('app')}>
        <TopPanel />
        <Message />
        {children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(App);