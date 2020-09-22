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
    isLoading: false,
    popupVisible: false,
    selectedResearch: {},
    errors: [],
    researchs: [],
  };

  componentDidMount = () => {
    this.getResearchs();
  };

  getResearchs = async () => {
    this.setState({ isLoading: true });
    let response = await axios.post("/researchs/getResearchs");

    let data = await response.data;
    if (!data.success) {
      this.setState({ errors: data.errors });
    } else {
      this.setState({ researchs: data.researchs });
    }
    this.setState({ isLoading: false });
  };

  showPopup = (research) => {
    this.setState({ popupVisible: true, selectedResearch: research });
  };

  closePopup = () => {
    this.setState({ popupVisible: false });
  };

  render() {
    let researchs = this.state.researchs;
    return (
      <div className="home-container">
        {this.state.isLoading && <Loading />}

        {this.state.popupVisible && (
          <PopupBox
            research={this.state.selectedResearch}
            closePopup={this.closePopup}
          />
        )}
        <HomePageHeader />
        <HomeFilterBox
          researchs={researchs}
          onFilter={(researchs) => this.setState({ researchs })}
        />
        <h1 className="researchs-header">الأبحاث</h1>
        {this.state.researchs.map((research, i) => (
          <ResearchBox
            key={i}
            research={research}
            showPopup={(research) => this.showPopup(research)}
          />
        ))}
      </div>
    );
  }
}

export default Home;
