import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/top-title';
import ProfileImage from '../components/FlexibleImage';

const cx = classNames.bind(styles);

const TitleSection = ({ title, thumbnailURL, to, props}) => {

  const profileImage = thumbnailURL? 
        <ProfileImage src={thumbnailURL} className={cx('profile-image')} x={30} y={30}/>
         : null;

  return (
      <Link to={to} className={cx('main-section')}>
        {profileImage}
        <span className={cx('title')}>
          {title}
        </span>
      </Link>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(TitleSection);
