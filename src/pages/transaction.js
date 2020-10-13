import React, { Component } from 'react';

import Routes from "../Routes"

export default class Transaction extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { routes, context } = this.props;
    return (

      <Routes routes={routes} context={context} />

    );
  }
}