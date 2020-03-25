import React from "react";
import axios from "./axios";

export default class Buddybearbutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Add Buddy Bear"
    };
    this.buddyBearRequestAction = this.buddyBearRequestAction.bind(this);
  }
  componentDidMount() {
    axios
      .get("/buddyship-status", {
        params: {
          id: this.props.receiver_id
        }
      })
      .then(results => {
        let status;
        if (!results.data) {
          status = "Add Buddy Bear";
        } else if (
          !results.data.accepted &&
          this.props.receiver_id == results.data.sender_id
        ) {
          status = "Accept Bear Buddyship";
        } else if (
          !results.data.accepted &&
          this.props.receiver_id == results.data.receiver_id
        ) {
          status = "Cancel Buddy Bear Request";
        } else {
          status = "End Bear Buddyship";
        }
        this.setState({
          status: status
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  buddyBearRequestAction() {
    if (this.state.status == "Add Buddy Bear") {
      axios
        .post("/send-buddybear-request", {
          id: this.props.receiver_id
        })
        .then(results => {
          if (!results.data.accepted) {
            this.setState({
              status: "Cancel Buddy Bear Request"
            });
          }
        })
        .catch(err => console.log(err));
    } else if (this.state.status == "Accept Bear Buddyship") {
      axios
        .post("/accept-buddybear-request", {
          receiver_id: this.props.receiver_id
        })
        .then(results => {
          if (results.data.accepted) {
            this.setState({
              status: "End Bear Buddyship"
            });
          }
        })
        .catch(err => console.log(err));
    } else if (
      this.state.status == "End Bear Buddyship" ||
      this.state.status == "Cancel Buddy Bear Request"
    ) {
      axios
        .post("/end-bear-buddyship", {
          receiver_id: this.props.receiver_id
        })
        .then(() => {
          this.setState({
            status: "Add Buddy Bear"
          });
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <div className="buddyship">
        <button className="buddyBut" onClick={this.buddyBearRequestAction}>
          {this.state.status}
        </button>
      </div>
    );
  }
}
