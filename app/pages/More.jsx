import React, { Component } from 'react';
import Page from '../pages/Page';
import MoreContainer from '../containers/More';

class More extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Main | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Main page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <MoreContainer {...this.props} />
      </Page>
    );
  }
}

export default More;

