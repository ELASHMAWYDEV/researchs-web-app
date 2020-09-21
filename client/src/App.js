import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";

//routes
import { Login, Home, Dashboard } from "./routes/index";

import "./App.scss";

class App extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount = () => {

    //check if user is logged
    //get access token from cookie
    let accessToken = Cookie.get("@access_token");

    if (!accessToken) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });

    }
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
