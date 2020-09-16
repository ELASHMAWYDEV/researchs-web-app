import React, { Component } from 'react';
import "./HomeFilterBox.scss";

class HomeFilterBox extends Component {
  state = { 

  }
  render() { 
    return ( 
      <div className="filter-box">
        <div className="search-box">
          <input placeholder="ابحث هنا...." className="search-field"/>
          <button className="search-btn">ابحث</button>
        </div>
        <h4>فلترة</h4>
        <div className="select-boxs">
          <div className="select-box">
          <select>
            <option value="">سنة البحث</option>
            <option value="">سنة البحث</option>
            <option value="">سنة البحث</option>
            </select> 
            <span></span>
          </div>
          <div className="select-box">
          <select>
            <option value="">الدرجة العلمية</option>
            <option value="">الدرجة العلمية</option>
            <option value="">الدرجة العلمية</option>
            </select>
            <span></span>
          </div>
          <div className="select-box">
          <select>
            <option value="">البلد</option>
            <option value="">البلد</option>
            <option value="">البلد</option>
            </select>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
 
export default HomeFilterBox;