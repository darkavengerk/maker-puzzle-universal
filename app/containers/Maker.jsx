import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import styles from '../css/components/maker';

const cx = classNames.bind(styles);

class Maker extends Component {
  render() {
    const { maker } = this.props;
    return (
      <div className={cx('main-section')}>
        <TopTitle title={maker.userid} thumbnailURL={maker.imgURL} />
        <ContentsSection owner={maker} contentsType="maker" />
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
