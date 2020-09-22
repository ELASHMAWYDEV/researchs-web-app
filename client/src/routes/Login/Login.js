import React, { Component } from "react";
import LoginBox from "../../components/LoginBox/LoginBox";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import "./Login.scss";
import Notifier from "../../components/Notifier/Notifier";

class Login extends Component {
  state = {
    errors: [],
    success: [],
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
  
  submitForm = async (username, password) => {
    //get access token from cookie
    let accessToken = Cookie.get("@access_token");
    // console.log(accessToken);
    let response = await axios.post(
      `/auth/login`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data = await response.data;

    //check if response succeeded
    if (!data.success) {
      this.setState({ errors: data.errors });
      return;
    } else {
      this.setState({
        success: [...data.messages, "جاري توجيهك الي لوحة التحكم..."],
      });

      //Store the JWT token in cookie
      Cookie.set("@access_token", data.user.accessToken, { expires: 1 });
      //delete accessToken from user Object
      delete data.user.accessToken;

      //Store user information in cookie
      Cookie.set("@user", data.user, {expires: 1});

      setTimeout(() => {
        this.setState({ loggedIn: true });
      }, 1000);
    }
  };

  render() {
    return (
      <div className="loginContainer">
        {this.state.loggedIn && <Redirect to="/dashboard/researchs" />}
        {this.state.errors.length !== 0 && (
          <Notifier
            messages={this.state.errors}
            type={false}
            onDone={() => this.setState({ errors: [] })}
          />
        )}
        {this.state.success.length !== 0 && (
          <Notifier
            messages={this.state.success}
            type={true}
            onDone={() => this.setState({ success: [] })}
          />
        )}
        <LoginBox
          submitForm={(username, password) =>
            this.submitForm(username, password)
          }
        />
        <Link to="/" className="go-home-btn">
          الصفحة الرئيسية
        </Link>
      </div>
    );
  }
}

export default Login;
