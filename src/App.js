import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";


//routes
import {
  Login,
  Home
} from "./routes/index";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login}/>
          <Route path="/dashboard/researchs" exact />
          <Route path="/dashboard/users" exact />
          <Route path="/dashboard/settings" exact/>
        </Switch>
      </Router>
    );
  }
}

export default App;
