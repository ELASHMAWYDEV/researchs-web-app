import React, { Component } from "react";
import "./Settings.scss";
import axios from "axios";
import Cookie from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

//Compontents
import SettingsOption from "../../components/SettingsOption/SettingsOption";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loading from "../../components/Loading/Loading";
import Notifier from "../../components/Notifier/Notifier";


//get access token from cookie
let accessToken = Cookie.get("@access_token");

class Settings extends Component {
  state = {
    isLoading: false,
    settings: {},
    errors: [],
    success: [],
  };

  componentWillMount = () => {
    this.getSettings();
  };

  getSettings = async () => {
    this.setState({ isLoading: true });

    let response = await axios.post("/settings/get");
    let data = await response.data;

    if (data.success) {
      const {
        websiteTitle,
        keywords,
        whatsappNumber,
        telegramNumber,
        email,
        logoUrl,
      } = data.settings;
      this.setState({
        websiteTitle,
        keywords,
        whatsappNumber,
        telegramNumber,
        email,
        logoUrl,
      });
    } else {
      this.setState({ errors: data.errors });
    }

    this.setState({ isLoading: false });
  };

  saveSettings = async () => {
    this.setState({ isLoading: true });

    let formData = new FormData();
    formData.append("logoImage", this.state.logoImage);
    formData.append("websiteTitle", this.state.websiteTitle);
    formData.append("keywords", this.state.keywords);
    formData.append("whatsappNumber", this.state.whatsappNumber);
    formData.append("telegramNumber", this.state.telegramNumber);
    formData.append("email", this.state.email);

    let response = await axios.post("/settings/edit", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let data = await response.data;

    if (data.success) {
      const {
        websiteTitle,
        keywords,
        whatsappNumber,
        telegramNumber,
        email,
      } = data.settings;
      this.setState({
        success: data.messages,
        websiteTitle,
        keywords,
        whatsappNumber,
        telegramNumber,
        email,
      });
    } else {
      this.setState({ errors: data.errors });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
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
        <DashboardHeader />
        <div className="settings-container">
          <div className="settings-box">
            <SettingsOption
              label="عنوان الموقع"
              placeholder="عنوان الموقع"
              onChange={(websiteTitle) => this.setState({ websiteTitle })}
              value={this.state.websiteTitle}
            />
            <div className="logoUpload">
              <div className="label">صورة الموقع</div>
              <label htmlFor="logoUpload">
                <FontAwesomeIcon icon={faPaperclip} />
                <div>رفع الصورة</div>
              </label>
              <input
                type="file"
                accept=".png, .jpg, .gif"
                id="logoUpload"
                onChange={(e) =>
                  this.setState({ logoImage: e.target.files[0] })
                }
              />
              {this.state.logoUrl && (
                <div className="current-image">
                  <button
                    className="remove-image"
                    onClick={() =>
                      this.setState({
                        logoImage: null,
                        logoUrl: null,
                      })
                    }
                  >
                    حذف
                  </button>
                  <p>الصورة الحالية</p>
                  <img
                    src={this.state.logoUrl}
                    alt="logo"
                    className="logo-icon"
                  />
                </div>
              )}
            </div>
            <SettingsOption
              label="كلمات البحث"
              placeholder="اكتب كلمات البحث مع وضع فاصلة بين كل كلمة"
              onChange={(keywords) => this.setState({ keywords })}
              value={this.state.keywords}
            />
            <SettingsOption
              label="رقم الواتساب"
              placeholder="رقم الواتساب"
              onChange={(whatsappNumber) => this.setState({ whatsappNumber })}
              value={this.state.whatsappNumber}
            />
            <SettingsOption
              label="رقم التلجرام"
              placeholder="رقم التلجرام"
              onChange={(telegramNumber) => this.setState({ telegramNumber })}
              value={this.state.telegramNumber}
            />
            <SettingsOption
              label="البريد الالكتروني"
              placeholder="البريد الالكتروني"
              onChange={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <button className="save-btn" onClick={this.saveSettings}>
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Settings;
