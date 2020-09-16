import React, { Component } from "react";
import "./Dashboard.scss";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
//Compontents
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

//routes
import { Users, Researchs, Settings } from "../../routes/index";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Redirect to="/dashboard/researchs" />
        <DashboardHeader />
        <Switch>
          <Route path="/dashboard/researchs" component={Researchs} />
          <Route path="/dashboard/users" component={Users} />
          <Route path="/dashboard/settings" component={Settings} />
        </Switch>
      </Router>
    );
  }
}

export default Dashboard;
