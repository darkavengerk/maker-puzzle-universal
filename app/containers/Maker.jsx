import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
// import styles from '../css/components/vote';

// const cx = classNames.bind(styles);

class Maker extends Component {
  render() {
    console.log(this.props);
    // const {newTopic, topics, typing, createTopic, destroyTopic, incrementCount, decrementCount } = this.props;
    return (
      <div>
        <h1>Maker2</h1>
        abc
      </div>
    );
  }
}

Maker.propTypes = {
  // topics: PropTypes.array.isRequired,
  // typing: PropTypes.func.isRequired,
  // createTopic: PropTypes.func.isRequired,
  // destroyTopic: PropTypes.func.isRequired,
  // incrementCount: PropTypes.func.isRequired,
  // decrementCount: PropTypes.func.isRequired,
  // newTopic: PropTypes.string
};

function mapStateToProps(state) {
  return {
    // topics: state.topic.topics,
    // newTopic: state.topic.newTopic
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {  })(Maker);
