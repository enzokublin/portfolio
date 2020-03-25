import React from "react";
import axios from "./axios";
import Buddybearbutton from "./buddybear.js";

export default class Opp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const oppId = this.props.match.params.id;
    console.log("happy oppId: ", oppId);
    axios.get("/api-user/" + oppId).then(results => {
      if (results.data.success) {
        this.props.history.push("/profile");
      } else {
        this.setState({ ...results.data[0] });
      }
    });
  }

  render() {
    return (
      <div className="buddybearProf">
        <div className="oppcontainer">
          <h1 className="oppsname">
            {this.state.firstname} {this.state.lastname}
          </h1>
          <p className="biotext">{this.state.user_content}</p>
          <Buddybearbutton
            className="buddybearBut"
            receiver_id={this.props.match.params.id}
          />
        </div>
        <img className="proficon" src={this.state.image_url} />
      </div>
    );
  }
}
