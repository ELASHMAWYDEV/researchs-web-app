import React, { Component } from "react";
import "./HomePageHeader.scss";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

class HomePageHeader extends Component {



  render() {
    return (
      <div className="HomeHeader">
        <Helmet>
          <title>{this.props.websiteTitle}</title>
          <meta name="description" content={this.props.description} />
          <meta name="keywords" content={this.props.keywords} />
        </Helmet>
        {this.props.logoUrl ? (
          <div className="LogoContainer">
            <img
              src={this.props.logoUrl}
              alt={this.props.websiteTitle || "أبحاثي"}
              className="Logo"
            />
          </div>
        ) : (
          <Link to="/" className="Title">
            {this.props.websiteTitle || "أبحاثي"} 
          </Link>
        )}
        <div className="Left-links">
          <Link to="/">كيف أحصل علي البحث </Link>
          <Link to="/">شروط الاستخدام </Link>
          <Link to="/">سياسة الخصوصية </Link>
        </div>
      </div>
    );
  }
}

export default HomePageHeader;
