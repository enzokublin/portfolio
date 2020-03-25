import React from "react";
import axios from "./axios.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getWallPosts } from "./actions";

class Wall extends React.Component {
  constructor() {
    super();
    this.state = {
      inputData: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendPostToWall = this.sendPostToWall.bind(this);
    this.postCommentToWallByButtonPush = this.postCommentToWallByButtonPush.bind(
      this
    );
  }

  componentDidMount() {
    console.log("got it running");
    this.props.dispatch(getWallPosts());
  }

  handleChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  updateInputData(e) {
    this.setState({
      inputData: e.target.value,
      error: false
    });
  }

  sendPostToWall(e) {
    if (!this.state.inputData && !this.state.file) {
      this.setState({ error: true });
    } else if (e.which === 13) {
      this.postCommentToWallByButtonPush();
    }
  }

  postCommentToWallByButtonPush() {
    if (!this.state.inputData && !this.state.file) {
      this.setState({ error: true });
      return;
    }

    let data;
    if (!this.state.file) {
      data = {
        text: this.state.inputData
      };
      console.log("no image file but text: ", data);
    } else {
      data = new FormData();
      data.append("text", this.state.inputData);
      data.append("file", this.state.file);
      console.log("image file as well as text: ", this.state);
    }

    axios
      .post("/wall", data)
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { wallposts } = this.props;

    if (!wallposts) {
      return (
        <div className="spice-bear-wall">
          <input
            value={this.state.inputData}
            onChange={e => this.updateInputData(e)}
            className="wallInput"
            onKeyDown={this.sendPostToWall}
            autoFocus={true}
            placeholder="type here"
          />
          <div className="btn-wallpost-upload">
            <button className="btn-wallpost">Post A Picture</button>
            <input
              className="wall-submit-button"
              type="file"
              accept="image/*"
              name="myfile"
              onChange={this.handleChange}
            />
          </div>
          <div className="wall-post-button-container">
            <button
              className="wall-post-button"
              onClick={this.postCommentToWallByButtonPush}
            >
              Post
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="new-wall-post-container">
          <input
            value={this.state.inputData}
            onChange={e => this.updateInputData(e)}
            className="make-post-input"
            onKeyDown={this.sendPostToWall}
            autoFocus={true}
            placeholder=" What ever is on your mind?"
          />

          <input type="file" accept="image/*" onChange={this.handleChange} />
          <div>
            <button
              className="wall-post-button"
              onClick={this.postCommentToWallByButtonPush}
            >
              Post an Image
            </button>
          </div>
        </div>

        <div
          className="wall-post-container"
          ref={elem => (this.wallPostContainer = elem)}
        >
          <div>
            {this.props.wallposts &&
              this.props.wallposts.map((wallposts, index) => {
                return (
                  <div key={index}>
                    <div>
                      <img className="wallpostpic" src={wallposts.image_url} />
                    </div>
                    <Link to={`/user/${wallposts.id}`}>
                      <span>
                        <div className="wallpost-username">
                          {wallposts.firstname} {wallposts.lastname}
                        </div>
                      </span>
                    </Link>
                    <div className="wall-post-text">
                      {wallposts.comment}
                      <p className="wall-post-timestamp">
                        {wallposts.created_at}
                      </p>
                    </div>
                    <img src={wallposts.picture_url} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("states: ", state.posts);
  return {
    posts: state.posts
  };
};

export default connect(mapStateToProps)(Wall);
