import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { follow, unfollow } from '../actions/makers';
import { follow as followCompany, unfollow as unfollowCompany } from '../actions/companies';

import FlexibleImage from '../components/FlexibleImage';
import Padding from '../components/Padding';
import Link from '../components/Link';
import Roundy from '../components/Roundy';
import SingleLine from '../components/SingleLine';
import Assist from '../utils/assist';

import styles from '../css/components/follow-list';

const cx = classNames.bind(styles);

const texts = {
  followers: {
    title: '팔로워',
    message: '팔로워가 아직 없네요 :('
  },
  followings: {
    title: '팔로잉',
    message: '아직 아무도 팔로우하지 않으셨네요'
  }
}

const FollowList = ({ mode, list=[], companyList=[], user, follow, unfollow, followCompany, unfollowCompany }) => {

  const message = (list.length === 0 && companyList.length === 0)? 
    <label className={cx('message')}>{texts[mode].message}</label> : null;

  function followClicked(person, type) {
    if(type === 'maker') {
      return evt => follow({follower: user.account, following: person});
    }
    if(type === 'company') {
      return evt => followCompany({follower: user.account, following: person}); 
    }
  }

  function unfollowClicked(person, type) {
    if(type === 'maker') {
      return evt => unfollow({follower: user.account, following: person});
    }
    if(type === 'company') {
      return evt => unfollowCompany({follower: user.account, following: person}); 
    }
  }

  function createFollowButton(p, type) {
    if(!user.account._id || user.account._id === (p._id || p)) {
      return null;
    }

    if(Assist.Maker.isFollowing(user.account, p)) {
      return <label className={cx('follow-button')} onClick={unfollowClicked(p, type)} role="button">Following</label>;
    }

    return <label className={cx('follow-button', 'follow')} onClick={followClicked(p, type)} role="button">Follow</label>;
  }

  const items = list.map(p => [
    <div className={cx('item')} >
        <Roundy user={p} x={30} y={30} showName={false}/>
        <div className={cx('text', Assist.Maker.getOccupation(p)? 'space-between' : '')}>
          <Link to={Assist.Maker.getHomeLink(p)}>
            <div className={cx('name')}>{p.name}</div>
          </Link>
          <div className={cx('occupation')}>{Assist.Maker.getOccupation(p)}</div>
        </div>
        <div className={cx('buffer')} />
        {createFollowButton(p, 'maker')}
      </div>,
    <SingleLine width={'100%'} thickness={1} color={'#e5e5e5'} />
  ]);

  const companyItems = companyList.map(p => [
    <div className={cx('item')} >
      <FlexibleImage source={Assist.Company.getProfileImage(p)} x={30} y={30} contain={true} />
      <div className={cx('text')}>
        <Link to={Assist.Company.getHomeLink(p)}>
          <div className={cx('name')}>{p.name}</div>
        </Link>
      </div>
      <div className={cx('buffer')} />
      {createFollowButton(p, 'company')}
    </div>,
    <SingleLine width={'100%'} thickness={1} color={'#e5e5e5'} />
  ]);

  return (
    <section className={cx('main-section')}>
      <div className={cx('title')}>{texts[mode].title}</div>
      <SingleLine width={'100%'} thickness={1} color={'#a1a1a1'} />
      <div className={cx('list')}>
        {message}
        {companyItems}
        {items}
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {follow, unfollow, followCompany, unfollowCompany})(FollowList);
