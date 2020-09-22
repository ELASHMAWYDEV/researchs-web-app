import React, { Component } from "react";
import "./NotFound.scss";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <div className="not-found-container">
        <h1>الصفحة غير موجودة <span>404</span></h1>
        <Link to="/" className="go-home-btn">
            الرئيسية
          </Link>
      </div>
    );
  }
}

export default NotFound;
