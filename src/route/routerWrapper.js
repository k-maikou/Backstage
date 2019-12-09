import React, { Component } from 'react';

class RouterWrapper extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default RouterWrapper;
