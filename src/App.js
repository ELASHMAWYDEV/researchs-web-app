import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//routes
import { Login, Home, Dashboard } from "./routes/index";

import "./App.scss";

class App extends Component {

  state = {
    loggedIn: false,
  }


  

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/dashboard"
            render={(props) =>
              this.state.loggedIn ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
