import React from "react";
import { ProfilePic } from "./profilePic";
import Bio from "./bio";

export function LogoutBear(props) {
  return (
    <a className="logoutBut" href="/logout">
      Log out
    </a>
  );
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile">
        <div className="profContainer">
          <h1 className="userName">
            <span className="prename">{this.props.firstname}</span>
            <span className="surname">{this.props.lastname}</span>
          </h1>
          <ProfilePic
            image={this.props.image}
            fistname={this.props.firstname}
            lastname={this.props.lastname}
            id={this.props.id}
            clickHandler={this.props.showUploader}
          />
        </div>
        <div className="biobox">
          <Bio
            user_content={this.props.user_content}
            setBio={this.props.setBio}
          />
        </div>
      </div>
    );
  }
}
