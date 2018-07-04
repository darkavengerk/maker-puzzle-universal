import React, { Component } from 'react';
import Page from '../pages/Page';
import CompanyContainer from '../containers/Company';

class Company extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Company | MakerPuzzle';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Company page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <CompanyContainer {...this.props} />
      </Page>
    );
  }
}

export default Company;

