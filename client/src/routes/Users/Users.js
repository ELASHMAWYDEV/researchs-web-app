import React, { Component } from "react";
import axios from "axios";
import "./Users.scss";

//Temporary
import users from "../../utility/users";

//Images
import deleteImage from "../../assets/img/delete.svg";
import editImage from "../../assets/img/edit.svg";


class Users extends Component {
  state = {
    users: users
  };


  componentDidMount = async () => {
    let users = await axios.post(`/users/getUsers`);
    console.log(await users.data);
  }

  render() {
    return (
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
                      <img src={deleteImage} alt="حذف" title="حذف" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

export default Users;
