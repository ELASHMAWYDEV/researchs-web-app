import React, { Component } from "react";
import "./Notifier.scss";

class Notifier extends Component {
  state = {
    done: false,
  };

  static defaultProps = {
    type: false,
    messages: [],
    onDone: () => null,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ done: true });
      this.props.onDone();
    }, 5000);
  };

  render() {
    return (
      !this.state.done &&
      this.props.messages.length != 0 && (
        <div className="notifier-container">
          {this.props.messages.map((msg, i) => (
            <div key={i} className={"alert-box " + this.props.type}>
              {msg}
            </div>
          ))}
        </div>
      )
    );
  }
}

export default Notifier;
