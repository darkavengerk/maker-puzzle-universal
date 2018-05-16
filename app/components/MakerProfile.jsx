import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';
import styles from '../css/components/maker-profile';

import { featureEdited, featureEditStart, featureEditSave, featureEditCancel } from '../actions/makers';
import { logOut } from '../actions/users';

import ContentEditable from 'react-contenteditable'
import jsxToString from 'jsx-to-string';

const cx = classNames.bind(styles);

class MakerProfile extends Component {

  constructor(props) {
    super(props);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  cancelEdit() {
    this.props.featureEditCancel(this.props.maker);
  }

  render() {
    const { maker, context, user, featureEdited, featureEditStart, featureEditCancel, featureEditSave, logOut } = this.props;

    let stats = (
      <span className={cx('stats-area', 'flex-row')}>
        <span className={cx('maker-stats', 'flex-col')}>
          <span className={cx('figure')}>
            {maker.portfolios.length}
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

    if(user.account.profile && (maker.profile.userid === user.account.profile.userid)) { 

      buttonArea = 
      <span className={cx('button-area')}>
        <label className={cx('system-button')} role="button" onClick={featureEditStart}>정보 수정</label>
        <label className={cx('system-button')} role="button" onClick={logOut} >로그아웃</label>
      </span>;

      if(context.editing) {
        buttonArea = 
          <span className={cx('button-area')}>
            <label className={cx('system-button', 'important')} role="button" onClick={featureEditSave}>변경내용 저장</label> 
            <label className={cx('system-button')} role="button" onClick={this.cancelEdit}>취소</label>
          </span>;
      }
    }

    const handleChange = evt => {
      // use innter text to sum up the result
      featureEdited('about', evt.target.innerText);
    }

    return (
      <div className={cx('main-section')}>
        <span className={cx('flex-row')}>
          <span style={{position:'relative', height:'14.4rem'}}>
            <FlexibleImage src="/images/default_profile.jpg" x={144} y={144} />
            <span style={{position:'absolute', bottom:'0.3rem', right:'0.4rem', 'zIndex':1}}>
              {context.editing? <FlexibleImage src="/images/site/camera-1.png" x={34} y={34} />:''}
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
            features={maker.features}
            featureEdited={featureEdited}
            classNames={{
              title: cx('feature-title'),
              content: cx('feature', context.editing? 'editing':''),
              row: cx('feature-item')
            }}
            editing={context.editing}
          />

          <ContentEditable 
            className={cx('about-maker', context.editing? 'editing':'')}
            html={ jsxToString(
              <div>
                {maker.about.split('\n').map((sen,i) => (<p key={i}>{sen}</p>))}
              </div>
            ) } 
            onKeyUp={handleChange}
            disabled={!context.editing}
          />
          
        </div>
        <ImageUploader name="ImageUploader" />
      </div>
    );
  }
}

MakerProfile.propTypes = {
  maker: PropTypes.object.isRequired,
  featureEdited: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    context: state.maker.context,
    user: state.user
  };
}

export default connect(
  mapStateToProps, 
  {featureEdited, featureEditStart, featureEditSave, featureEditCancel, logOut}
)(MakerProfile);
