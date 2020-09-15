import React, { Component } from "react";
import LoginBox from "../../components/LoginBox/LoginBox";
import { Link } from "react-router-dom";

import "./Login.scss";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="loginContainer">
        <LoginBox />
      </div>
    );
  }
}

export default Login;
