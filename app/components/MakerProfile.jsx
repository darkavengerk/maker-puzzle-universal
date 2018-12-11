import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';

import Popup from '../components/Popup';
import FollowList from '../components/FollowList';

import { featureEditSave, follow, unfollow } from '../actions/makers';
import { logOut, loginMenu } from '../actions/users';

import ContentEditable from 'react-contenteditable'
import jsxToString from 'jsx-to-string';
import Assist from '../utils/assist';

import styles from '../css/components/maker-profile';
const cx = classNames.bind(styles);

class MakerProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {showFollowList: false};

    this.featureEdited = this.featureEdited.bind(this);
    this.aboutEdited = this.aboutEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
    this.followClicked = this.followClicked.bind(this);
    this.unfollowClicked = this.unfollowClicked.bind(this);
    this.showList = this.showList.bind(this);
    this.hideList = this.hideList.bind(this);
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
    this.props.onChange({ aboutEdited: about });
  }

  profileImageEdited(err, img) {
    this.props.onChange({picture : img});
  };

  followClicked() {
    const {follow, maker, user, loginMenu} = this.props;
    if(!user.account.userid) {
      loginMenu();
    }
    else follow({follower: user.account, following: maker});
  }

  unfollowClicked() {
    const {unfollow, maker, user} = this.props;
    unfollow({follower: user.account, following: maker});
  }

  showList(route) {
    const { maker } = this.props;
    return evt => this.setState({
      showFollowList: true, 
      followList: Assist.Maker.getFollows(maker, route), 
      companyFollowList: Assist.Maker.getCompanyFollowings(maker, route), 
      mode: route
    });
  }

  hideList() {
    return this.setState({showFollowList: false, followList: []});
  }

  componentWillReceiveProps() {
    this.setState({showFollowList: false});
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
      <span className={cx('stats-area', 'flex-row')} id="maker-stats-area">
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {maker.portfolios? Assist.Maker.getEligiblePortfolios(maker, user).length : 0}
          </span>
          <span className={cx('keyword')}>
            Portfolio
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')} onClick={this.showList('followers')} role="button">
          <span className={cx('figure')}>
            {Assist.Maker.getFollowSize(maker, 'followers')}
          </span>
          <span className={cx('keyword')}>
            Follower
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')} onClick={this.showList('followings')} role="button">
          <span className={cx('figure')}>
            {Assist.Maker.getFollowSize(maker, 'followings')}
          </span>
          <span className={cx('keyword')}>
            Following
          </span>
        </span>
        <Popup 
          show={this.state.showFollowList} 
          name="followListPopup" 
          target={'maker-stats-area'} 
          top={50} 
          left={-172}
          cancel={this.hideList}>
          <FollowList list={this.state.followList} companyList={this.state.companyFollowList} mode={this.state.mode} />
        </Popup>
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
          <span style={{position:'relative', height:'1.44rem'}}>
            <FlexibleImage source={Assist.Maker.getProfileImage(maker)} x={144} y={144} />
            <span style={{position:'absolute', bottom:'0.03rem', right:'0.04rem', 'zIndex':1}}>
              {editing? 
                <ImageUploader name="ImageUploader" callback={this.profileImageEdited} >
                  <FlexibleImage className={cx('image-upload-trigger')} source={"/site/images/camera-1.png"} x={34} y={34} />
                </ImageUploader>
                : ''}
            </span>
          </span>
          <span className={cx('user-info')}>
            <span className={cx('name')}>
              {maker.name}
            </span>
            <Border width={181} thickness={1} color={'#dadada'} />
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
            html={maker.about? maker.about : ''} 
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
  {featureEditSave, loginMenu, logOut, follow, unfollow}
)(MakerProfile);
