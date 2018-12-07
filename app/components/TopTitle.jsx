import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Link from '../components/Link';
import ProfileImage from '../components/FlexibleImage';
import SingleLine from '../components/SingleLine';

import styles from '../css/components/top-title';
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
    const { title, thumbnailURL, to, children, screen, props} = this.props

    const profileImage = thumbnailURL? 
          <ProfileImage source={thumbnailURL} className={cx('profile-image')} x={30} y={30}/>
           : null;

    const showFloat = this.state.scrollY > 150 && screen.showing === 'normal';

    const titleBar = (
      <Link to={to} className={cx('main-section')}>
        {profileImage}
        <span className={cx('title')}>
          {title}
        </span>
        { children }
      </Link>);

    const padding = <div className={cx('main-section')} />

    if(showFloat) {

      return ( 
        <div>
          <div className={cx('float-section')}>
            {titleBar}
            <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />  
          </div>
          {padding}
        </div>
      );
    }
    else {
      return ( 
        <div>
          <div className={cx('main-section')}>
            {titleBar}
          </div>
        </div>);
    }
  };
}

TitleSection.propTypes = {
  title: PropTypes.string
};

function mapStateToProps(state) {
  return {
    user: state.user,
    screen: state.screen
  };
}

export default connect(mapStateToProps)(TitleSection);
