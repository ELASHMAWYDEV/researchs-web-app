import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./LoginBox.scss";

class LoginBox extends Component {
  state = {
    username: "",
    password: "",
  };

  static defaultProps = {
    submitForm: (username, password) => null
  }
  formHandler = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    this.setState({ username, password });
    this.props.submitForm(username, password);
  };

  render() {
    return (
      <div className="loginBoxContainer">
        <h2>{this.props.title}</h2>
        <span className="separator"></span>
        <form onSubmit={this.formHandler}>
          <div className="inputs">
            <input
              type="text"
              name="username"
              placeholder={this.props.placeholder}
            />
            <input type="password" name="password" placeholder="كلمة المرور"/>
          </div>
          <div className="submitBtnContainer">
            <button className="submitBtn" type="submit">
              {this.props.title}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

LoginBox.defaultProps = {
  placeholder: "اسم المستخدم",
  title: "تسجيل الدخول",
};

export default LoginBox;
