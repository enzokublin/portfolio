import React from "react";
import { connect } from "react-redux";
import { initSocket } from "./socket";

class Chat extends React.Component {
  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage(e) {
    let socket = initSocket();
    if (e.which === 13 && !e.shiftKey) {
      let message = e.target.value;
      socket.emit("newMessage", message);
      console.log("happy message: ", message);
      e.target.value = "";
    }
  }

  componentDidUpdate() {
    console.log("THIS", this);
    if (!this.elem) {
      return;
    }
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
  }
  render() {
    const { messages } = this.props;
    if (!messages) {
      return null;
    }
    return (
      <div className="chatcontainer">
        <h1 className="buddybearchath1">Welcome to the Buddy Bear Chat</h1>
        <div className="bearchatbox">
          <div className="chatbox">
            <div
              className="chat-message-container"
              ref={elem => (this.elem = elem)}
            >
              {this.props.messages.map((message, idx) => (
                <div key={idx} className="singleMessage">
                  <div className="imgpostbox">
                    <img className="chatbuddybearimg" src={message.image_url} />
                  </div>
                  <div className="postbox">
                    <p className="chat-p-name">
                      {message.firstname} {message.lastname}
                    </p>
                    <p className="chat-p-message">{message.chat_message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <textarea onKeyDown={this.sendMessage} className="chattextarea" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.allMessageReducer
  };
};

export default connect(mapStateToProps)(Chat);
