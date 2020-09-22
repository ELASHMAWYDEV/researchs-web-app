import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookie from "js-cookie";

//routes
import {
  Login,
  Home,
  Users,
  Researchs,
  Settings,
  NotFound,
} from "./routes/index";

import "./App.scss";

//get access token from cookie
let accessToken = Cookie.get("@access_token");

class App extends Component {
  state = {
    loggedIn: false,
  };

  componentDidMount = () => {
    //check if user is logged

    if (!accessToken) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  };

  render() {
    let isLoggedIn = this.state.loggedIn;
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact render={props => isLoggedIn ? <Redirect to="/dashboard/researchs" /> : <Login {...props}/>} />
          <Route path="/dashboard/researchs" render={props => !isLoggedIn ? <Redirect to="/login" /> : <Researchs {...props} />} />
          <Route path="/dashboard/users" render={props => !isLoggedIn ? <Redirect to="/login" /> : <Users {...props} />} />
          <Route path="/dashboard/settings" render={props => !isLoggedIn ? <Redirect to="/login"/> : <Settings {...props} />} />
          <Route
            path="/dashboard"
            render={() => <Redirect to="/login" />}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
