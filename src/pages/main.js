import React, { Component } from 'react';
import Routes from '../Routes'
import NavBar from '../components/navBar';

export default class Main extends Component {

  render() {
    const { routes, validateRoute } = this.props
    console.log("caminhoDaLuz-status",sessionStorage.getItem("caminhoDaLuz-status"), validateRoute)
    return (
      <>
        <NavBar />
        {sessionStorage.getItem("caminhoDaLuz-status") == 10 && <Routes routes={routes} />}
        {sessionStorage.getItem("caminhoDaLuz-status") == 0 && <Routes routes={validateRoute} />}
      </>
    );
  }
}