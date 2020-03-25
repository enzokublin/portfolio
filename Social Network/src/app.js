import React from "react";
import axios from "./axios";
import Profile from "./profile";
import { ProfilePic } from "./profilePic";
import UploadPic from "./uploadPic";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Opp from "./opp";
import BuddyBearship from "./buddybearship";
import Online from "./online";
import Chat from "./chat";
import Wall from "./wall";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showUploader = this.showUploader.bind(this);
    this.setImage = this.setImage.bind(this);
    this.setBio = this.setBio.bind(this);
  }

  componentDidMount() {
    axios.get("/user").then(({ data }) => {
      const { image_url, user_content, firstname, lastname, id } = data;
      this.setState({
        image_url,
        user_content,
        firstname,
        lastname,
        id
      });
    });
  }

  setBio(bio) {
    this.setState({
      user_content: bio
    });
  }

  setImage(image_url) {
    this.setState({
      image_url: image_url,
      uploadStatus: false
    });
  }

  showUploader() {
    if (this.state.uploadStatus === true) {
      this.setState({
        uploadStatus: false
      });
    } else {
      this.setState({
        uploadStatus: true
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="appBox">
          <div className="pictureBox">
            <img className="logoMain" src="/socialnetwork-logo.png" />
            <div className="navbar">
              <div className="sbc">
                <Link to="/profile" className="sbcA">
                  <span>Spice Bear Cave</span>
                </Link>
              </div>
              <div className="osb">
                <Link to="/online" className="sbcA">
                  <span> Online Spice Bears </span>
                </Link>
              </div>
              <div className="bbs">
                <Link to="/buddybearship" className="sbcA">
                  <span> Buddy Bears </span>
                </Link>
              </div>
              <div className="chat">
                <Link to="/chat" className="sbcA">
                  <span> Chat </span>
                </Link>
              </div>
              <div className="logout-box">
                <a href="/wall" className="wallbb">
                  <span> Wall </span>
                </a>
              </div>
              <div className="logout-box">
                <a href="/logout" className="sbcA">
                  <span> Logout </span>
                </a>
              </div>
            </div>
            <div className="userbox">
              <ProfilePic
                image={this.state.image_url}
                fistname={this.state.firstname}
                lastname={this.state.lastname}
                id={this.state.id}
                showUploader={this.showUploader}
              />
            </div>
          </div>
          {this.state.uploadStatus && <UploadPic setImage={this.setImage} />}
          <div className="profBox">
            <Route
              path="/profile"
              render={() => (
                <Profile
                  firstname={this.state.firstname}
                  lastname={this.state.lastname}
                  id={this.state.id}
                  image={this.state.image_url}
                  user_content={this.state.user_content}
                  showUploader={this.showUploader}
                  setBio={this.setBio}
                />
              )}
            />
            <Route path="/buddybearship" component={BuddyBearship} />
            <Route path="/chat" component={Chat} />
            <Route
              path="/user/:id"
              render={props => <Opp {...props} key={props.match.url} />}
            />
            <Route path="/online" component={Online} />
            <Route exact path="/wall" component={Wall} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
