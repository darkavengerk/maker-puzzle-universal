import React, { Component } from 'react';
import Page from '../pages/Page';
import PolicyContainer from '../containers/Policy';

class Policy extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Policy | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Policy page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <PolicyContainer {...this.props} />
      </Page>
    );
  }
}

export default Policy;

