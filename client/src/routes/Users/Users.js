import React, { Component } from "react";
import axios from "axios";
import "./Users.scss";
import Cookie from "js-cookie";

//Components
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Notifier from "../../components/Notifier/Notifier";
import Loading from "../../components/Loading/Loading";

//Images
import deleteImage from "../../assets/img/delete.svg";
import editImage from "../../assets/img/edit.svg";

//get access token from cookie
let accessToken = Cookie.get("@access_token");

class Users extends Component {
  state = {
    isLoading: false,
    users: [],
    success: [],
    errors: [],
  };

  componentWillMount = () => {
    this.getUsers();
  };

  getUsers = async () => {
    this.setState({ isLoading: true });
    let response = await axios.post(
      `/users/getUsers`,
      {},
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
      this.setState({ users: data.users });
    }
    this.setState({ isLoading: false });
  };

  deleteUser = async (user) => {
    this.setState({ isLoading: true });

    let deleteUser = window.confirm(`هل تريد حقا حذف المستخدم ${user.username} ؟`);

    if (deleteUser) {
      let response = await axios.post(
        "/users/delete",
        { user },
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
        let newUsers = this.state.users.filter(u => u._id !== data.user._id);
        this.setState({ success: data.messages, users: newUsers });
      }
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
        <div className="users-container">
          <button className="add-new-btn">أضف مستخدم جديد</button>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>اسم المستخدم</th>
                  <th>المستوي</th>
                  <th>تاريخ الانشاء</th>
                  <th>أخر تسجيل دخول</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => (
                  <tr key={i}>
                    <td>{user.username}</td>
                    <td>{user.lvl}</td>
                    <td>{new Date(user.createdAt).toUTCString()}</td>
                    <td>{new Date(user.lastLogin).toUTCString()}</td>
                    <td>
                      <div className="imgs-container">
                        <img src={editImage} alt="تعديل" title="تعديل" />
                        <img
                          src={deleteImage}
                          alt="حذف"
                          title="حذف"
                          onClick={() => this.deleteUser(user)}
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

export default Users;
