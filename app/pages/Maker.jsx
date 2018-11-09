import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { maker } = this.props;
    return maker.name? maker.name + ' | MakerPuzzle' : 'MakerPuzzle';
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

function mapStateToProps(state) {
  return {
    maker: state.maker.maker,
    user: state.user
  };
}

export default connect(mapStateToProps, {})(Maker);

