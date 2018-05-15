import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import styles from '../css/components/maker';

const cx = classNames.bind(styles);

class Maker extends Component {
  render() {
    const { maker } = this.props;
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle title={maker.userid} thumbnailURL={maker.imgURL} />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection owner={maker} contentsType="maker" />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
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
