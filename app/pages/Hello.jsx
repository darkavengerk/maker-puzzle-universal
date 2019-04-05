import React, { Component } from 'react';
import Page from '../pages/Page';
import HelloContainer from '../containers/Hello';
import BrowserWarning from '../components/BrowserWarning';

class Hello extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'MakerPuzzle';
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
        <BrowserWarning />
        <HelloContainer {...this.props} />
      </Page>
    );
  }
}

export default Hello;

