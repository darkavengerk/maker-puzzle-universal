import React, { Component } from 'react';
import Page from '../pages/Page';
import HelloContainer from '../containers/Hello';

class Hello extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Hello | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Hello!' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <HelloContainer {...this.props} />
      </Page>
    );
  }
}

export default Hello;

