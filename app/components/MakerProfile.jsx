import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';
import styles from '../css/components/maker-profile';

import { featureEditSave, follow, unfollow } from '../actions/makers';
import { logOut } from '../actions/users';

import ContentEditable from 'react-contenteditable'
import jsxToString from 'jsx-to-string';

const cx = classNames.bind(styles);

class MakerProfile extends Component {

  constructor(props) {
    super(props);

    this.featureEdited = this.featureEdited.bind(this);
    this.aboutEdited = this.aboutEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
    this.followClicked = this.followClicked.bind(this);
    this.unfollowClicked = this.unfollowClicked.bind(this);
  }

  featureEdited(key, text) {
    const target = this.props.maker;    
    const features = target.features.map(feature => {
      if(feature.title === key) {
        return {...feature, content:text}
      }
      return feature;
    });
    this.props.onChange({ features });
  }

  aboutEdited(evt) {
    const about = evt.target.innerText;
    this.props.onChange({ about });
  }

  profileImageEdited(err, img) {
    this.props.onChange({picture : img});
  };

  followClicked() {
    const {follow, unfollow, maker, user} = this.props;
    follow({follower: user.account, following: maker});
  }

  unfollowClicked() {
    const {follow, unfollow, maker, user} = this.props;
    unfollow({follower: user.account, following: maker});
  }

  render() {
    const { 
      maker, 
      user, 
      logOut, 
      startEdit, 
      editing, 
      cancelEdit, 
      onSubmit,
      follow, 
      unfollow
    } = this.props;

    const isOwnPage = (user.account.userid === maker.userid);
    const isFollowing = maker.followers.filter(u => u.userid === user.account.userid).length > 0;

    let stats = (
      <span className={cx('stats-area', 'flex-row')}>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {maker.portfolios? maker.portfolios.length : 0}
          </span>
          <span className={cx('keyword')}>
            Portfolio
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {maker.followers.length}
          </span>
          <span className={cx('keyword')}>
            Follower
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {maker.followings.length}
          </span>
          <span className={cx('keyword')}>
            Following
          </span>
        </span>
      </span>);

    let buttonArea;

    if(isOwnPage) { 
      buttonArea = 
      <span className={cx('button-area')}>
        <label className={cx('system-button')} role="button" onClick={startEdit}>정보 수정</label>
        <label className={cx('system-button')} role="button" onClick={logOut} >로그아웃</label>
      </span>;

      if(editing) {
        buttonArea = 
          <span className={cx('button-area')}>
            <label className={cx('system-button', 'important')} role="button" onClick={onSubmit}>변경내용 저장</label> 
            <label className={cx('system-button')} role="button" onClick={cancelEdit}>취소</label>
          </span>;
      }
    }
    else {
      buttonArea = isFollowing?
      <span className={cx('following-button')} role="button" onClick={this.unfollowClicked}>
        Following
      </span> :
      <span className={cx('follow-button')} role="button" onClick={this.followClicked}>
        FOLLOW
      </span>;
    }

    return (
      <div className={cx('main-section')}>
        <span className={cx('flex-row')}>
          <span style={{position:'relative', height:'14.4rem'}}>
            <FlexibleImage src={maker.getProfileImage? maker.getProfileImage():''} x={144} y={144} />
            <span style={{position:'absolute', bottom:'0.3rem', right:'0.4rem', 'zIndex':1}}>
              {editing? 
                <ImageUploader name="ImageUploader" callback={this.profileImageEdited} >
                  <FlexibleImage className={cx('image-upload-trigger')} src={"/site/images/camera-1.png"} x={34} y={34} />
                </ImageUploader>
                : ''}
            </span>
          </span>
          <span className={cx('user-info')}>
            <span className={cx('name')}>
              {maker.name}
            </span>
            <Border width={181} thickness={2} color={'#dadada'} />
            {stats}
            {buttonArea}
          </span>
        </span>
        <div className={cx('feature-area')}>
          <Features 
            features={maker.features || []}
            featureEdited={this.featureEdited}
            classNames={{
              title: cx('feature-title'),
              content: cx('feature', editing? 'editing':''),
              row: cx('feature-item')
            }}
            editing={editing}
          />

          <ContentEditable 
            className={cx('about-maker', editing? 'editing':'')}
            html={maker.about? maker.about.trim() : ''} 
            tagName="pre"
            onKeyUp={this.aboutEdited}
            disabled={!editing}
            placeholder="간단한 자기 소개를 입력해주세요."
          />          
        </div>        
      </div>
    );
  }
}

MakerProfile.propTypes = {
  maker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  featureEditSave: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps, 
  {featureEditSave, logOut, follow, unfollow}
)(MakerProfile);
