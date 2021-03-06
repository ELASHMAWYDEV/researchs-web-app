import React, { Component } from "react";
import "./Home.scss";
import axios from "axios";

//Components
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import HomeFilterBox from "../../components/HomeFilterBox/HomeFilterBox";
import ResearchBox from "../../components/ResearchBox/ResearchBox";
import PopupBox from "../../components/PopupBox/PopupBox";
import Loading from "../../components/Loading/Loading";

class Home extends Component {
  state = {
    settings: {},
    isLoading: false,
    popupVisible: false,
    selectedResearch: {},
    errors: [],
    researchs: [],
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await this.getResearchs();
    await this.getWebsiteSettings();
    this.setState({ isLoading: false });
  };

  getResearchs = async () => {
    let response = await axios.post("/researchs/getResearchs");

    let data = await response.data;
    if (!data.success) {
      this.setState({ errors: data.errors });
    } else {
      this.setState({ researchs: data.researchs });
    }
  };

  showPopup = (research) => {
    this.setState({ popupVisible: true, selectedResearch: research });
  };

  closePopup = () => {
    this.setState({ popupVisible: false });
  };

  getWebsiteSettings = async () => {
    let response = await axios.post("/settings/get");

    let data = await response.data;
    if (!data.success) {
      this.setState({ errors: data.errors });
    } else {
      this.setState({ settings: data.settings });
    }
  };

  render() {
    let researchs = this.state.researchs;
    let settings = this.state.settings;
    return (
      <div className="home-container">
        {this.state.isLoading && <Loading />}

        {this.state.popupVisible && (
          <PopupBox
            research={this.state.selectedResearch}
            closePopup={this.closePopup}
            email={this.state.settings.email}
            whatsappNumber={settings.whatsappNumber}
            telegramNumber={settings.telegramNumber}
          />
        )}
        <HomePageHeader
          logoUrl={settings.logoUrl}
          websiteTitle={settings.websiteTitle}
          keywords={settings.keywords}
          description={settings.description}
        />
        <HomeFilterBox
          researchs={researchs}
          onFilter={(researchs) => this.setState({ researchs })}
        />
        <h1 className="researchs-header">الأبحاث</h1>
        {this.state.researchs.map((research, i) => (
          <ResearchBox
            key={i}
            research={research}
            index={i + 1}
            showPopup={(research) => this.showPopup(research)}
          />
        ))}
      </div>
    );
  }
}

export default Home;
