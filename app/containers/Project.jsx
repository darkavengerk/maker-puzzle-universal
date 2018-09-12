import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import { Project } from '../utils/objects';

import styles from '../css/components/maker';

const cx = classNames.bind(styles);

class ProjectContainer extends Component {
  render() {
    const { project: data, user, param } = this.props;
    const project = new Project(data);
    const contentsType = (param.mid && param.pid) ? 'project_maker' : 'project';
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={project.getName()}
          to={project.getHomeLink()}
          thumbnailURL={project.profileImage? project.getProfileImage():null} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection user={user} owner={project} contentsType={contentsType} isOwnPage={false} />
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
