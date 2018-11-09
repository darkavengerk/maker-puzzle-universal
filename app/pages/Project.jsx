import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../pages/Page';
import ProjectContainer from '../containers/Project';

class Project extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    const { project } = this.props;
    return project.name? project.name + ' | MakerPuzzle' : 'MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Project page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ProjectContainer {...this.props} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project.project,
    user: state.user
  };
}

export default connect(mapStateToProps, {})(Project);
