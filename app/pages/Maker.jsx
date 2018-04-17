import React, { Component } from 'react';
import Page from '../pages/Page';
import MakerContainer from '../containers/Maker';

class Maker extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Maker | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Maker page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <MakerContainer {...this.props} />
      </Page>
    );
  }
}

export default Maker;

