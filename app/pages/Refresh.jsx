import React, { Component } from 'react';

class Refresh extends Component {

  componentDidMount() {
    window.opener.location.reload(false);
    window.close();
  }

  render() {
    return <div>To be closed</div>;
  }
}

export default Refresh;

