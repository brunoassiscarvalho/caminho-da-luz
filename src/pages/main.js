import React, { Component } from 'react';
import Routes from '../Routes'
import NavBar from '../components/navBar';

export default class Main extends Component {

  render() {
    const { routes } = this.props
    return (
      <>
        <NavBar/>
        <Routes routes={routes} />
      </>
    );
  }
}