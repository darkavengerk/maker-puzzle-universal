import React, { Component } from 'react';

class Refresh extends Component {

  componentDidMount() {
    console.log('Refresh...');
    window.opener.location.reload(false);
    window.close();
  }

  render() {
    console.log('render');
    return <div>To be closed</div>;
  }
}

export default Refresh;

