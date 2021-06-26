import React, { PureComponent } from 'react'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './view/Login';
import SignUp from './view/SignUp';
import Users from './view/Users';
import WrapMainApp from './view/WrapMainApp';

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/signup"
            name="Signup Page"
            render={(props) => <SignUp {...props} />}
          />
          <WrapMainApp>
            <Route
              exact
              path="/"
              name="Users Page"
              render={(props) => <Users {...props} />}
            />
            <Route
              exact
              path="/users"
              name="Users Page"
              render={(props) => <Users {...props} />}
            />
          </WrapMainApp>
        </Switch>
      </Router>
    )
  }
}

export default App