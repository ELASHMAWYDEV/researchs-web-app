import React, { Component } from "react";
import "./HomePageHeader.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";

class HomePageHeader extends Component {
  state = {
    logoUrl: "",
    title: "أبحاثي",
    keywords: "",
  };

  componentWillMount = () => {
    this.getTitleAndKeywords();
  };

  getTitleAndKeywords = async () => {
    let response = await axios.post("/settings/get");

    let data = await response.data;
    if (data.success) {
      const settings = data.settings;
      this.setState({
        title: settings.websiteTitle,
        keywords: settings.keywords,
        logoUrl: settings.logoUrl,
        description: settings.description,
      });
    }
  };

  render() {
    return (
      <div className="HomeHeader">
        <Helmet>
          <title>{this.state.title}</title>
          <meta name="description" content={this.state.description} />
          <meta name="keywords" content={this.state.keywords} />
        </Helmet>
        {this.state.logoUrl ? (
          <div className="LogoContainer">
            <img
              src={this.state.logoUrl}
              alt={this.state.title}
              className="Logo"
            />
          </div>
        ) : (
          <Link to="/" className="Title">
            {this.state.title}
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
