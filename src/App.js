import React, { Component } from "react";
import Routes from './Routes'
import {
  BrowserRouter as Router,

} from "react-router-dom";

import routes from "./RouteConfig"

export default class App extends Component {

  render() {
    return (
      <Router>
        <Routes routes={routes} />
      </Router>)
  }
}