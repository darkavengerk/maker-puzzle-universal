import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import ImageUploader from '../components/ImageUploader';
import TopTitle from '../components/TopTitle';
import ContentsSection from '../components/ContentsSection';
import SingleLine from '../components/SingleLine';
import styles from '../css/components/maker';

const cx = classNames.bind(styles);

class Project extends Component {
  render() {
    const { project, user, param } = this.props;
    const contentsType = (param.mid && param.pid) ? 'project_maker' : 'project';
    return (
      <div className={cx('main-section')}>
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <TopTitle 
          title={project.name}
          to={'/project/' + project.link_name}
          thumbnailURL={project.profile? project.profile.picture : '/images/site/def_project.png'} 
        />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
        <ContentsSection owner={project} contentsType={contentsType} isOwnPage={false} />
        <SingleLine width={'100%'} color={'#dddddd'} thickness={2} />
      </div>
    );
  }
}

Project.propTypes = {
  project: PropTypes.object
};

function mapStateToProps(state) {
  return {
    project: state.project.project,
    user: state.user.account,
    param: state.param
  };
}

export default connect(mapStateToProps, {})(Project);
