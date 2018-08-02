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

import { featureEditSave } from '../actions/makers';
import { logOut } from '../actions/users';

import ContentEditable from 'react-contenteditable'
import jsxToString from 'jsx-to-string';

const cx = classNames.bind(styles);

class MakerProfile extends Component {

  constructor(props) {
    super(props);

    const { maker } = this.props;
    this.state = {...maker};

    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.aboutEdited = this.aboutEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
  }

  startEdit() {
    this.setState({editing:true});
  }

  cancelEdit() {
    const { maker } = this.props;
    const { features, about, picture } = maker;
    this.setState({ features, picture, about, editing: false });
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

  aboutEdited(evt) {
    const about = evt.target.innerText;
    this.setState({ about });
  }

  profileImageEdited(err, img) {
    this.setState({picture : img});
  };

  async submit() {
    const { featureEditSave } = this.props;
    const { picture, features, about } = this.state;
    const res = await featureEditSave({ picture, features, about });
    if (res.status === 200) {
      this.setState({editing: false});
    }
  }

  render() {
    const { maker, user, logOut } = this.props;
    const isOwnPage = (user.account.userid === maker.userid);

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
            421
          </span>
          <span className={cx('keyword')}>
            Follower
          </span>
        </span>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            421
          </span>
          <span className={cx('keyword')}>
            Following
          </span>
        </span>
      </span>);

    let buttonArea = 
      <span className={cx('follow-button')} role="button">
        FOLLOW
      </span>;

    if(isOwnPage) { 

      buttonArea = 
      <span className={cx('button-area')}>
        <label className={cx('system-button')} role="button" onClick={this.startEdit}>정보 수정</label>
        <label className={cx('system-button')} role="button" onClick={logOut} >로그아웃</label>
      </span>;

      if(this.state.editing) {
        buttonArea = 
          <span className={cx('button-area')}>
            <label className={cx('system-button', 'important')} role="button" onClick={this.submit}>변경내용 저장</label> 
            <label className={cx('system-button')} role="button" onClick={this.cancelEdit}>취소</label>
          </span>;
      }
    }

    const profileImage = this.state.editing? this.state.picture : maker.picture;

    return (
      <div className={cx('main-section')}>
        <span className={cx('flex-row')}>
          <span style={{position:'relative', height:'14.4rem'}}>
            <FlexibleImage src={profileImage || "/images/default_profile.jpg"} x={144} y={144} />
            <span style={{position:'absolute', bottom:'0.3rem', right:'0.4rem', 'zIndex':1}}>
              {this.state.editing? 
                <ImageUploader name="ImageUploader" callback={this.profileImageEdited} >
                  <FlexibleImage src={"/images/site/camera-1.png"} x={34} y={34} />
                </ImageUploader>
                : ''}
            </span>
          </span>
          <span className={cx('user-info')}>
            <span className={cx('name')}>
              {maker.profile.name}
            </span>
            <Border width={181} thickness={2} color={'#dadada'} />
            {stats}
            {buttonArea}
          </span>
        </span>
        <div className={cx('feature-area')}>
          <Features 
            features={this.state.features}
            featureEdited={this.featureEdited}
            classNames={{
              title: cx('feature-title'),
              content: cx('feature', this.state.editing? 'editing':''),
              row: cx('feature-item')
            }}
            editing={this.state.editing}
          />

          <ContentEditable 
            className={cx('about-maker', this.state.editing? 'editing':'')}
            html={ jsxToString(
              <div>
                {maker.about.split('\n').map((sen,i) => (<p key={i}>{sen}</p>))}
              </div>
            ) } 
            onKeyUp={this.aboutEdited}
            disabled={!this.state.editing}
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
  {featureEditSave, logOut}
)(MakerProfile);
