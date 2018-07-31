import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/top-title';
import ProfileImage from '../components/FlexibleImage';

const cx = classNames.bind(styles);

const TitleSection = ({ title, thumbnailURL, to, props}) => {

  const profileImage = thumbnailURL? <span className={cx('profile-image')}>
            <ProfileImage src={thumbnailURL} x={40} y={40} />
        </span> : null;

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
  title: PropTypes.string,
  thumbnailURL: PropTypes.string
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(TitleSection);
