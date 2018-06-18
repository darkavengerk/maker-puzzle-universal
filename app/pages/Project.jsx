import React, { Component } from 'react';
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
    return 'Project | MakerPuzzle';
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

export default Project;

