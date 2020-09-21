import React, { Component } from 'react';
import "./HomePageHeader.scss";
import { Link } from 'react-router-dom';

class HomePageHeader extends Component {
  state = { 
    // logoUrl: "https://www.ab7asy.com/images/all%20images/Ab7asy%20Logo-088.png",
    title: "أبحاثي"
  }
  render() { 
    return ( 
      <div className="HomeHeader">
        {this.state.logoUrl ? (
          <div className="LogoContainer">
            <img src={this.state.logoUrl} alt={this.state.title} className="Logo"/>
          </div>
        ) : (
            <h1 className="Title">{this.state.title}</h1>
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