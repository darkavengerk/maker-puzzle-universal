import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import styles from '../css/components/maker';

const cx = classNames.bind(styles);

class Maker extends Component {
  render() {
    const { maker } = this.props;
    return (
      <div>
        <TopTitle title={maker.userid} thumbnailURL={maker.imgURL} />
        {maker.email}
        <ImageUploader title="uploader" name="photo-uploader" />
      </div>
    );
  }
}

Maker.propTypes = {
  maker: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker
  };
}

export default connect(mapStateToProps, {})(Maker);
