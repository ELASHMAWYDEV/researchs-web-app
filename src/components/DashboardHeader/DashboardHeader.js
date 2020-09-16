import React, { Component } from "react";
import "./DashboardHeader.scss";
import { Link } from "react-router-dom";

class DashboardHeader extends Component {
  state = {
    active: "researchs",
  };

  changeActive = (tabName) => {
    this.setState({ active: tabName });
  };

  componentDidMount = () => {
    this.changeActive(window.location.pathname.split("/").pop());
  }


  render() {
    return (
      <div className="dashboard-header">
        <Link
          to={`/dashboard/settings`}
          className={this.state.active == "settings" ? "active-tab" : undefined}
          onClick={() => this.changeActive("settings")}
        >
          الإعدادات
        </Link>
        <Link
          to={`/dashboard/researchs`}
          className={this.state.active == "researchs" ? "active-tab" : undefined}
          onClick={() => this.changeActive("researchs")}
        >
          الأبحاث
        </Link>
        <Link
          to={`/dashboard/users`}
          className={this.state.active == "users" ? "active-tab" : undefined}
          onClick={() => this.changeActive("users")}
        >
          المستخدمين
        </Link>
      </div>
    );
  }
}

export default DashboardHeader;
