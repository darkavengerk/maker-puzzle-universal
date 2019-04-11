import React, { Component } from 'react';
import Page from '../pages/Page';
import AccountContainer from '../containers/Account';

class Policy extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Account | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Account page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AccountContainer {...this.props} />
      </Page>
    );
  }
}

export default Policy;

