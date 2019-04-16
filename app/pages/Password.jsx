import React, { Component } from 'react';
import Page from '../pages/Page';
import PasswordContainer from '../containers/Password';

class Password extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Password | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Password page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <PasswordContainer {...this.props} />
      </Page>
    );
  }
}

export default Password;

