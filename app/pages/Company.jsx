import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { company } = this.props;
    return company.name? company.name + ' | MakerPuzzle' : 'MakerPuzzle';
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

function mapStateToProps(state) {
  return {
    company: state.company.company,
    user: state.user
  };
}

export default connect(mapStateToProps, {})(Company);