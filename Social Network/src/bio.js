import React from "react";
import axios from "./axios";
import { LogoutBear } from "./profile";

export default class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editBio: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveUserBio = this.saveUserBio.bind(this);
    this.showUserBio = this.showUserBio.bind(this);
  }
  saveUserBio(bio) {
    bio.preventDefault();

    axios
      .post("/bio", this.state)
      .then(() => {
        this.setState({
          editBio: false
        });
        this.props.setBio(this.state.user_content);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange(event) {
    this.setState({ user_content: event.target.value });
  }
  showUserBio() {
    if (this.state.editBio === true) {
      this.setState({
        editBio: false
      });
    } else {
      this.setState({
        editBio: true
      });
    }
  }
  render() {
    if (this.state.editBio == true) {
      return (
        <div className="bioBox">
          <textarea
            className="biotextarea"
            defaultValue={this.props.user_content}
            onChange={this.handleChange}
          />
          <button onClick={this.saveUserBio} className="savebioBut">
            Save
          </button>
        </div>
      );
    } else {
      return (
        <div className="biocontainer">
          <p className="bioP"> {this.props.user_content}</p>
          <button onClick={this.showUserBio} className="editBut">
            Edit
          </button>
          <LogoutBear />
        </div>
      );
    }
  }
}
