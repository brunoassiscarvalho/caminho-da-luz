import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

export default class Routes extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { routes, children } = this.props;
    return (
      <>
        <div>
          {children}
        </div>
        {routes &&          
              <Switch>
                {this.listRoutes(routes)}              
              </Switch>
           
        }
      </>
    )

  }
  listRoutes(routes) {
    const listItems = routes.map((route) => {
      route.context = routes.context;
      return (
        <Route
        exact={route.exact?route.exact:false}
          path={route.path}
          render={props => (
            <route.component {...props}{...route} />
          )}
        />
      )
    }
    );
    listItems.push(<Route>
      
    </Route>)
    return (listItems);
  }
}