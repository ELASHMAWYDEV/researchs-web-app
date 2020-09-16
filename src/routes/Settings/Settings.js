import React, { Component } from 'react';
import "./Settings.scss";

//Compontents
import SettingsOption from "../../components/SettingsOption/SettingsOption";


class Settings extends Component {
  state = {  

  }
  render() { 
    return (  
      <div className="settings-container">
        <div className="settings-box">
          <SettingsOption label="عنوان الموقع" placeholder="عنوان الموقع" onChange={value => null}/>
          <SettingsOption label="كلمات البحث" placeholder="اكتب كلمات البحث مع وضع فاصلة بين كل كلمة" onChange={value => null}/>
          <SettingsOption label="رقم الواتساب" placeholder="رقم الواتساب" onChange={value => null}/>
          <SettingsOption label="رقم التلجرام" placeholder="رقم التلجرام" onChange={value => null}/>
          <SettingsOption label="البريد الالكتروني" placeholder="البريد الالكتروني" onChange={value => null}/>
          <button className="save-btn">حفظ الإعدادات</button>
        </div>
      </div>
    );
  }
}
 
export default Settings;