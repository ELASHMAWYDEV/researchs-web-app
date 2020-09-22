import React, { Component } from "react";
import "./Researchs.scss";
import axios from "axios";
import Cookie from "js-cookie";

//Components
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loading from "../../components/Loading/Loading";
import Notifier from "../../components/Notifier/Notifier";

//Images
import deleteImage from "../../assets/img/delete.svg";
import editImage from "../../assets/img/edit.svg";

//get access token from cookie
let accessToken = Cookie.get("@access_token");

class Researchs extends Component {
  state = {
    isLoading: false,
    researchs: [],
    filteredResearchs: [],
    success: [],
    errors: [],
    years: [2019, 2018, 2020],
    degrees: ["دكتوراه", "ماجستير"],
    countries: ["مصر", "السعودية"],
  };

  componentDidMount = () => {
    this.getResearchs();
  };

  getResearchs = async () => {
    this.setState({ isLoading: true });
    let response = await axios.post(`/researchs/getResearchs`);

    let data = await response.data;
    if (!data.success) {
      this.setState({ errors: data.errors });
    } else {
      this.setState({
        researchs: data.researchs,
        filteredResearchs: data.researchs,
      });
    }
    this.setState({ isLoading: false });
  };

  filterTable = (label, value, ref) => {
    let filteredResearchs = this.state.researchs.filter((research) => {
      if (!value) return true;
      return research[label].toString().includes(value.toString());
    });

    //reset other inputs and select tags
    let otherTags = [
      this.researchId,
      this.researchTitle,
      this.researchYear,
      this.researchDegree,
      this.researchCountry,
    ];

    for (let tag of otherTags) {
      if (tag !== ref) tag.value = "";
    }

    this.setState({ filteredResearchs });
  };

  deleteResearch = async (research) => {
    const deleteResearch = window.confirm(
      `هل تريد حقا حذف البحث رقم ${research.index}`
    );

    if (!deleteResearch) return;

    this.setState({ isLoading: true });

    let response = await axios.post(
      `/researchs/delete`,
      {
        research,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data = await response.data;
    if (!data.success) {
      this.setState({ errors: data.errors });
    } else {
      let newResearchs = this.state.researchs.filter(
        (r) => data.research._id != r._id
      );
      this.setState({
        success: data.messages,
        researchs: newResearchs,
        filteredResearchs: newResearchs,
      });
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
        <div className="researchs-container">
          <button className="add-new-btn">أضف بحث جديد</button>
          <div className="filter-container">
            <h3>فلترة</h3>
            <div className="filters">
              <input
                type="number"
                placeholder="# رقم البحث"
                onChange={(e) =>
                  this.filterTable("index", e.target.value, this.researchId)
                }
                ref={(el) => (this.researchId = el)}
              />
              <input
                type="text"
                placeholder="عنوان البحث"
                onChange={(e) =>
                  this.filterTable("title", e.target.value, this.researchTitle)
                }
                ref={(el) => (this.researchTitle = el)}
              />
              <div className="select-box">
                <select
                  onChange={(e) =>
                    this.filterTable("year", e.target.value, this.researchYear)
                  }
                  ref={(el) => (this.researchYear = el)}
                >
                  <option value="">السنة</option>
                  {this.state.years.sort().map((y, i) => (
                    <option key={i} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <span></span>
              </div>
              <div className="select-box">
                <select
                  onChange={(e) =>
                    this.filterTable(
                      "degree",
                      e.target.value,
                      this.researchDegree
                    )
                  }
                  ref={(el) => (this.researchDegree = el)}
                >
                  <option value="">الدرجة العلمية</option>
                  {this.state.degrees.sort().map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span></span>
              </div>
              <div className="select-box">
                <select
                  onChange={(e) => this.filterTable("country", e.target.value)}
                  ref={(el) => (this.researchCountry = el)}
                >
                  <option value="">البلد</option>
                  {this.state.countries.sort().map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span></span>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>رقم البحث</th>
                  <th>عنوان البحث</th>
                  <th>السنة</th>
                  <th>الدرجة العلمية</th>
                  <th>البلد</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredResearchs.map((research, i) => (
                  <tr key={i}>
                    <td># {research.index}</td>
                    <td>{research.title}</td>
                    <td>{research.year}</td>
                    <td>{research.degree}</td>
                    <td>{research.country}</td>
                    <td>
                      <div className="imgs-container">
                        <img src={editImage} alt="تعديل" title="تعديل" />
                        <img
                          src={deleteImage}
                          alt="حذف"
                          title="حذف"
                          onClick={() => this.deleteResearch(research)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Researchs;
