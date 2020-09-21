import React, { Component } from "react";
import "./DashboardHeader.scss";
import { Link, Redirect } from "react-router-dom";
import Cookie from "js-cookie";

class DashboardHeader extends Component {
  state = {
    active: "researchs",
    loggedIn: true,
  };

  changeActive = (tabName) => {
    this.setState({ active: tabName });
  };

  componentDidMount = () => {
    this.changeActive(window.location.pathname.split("/").pop());
  };

  logout = () => {
    //remove the user & access token
    Cookie.remove("@user");
    Cookie.remove("@access_token");
    console.log("logged out")
    this.setState({ loggedIn: false });
  };

  render() {
    return (
      <div className="dashboard-header">
        {!this.state.loggedIn && <Redirect push to="/" />}
        <div className="tabs-container">
          <Link
            to={`/dashboard/settings`}
            className={
              this.state.active == "settings" ? "active-tab" : undefined
            }
            onClick={() => this.changeActive("settings")}
          >
            الإعدادات
          </Link>
          <Link
            to={`/dashboard/researchs`}
            className={
              this.state.active == "researchs" ? "active-tab" : undefined
            }
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
        <div className="logout-container">
          <button className="logout-btn" onClick={() => this.logout()}>
            تسجيل الخروج
          </button>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
