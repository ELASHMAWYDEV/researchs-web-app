import React, { Component } from 'react';
import "./SettingsOption.scss";


class SettingsOption extends Component {
  state = {
    value: this.props.value
  }

  static defaultProps = {
    label: "الإعداد",
    placeholder: "الإعداد",
    type: "text",
    value: "",
    onChange: (value) => null,
  }

  onChange = (value) => {
    this.props.onChange(value);
    this.setState({ value });
  }
  render() { 
    return (  
      <div className="settings-option">
        <div className="label">{this.props.label}</div>
        <input placeholder={this.props.placeholder} type={this.props.type} value={this.state.value} onChange={e => this.onChange(e.target.value)}/>
      </div>
    );
  }
}
 
export default SettingsOption;