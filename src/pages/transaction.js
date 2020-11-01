import React, { Component } from 'react';
import {Container} from '@material-ui/core'

import Routes from "../Routes"

export default class Transaction extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { routes, context } = this.props;
    return (
      <Container style={{ paddingTop: 40, paddingBottom: 100 }}>
        <Routes routes={routes} context={context} />
      </Container>

    );
  }
}