import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import styles from '../css/components/top-title';
import ProfileImage from '../components/FlexibleImage';
import SingleLine from '../components/SingleLine';

const cx = classNames.bind(styles);

class TitleSection extends Component {
  constructor(props) {
    super(props);
    this.state = {scrollY: 0}
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(evt) {
    this.setState({scrollY: window.scrollY});
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { title, thumbnailURL, to, props} = this.props

    const profileImage = thumbnailURL? 
          <ProfileImage src={thumbnailURL} className={cx('profile-image')} x={30} y={30}/>
           : null;

    const titleBar = <Link to={to} className={cx('main-section')}>
          {profileImage}
          <span className={cx('title')}>
            {title}
          </span>
        </Link>;

    const showFloat = this.state.scrollY > 150;

    return ( 
      <div>
        <div className={cx('main-section')}>
          {titleBar}
        </div>
        {
          showFloat? 
          <div className={cx('float-section', showFloat)}>
            {titleBar}
            <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
          </div> : null
        }
        
      </div>
    );
  };
}

TitleSection.propTypes = {
  title: PropTypes.string
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(TitleSection);
