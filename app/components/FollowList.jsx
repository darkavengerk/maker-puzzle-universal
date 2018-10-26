import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { follow, unfollow } from '../actions/makers';

import Padding from '../components/Padding';
import Link from '../components/Link';
import Roundy from '../components/Roundy';
import SingleLine from '../components/SingleLine';
import Assist from '../utils/assist';

import styles from '../css/components/follow-list';

const cx = classNames.bind(styles);

const FollowList = ({ title, list, user, follow, unfollow }) => {

  function followClicked(person) {
    return evt => follow({follower: user.account, following: person});
  }

  function unfollowClicked(person) {
    return evt => unfollow({follower: user.account, following: person});
  }

  function createFollowButton(p) {
    if(!user.account._id || user.account._id === (p._id || p)) {
      return null;
    }

    if(Assist.Maker.isFollowing(user.account, p)) {
      return <label className={cx('follow-button')} onClick={unfollowClicked(p)} role="button">Following</label>;
    }

    return <label className={cx('follow-button', 'follow')} onClick={followClicked(p)} role="button">Follow</label>;
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
      {createFollowButton(p)}
    </div>,
    <SingleLine width={'100%'} thickness={1} color={'#e5e5e5'} />
  ]);
  return (
    <section className={cx('main-section')}>
      <div className={cx('title')}>{title}</div>
      <SingleLine width={'100%'} thickness={1} color={'#a1a1a1'} />
      <div className={cx('list')}>
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

export default connect(mapStateToProps, {follow, unfollow})(FollowList);
