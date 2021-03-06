import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';

import styles from '../css/components/maker';
import Assist from '../utils/assist'

const cx = classNames.bind(styles);

class ProjectContainer extends Component {
  
  isOwnPage() {
    const { project, param, user } = this.props;
    return Assist.Project.isOwnPage(project, user.account, param);
  }

  render() {
    const { project, user, param } = this.props;
    const assist = Assist.Project;
    const contentsType = (param.mid && param.pid) ? 'project_maker' : 'project';
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={assist.getName(project)}
          to={assist.getHomeLink(project)}
          thumbnailURL={project.profilePicture? assist.getProfileImage(project):null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection user={user} provider={assist} data={project} contentsType={contentsType} isOwnPage={this.isOwnPage()} />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      </div>
    );
  }
}

ProjectContainer.propTypes = {
  project: PropTypes.object
};

function mapStateToProps(state) {
  return {
    project: state.project.project,
    user: state.user,
    param: state.param
  };
}

export default connect(mapStateToProps, {})(ProjectContainer);
