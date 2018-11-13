import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';
import Image from '../components/FlexibleImage';

import styles from '../css/components/project-profile';

import { featureEditSave } from '../actions/projects';
import { Project } from '../utils/objects';

const cx = classNames.bind(styles);

class ProjectProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {...this.props.project};

    this.submit = this.submit.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.featureEdited = this.featureEdited.bind(this);
    this.profileImageEdited = this.profileImageEdited.bind(this);
  }

  startEdit() {
    this.setState({editing:true});
  }

  cancelEdit() {
    const { project } = this.props;
    const { features, profile } = project;
    this.setState({ features, profile, editing: false });
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
    const res = await featureEditSave(this.state);
    if (res.status === 200) {
      this.setState({editing: false});
    }
  }

  render() {
    const { user } = this.props;

    const project = new Project(this.props.project);

    const profileImage = this.state.editing && this.state.profilePicture? this.state.profilePicture : project.getProfileImage();


    const adminButtons = this.state.editing? <div className={cx('system-button-area')} ><br/>
      <label className={cx('system-button', 'important')} role="button" onClick={this.submit} role="button">변경내용 저장</label> 
      <label className={cx('system-button')} role="button" onClick={this.cancelEdit} role="button">취소</label>
    </div> : <div className={cx('system-button-area')} ><br/>
      <label className={cx('system-button')} role="button" onClick={this.startEdit} role="button">정보 수정</label>
    </div>;

    return (
      <div className={cx('main-section')}>
        <span style={{position:'relative', height:'14.4rem'}}>
          <Image source={profileImage} x={349} y={248} />
          <span style={{position:'absolute', bottom:'0.3rem', right:'0.4rem', 'zIndex':1}}>
            {this.state.editing? 
              <ImageUploader name="ImageUploader" callback={this.profileImageEdited} >
                <FlexibleImage className={cx('image-upload-trigger')} source={"/images/site/camera-1.png"} x={34} y={34} />
              </ImageUploader>
              : ''}
          </span>
        </span>
        <div className={cx('feature-area')}>
          {project.features? 
          <Features 
            features={[{title:'프로젝트명', content: project.name, blocked: true}, ...project.features]}
            featureEdited={this.featureEdited}
            classNames={{
              title: cx('feature-title'),
              content: cx('feature'),
              editing: cx('editing'),
              row: cx('feature-item')
            }}
            editing={this.state.editing}
          /> : null
          }
          {user.account.type === 'admin'? adminButtons: null}
        </div>        
      </div>
    );
  }
}

ProjectProfile.propTypes = {
  project: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  featureEditSave: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    project: state.project.project,
    user: state.user
  };
}

export default connect(
  mapStateToProps, 
  {featureEditSave}
)(ProjectProfile);
