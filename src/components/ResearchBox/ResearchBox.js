import React, { Component } from "react";
import "./ResearchBox.scss";

class ReseachBox extends Component {
  state = {};

  static defaultProps = {
    research: {
      id: 15675,
      title: "هذا النص يمثل عنوان البحث ويمكن تغييره",
      description: `هذا مثال لنص يمكن استبداله وهو يعبر عن تفاصيل البحث ، ويرجي الوضع في الاعتبار أن هذه الألوان ليست الا مجرد ألوان غير حيوية لتوضيح فكرة
      التصميم لا أكثر هذا مثال لنص يمكن استبداله وهو يعبر عن تفاصيل البحث ، ويرجي الوضع في الاعتبار أن هذه الألوان ليست الا مجرد ألوان غير حيوية 
      لتوضيح فكرة`,
      year: 2019,
      degree: "دكتوراه",
      country: "السعودية",
    },
    showPopup: (research) => null,
  };


  showPopup = (research) => {
    this.props.showPopup(research);
  }

  render() {
    let research = this.props.research;
    return (
      <div className="research-box">
        <div className="head-wrapper">
          <div className="title-container">
            <p>عنوان البحث</p>
            <h1>{research.title}</h1>
          </div>
          <div className="id-container">
            <p>رقم البحث</p>
            <h3>#{research.id}</h3>
          </div>
        </div>
        <div className="description-container">
          <p>تفاصيل البحث</p>
          <h4>{research.description}</h4>
        </div>
        <div className="footer-wrapper">
            <div>
              <h5>السنة : </h5>
              <h5>{research.year}</h5>
            </div>
            <div>
              <h5>الدرجة العلمية : </h5>
              <h5>{research.degree}</h5>
            </div>
            <div>
              <h5>البلد : </h5>
              <h5>{research.country}</h5>
            </div>
          <button className="get-btn" onClick={() => this.showPopup(research)}>طلب البحث</button>
        </div>
      </div>
    );
  }
}

export default ReseachBox;
