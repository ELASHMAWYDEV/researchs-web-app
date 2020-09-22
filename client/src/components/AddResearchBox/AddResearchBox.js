import React, { Component } from "react";
import "./AddResearchBox.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookie from "js-cookie";

//Components
import Notifier from "../../components/Notifier/Notifier";
import Loading from "../../components/Loading/Loading";

//get access token from cookie
let accessToken = Cookie.get("@access_token");

class AddResearchBox extends Component {
  state = {
    visible: true,
    success: [],
    errors: [],
    isLoading: false,
  };

  static defaultProps = {
    closeAddBox: () => null,
  };

  componentDidMount = () => {
    window.addEventListener("mouseup", this.closeBox);
  };
  componentWillUnmount = () => {
    window.removeEventListener("mouseup", this.closeBox);
  };

  closeBox = (event) => {
    if (event && !this.box.contains(event.target)) {
      this.setState({ visible: false });
      this.props.closeAddBox();
    } else if (event === "icon") {
      this.setState({ visible: false });
      this.props.closeAddBox();
    }
  };

  addResearch = async () => {
    this.setState({ isLoading: true });

    let formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("details", this.state.details);
    formData.append("year", this.state.year);
    formData.append("degree", this.state.degree);
    formData.append("country", this.state.country);

    let response = await axios.post("/researchs/add", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let data = await response.data;
    if (!data.success) {
    } else {
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      this.state.visible && (
        <>
          {this.state.isLoading && <Loading />}
          {this.state.errors.length !== 0 && (
            <Notifier
              messages={this.state.errors}
              type={false}
              onDone={() => this.setState({ errors: [] })}
            />
          )}
          {this.state.success.length !== 0 && (
            <Notifier
              messages={this.state.success}
              type={true}
              onDone={() => this.setState({ success: [] })}
            />
          )}
          <div className="add-research-container">
            <div className="box" ref={(b) => (this.box = b)}>
              <AiFillCloseCircle
                className="close-icon"
                onClick={() => this.closeBox("icon")}
              />
              <h3>اضافة بحث جديد</h3>
              <div className="inputs">
                <div>
                  <label>العنوان</label>
                  <input
                    type="text"
                    placeholder="العنوان"
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                </div>
                <div>
                  <label>التفاصيل</label>
                  <textarea
                    placeholder="التفاصيل"
                    onChange={(e) => this.setState({ details: e.target.value })}
                  />
                </div>
                <div>
                  <label>السنة</label>
                  <input
                    type="number"
                    placeholder="السنة"
                    max="2021"
                    onChange={(e) => this.setState({ year: e.target.value })}
                  />
                </div>
                <div>
                  <label>الدرجة العلمية</label>
                  <input
                    type="text"
                    placeholder="الدرجة العلمية"
                    onChange={(e) => this.setState({ degree: e.target.value })}
                  />
                </div>
                <div>
                  <label>البلد</label>
                  <input
                    type="text"
                    placeholder="البلد"
                    onChange={(e) => this.setState({ country: e.target.value })}
                  />
                </div>
                <div className="fileUpload">
                  <label>رفع الملف</label>
                  <label
                    htmlFor="fileUpload"
                    style={{
                      backgroundColor: this.state.filr && "#57C770",
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperclip} />
                    <div>
                      {this.state.file ? "تم اختيار الملف" : "اختيار الملف"}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="fileUpload"
                    onChange={(e) => this.setState({ file: e.target.files[0] })}
                  />
                </div>
              </div>
              <button className="add-btn" onClick={this.addResearch}>
                إضافة
              </button>
            </div>
          </div>
        </>
      )
    );
  }
}

export default AddResearchBox;
