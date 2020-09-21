import React, { Component } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./PopupBox.scss";
import whatsappImage from "../../assets/img/whatsapp.svg";
import telegramImage from "../../assets/img/telegram.svg";
import gmailImage from "../../assets/img/gmail.svg";

class PopupBox extends Component {
  state = {
    visible: this.props.visible,
  };

  static defaultProps = {
    visible: true,
    research: {},
    closePopup: () => null,
  };

  componentDidMount = () => {
    window.addEventListener("mouseup", this.closeBox);
    this.box.style.top = window.scrollY;
    console.log(window.scrollY);
  }
  componentWillUnmount = () => {
    window.removeEventListener("mouseup", this.closeBox);
  }

  closeBox = (event) => {
    
    if (event & !this.box.contains(event.target)) {
      this.setState({ visible: false });
      this.props.closePopup();
    } else {
      this.setState({ visible: false });
      this.props.closePopup();

    }
  }
  render() {
    let research = this.props.research;
    return (
      
        <div className="popup-box-container" style={{display: !this.state.visible && "none"}}>
        <div className="popup-box" ref={box => this.box = box}>
          <AiFillCloseCircle className="close-icon" onClick={this.closeBox}/>
            <h3>طلب البحث</h3>
            <p>
              للحصول علي هذا البحث ، نرجو منك ارسال رقم البحث علي احدي وسائل
              التواصل الأتية
              <br />
              أو اضغط علي وسيلة التواصل وسيتم ارسال الطلب تلقائيا
            </p>
            <div className="id-container">
              <p>رقم البحث</p>
              <h3>#{research.index}</h3>
            </div>
            <div className="send-icons-container">
              <a href="#">
                <img
                  src={whatsappImage}
                  alt="Whatsapp"
                  className="request-img"
                />
                <h3
                  dir="ltr"
                  className="request-contact"
                  onClick={() => console.log("Hello World !")}
                >
                  +201064544529
                </h3>
              </a>
              <a href="#">
                <img
                  src={telegramImage}
                  alt="Telegram"
                  className="request-img"
                />
                <h3
                  dir="ltr"
                  className="request-contact"
                  onClick={() => console.log("Hello World !")}
                >
                  +201064544529
                </h3>
              </a>
              <a href="mailto:elashmawydev@gmail.com">
                <img src={gmailImage} alt="Gmail" className="request-img" />
                <h3
                  dir="ltr"
                  className="request-contact"
                  onClick={() => console.log("Hello World !")}
                >
                  elashmawydev@gmail.com
                </h3>
              </a>
            </div>
          </div>
        </div>
      
    );
  }
}

export default PopupBox;
