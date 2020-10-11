import React, { Component } from 'react';
import Routes from '../Routes'
import NavBar from '../components/navBar';
import { Container, Snackbar, Fab } from '@material-ui/core';

export default class Main extends Component {
  constructor() {
    super()
    console.log("MAIN Constructor")
  }

  render() {
    const { routes } = this.props
    return (
      <>
        <NavBar routes={routes} />

        <Routes routes={routes} />
      </>
    );
  }
}