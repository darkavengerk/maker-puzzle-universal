import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/vote';
import { default as ImageUploader } from '../components/ImageUploader';
import { Col } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Main extends Component {

  render() {
    const { people } = this.props;
    const peoplelist = people.map(person => {
      return (
        <div key={person.email}> {person.email} </div>
      )
    });
    return (
      <div>
        <div>
          Users
        </div>
        <div>
          ImageUpload
          <Col sm={6} xs={12}>
            <ImageUploader title="uploader" name="photo-uploader" />
          </Col>
        </div>
        <div>
          {peoplelist}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  people: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    people: state.people.people
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {  })(Main);
