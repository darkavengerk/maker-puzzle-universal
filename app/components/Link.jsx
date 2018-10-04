import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { Main } from '../services';
import TopicTextInput from '../components/TopicTextInput';
import styles from '../css/components/entrybox';

const cx = classNames.bind(styles);


const LinkComponent = ({to, children, user, count=null, ...props}) => {
  function click(evt) {
    if(count) {
      const keys = to.split('/').filter(x => x);

      if(keys[0] === 'maker' && keys[1] === user.account.userid) return;

      const identifier = keys[keys.length-1];
      Main().count({content:count, identifier});
    }
  }
  return (
    <Link to={to} onClick={click} role="button" {...props}>
      {children}
    </Link>
  );
};

LinkComponent.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {})(LinkComponent);