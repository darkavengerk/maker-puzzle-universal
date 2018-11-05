import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import ContentEditable from 'react-contenteditable'
import jsxToString from 'jsx-to-string';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';

import Popup from '../components/Popup';
import FollowList from '../components/FollowList';
import Assist from '../utils/assist';

import styles from '../css/components/company-profile';

import { featureEditSave, follow, unfollow } from '../actions/companies';
import { loginMenu, cancelLogin, logOut } from '../actions/users';

import { Company } from '../utils/objects';

const cx = classNames.bind(styles);

class CompanyProfile extends Component {

  constructor(props) {
    super(props);

    const { company } = this.props;
    this.state = {...company};

    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
    this.followClicked = this.followClicked.bind(this);
    this.unfollowClicked = this.unfollowClicked.bind(this);
    this.showList = this.showList.bind(this);
    this.hideList = this.hideList.bind(this);
  }

  startEdit() {
    this.setState({editing:true});
  }

  cancelEdit() {
    const { company } = this.props;
    const { features, profile, about } = company;
    this.setState({ features, profile, about, editing: false });
  }

  featureEdited(key, text) {

    const target = this.state;    
    const features = target.features.map(feature => {
      if(feature.title === key) {
        return {...feature, content:text}
      }
      return feature;
    });
    this.setState({ features });
  }

  profileImageEdited(err, profilePicture) {
    this.setState({ profilePicture });
  };

  async submit() {
    const { featureEditSave } = this.props;
    const { features, profilePicture } = this.state;
    const res = await featureEditSave({features, profilePicture});
    if (res.status === 200) {
      this.setState({editing: false});
    }
  }

  followClicked() {
    const {follow, company, user, loginMenu} = this.props;
    if(!user.userid) {
      loginMenu();
    }
    else follow({follower: user, following: company});
  }

  unfollowClicked() {
    const {unfollow, company, user} = this.props;
    unfollow({follower: user, following: company});
  }

  showList(mode) {
    const { company } = this.props;
    return evt => this.setState({showFollowList: true, followList: company.followers, mode});
  }

  hideList() {
    return this.setState({showFollowList: false, followList: []});
  }

  render() {
    const { company: data, user, logOut, follow, unfollow } = this.props;
    const company = new Company(data);
    const isOwnPage = (user.type==='admin' || (user.userid && company.isOwnPage(user)));
    const isFollowing = user.userid && ((company.followers || []).filter(u => (u._id || u) === user._id).length > 0);

    let stats = (
      <span className={cx('stats-area', 'flex-row')} id="company-stats-area">
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {company.portfolios? company.companyPortfolios.length : 0}
          </span>
          <span className={cx('keyword')}>
            Portfolio
          </span>
        </span>

        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {company.portfolios? Assist.Maker.getEligiblePortfolios(company, user).length : 0}
          </span>
          <span className={cx('keyword')}>
            Maker’s Portfolio
          </span>
        </span>

        <span className={cx('maker-stats', 'flex-col')} onClick={this.showList('followers')} role="button">
          <span className={cx('figure')}>
            {(company.followers || []).length}
          </span>
          <span className={cx('keyword')}>
            Follower
          </span>
        </span>       
        <Popup 
          show={this.state.showFollowList} 
          name="followListPopup" 
          target={'company-stats-area'} 
          top={50} 
          left={-172}
          cancel={this.hideList}>
          <FollowList list={this.state.followList} mode={this.state.mode} />
        </Popup> 
      </span>);

    let buttonArea = isFollowing?
      <span className={cx('following-button')} role="button" onClick={this.unfollowClicked}>
        Following
      </span> :
      <span className={cx('follow-button')} role="button" onClick={this.followClicked}>
        FOLLOW
      </span>;

    if(isOwnPage) { 
      buttonArea = 
      <span className={cx('button-area')}>
        <label className={cx('system-button')} role="button" onClick={this.startEdit}>정보 수정</label>
      </span>;

      if(this.state.editing) {
        buttonArea = 
          <span className={cx('button-area')}>
            <label className={cx('system-button-half', 'important')} role="button" onClick={this.submit}>변경내용 저장</label> 
            <label className={cx('system-button-half')} role="button" onClick={this.cancelEdit}>취소</label>
          </span>;
      }
    }

    const profileImage = this.state.editing && this.state.profilePicture? this.state.profilePicture : company.getProfileImage();
    let c = cx('feature', this.state.editing? 'editing':'');
    return (
      <div className={cx('main-section')}>
        <span className={cx('flex-row')}>
          <span style={{position:'relative', height:'14.4rem'}}>
            <FlexibleImage src={profileImage} x={144} y={144} contain={true} />
            <span style={{position:'absolute', bottom:'0.3rem', right:'0.4rem', 'zIndex':1}}>
              {this.state.editing? 
                <ImageUploader name="ImageUploader" callback={this.profileImageEdited} >
                  <FlexibleImage className={cx('image-upload-trigger')} src={"/images/site/camera-1.png"} x={34} y={34} />
                </ImageUploader>
                : ''}
            </span>
          </span>
          <span className={cx('user-info')}>
            <span className={cx('name')}>
              {company.name}
            </span>
            <Border width={181} thickness={1} color={'#dadada'} />
            {stats}
            {buttonArea}
          </span>
        </span>
        <div className={cx('feature-area')}>
          <Features 
            features={[{title:'기업명', content: company.name, blocked: true}, ...(company.features || [])]}
            featureEdited={this.featureEdited}
            classNames={{
              title: cx('feature-title'),
              content: cx('feature'),
              editing: cx('editing'),
              row: cx('feature-item')
            }}
            editing={this.state.editing}
          />          
        </div>
        
      </div>
    );
  }
}

CompanyProfile.propTypes = {
  company: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  featureEditSave: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user.account,
    company: state.company.company
  };
}

export default connect(
  mapStateToProps, 
  {featureEditSave, logOut, follow, unfollow, loginMenu}
)(CompanyProfile);