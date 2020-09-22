import React, { Component } from 'react';
import "./HomeFilterBox.scss";

class HomeFilterBox extends Component {
  state = { 
    originalResearchs: this.props.researchs,
    researchs: this.props.researchs
  }

  static defaultProps = {
    researchs: [],
    onFilter: (researchs) => null
  }

  
  filterBoxs = (label, value, ref) => {
    let newResearchs = this.state.originalResearchs.filter((research) => {
      if (!value) return true;
      return research[label].toString().includes(value.toString());
    });

    //reset other inputs and select tags
    let otherTags = [
      this.researchTitle,
      this.researchYear,
      this.researchDegree,
      this.researchCountry,
    ];

    for (let tag of otherTags) {
      if (tag !== ref) tag.value = "";  
    }

    this.setState({ researchs: newResearchs });
    this.props.onFilter(newResearchs);
  };


  render() { 
    let years = [...new Set(this.state.originalResearchs.map((r) => r.year))].sort();
    let degrees = [...new Set(this.state.originalResearchs.map((r) => r.degree))].sort();
    let countries = [...new Set(this.state.originalResearchs.map((r) => r.country))].sort();

    return ( 
      <div className="filter-box">
        <div className="search-box">
          <input ref={r => this.researchTitle = r} placeholder="ابحث هنا...." className="search-field" onChange={e => this.filterBoxs("title", e.target.value, this.researchTitle)}/>
          <button className="search-btn">ابحث</button>
        </div>
        <h4>فلترة</h4>
        <div className="select-boxs">
          <div className="select-box">
            <select ref={r => this.researchYear = r} onChange={e => this.filterBoxs("year", )}>
            <option value="">سنة البحث</option>
              {years.map((y, i) => <option key={i} value={y}>{y}</option>)}
            </select> 
            <span></span>
          </div>
          <div className="select-box">
          <select ref={r => this.researchDegree = r} >
            <option value="">الدرجة العلمية</option>
            {degrees.map((y, i) => <option key={i} value={y}>{y}</option>)}
            </select>
            <span></span>
          </div>
          <div className="select-box">
          <select ref={r => this.researchCountry = r} >
            <option value="">البلد</option>
            {countries.map((y, i) => <option key={i} value={y}>{y}</option>)}
            </select>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
 
export default HomeFilterBox;