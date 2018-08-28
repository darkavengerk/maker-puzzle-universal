import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import _ from 'lodash';

import FlexibleImage from '../components/FlexibleImage';
import Border from '../components/SingleLine';
import ImageUploader from '../components/ImageUploader';
import Features from '../components/Features';
import Image from '../components/FlexibleImage';

import styles from '../css/components/project-profile';

import { featureEditSave } from '../actions/makers';
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
    // const { project: { features }} = this.props;
    // this.setState({ features, editing: false });
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

    return (
      <div className={cx('main-section')}>
        <Image src={project.getProfileImage()} x={349} y={248} />
        <div className={cx('feature-area')}>
          {project.features? 
            <Features 
              features={[{title:'프로젝트명', content: project.name}, ...project.features]}
              featureEdited={this.featureEdited}
              classNames={{
                title: cx('feature-title'),
                content: cx('feature', this.state.editing? 'editing':''),
                row: cx('feature-item')
              }}
              editing={this.state.editing}
            /> : null
          }
          
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
