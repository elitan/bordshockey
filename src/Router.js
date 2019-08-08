import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import client from './apollo/client';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <ApolloProvider client={client}>
            <Route
              exact
              path="/"
              render={(props) => (
                <Dashboard {...props} />
              )}
            />
          </ApolloProvider>

          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} />
            )}
          />

        </Switch>
      </Router>
    );
  }
}
export default RouterComponent;
