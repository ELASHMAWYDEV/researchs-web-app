import React, { Component } from "react";
import "./Home.scss";
import { API } from "../../config/config";

//Components
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import HomeFilterBox from "../../components/HomeFilterBox/HomeFilterBox";
import ResearchBox from "../../components/ResearchBox/ResearchBox";
import PopupBox from "../../components/PopupBox/PopupBox";

class Home extends Component {

  state = {
    popupVisible: false,
    selectedResearch: {},
  };

  componentDidMount = () => {
    this.getResearchs();
  }

  
  getResearchs = async () => {
    try {

      let response = await fetch(`${API}/researchs/getResearchs`, {
        method: "post",
        mode: "no-cors",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });

      let researchs = await response.json();
      console.log(researchs);

    } catch (e) {
      console.log(e.message);
    }
  };

  showPopup = (research) => {
    this.setState({ popupVisible: true, selectedResearch: research });
  };

  closePopup = () => {
    this.setState({ popupVisible: false });
  };

  render() {
    return (
      <div className="home-container">
        {this.state.popupVisible && (
          <PopupBox
            research={this.state.selectedResearch}
            closePopup={this.closePopup}
          />
        )}
        <HomePageHeader />
        <HomeFilterBox />
        <h1 className="researchs-header">الأبحاث</h1>
        <ResearchBox showPopup={(research) => this.showPopup(research)} />
        <ResearchBox showPopup={(research) => this.showPopup(research)} />
        <ResearchBox showPopup={(research) => this.showPopup(research)} />
      </div>
    );
  }
}

export default Home;
