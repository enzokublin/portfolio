import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.logUserIn = this.logUserIn.bind(this);
  }
  handleChange(event) {
    console.log("funny login: ", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  logUserIn(event) {
    event.preventDefault();
    axios
      .post("/login", this.state)
      .then(({ data }) => {
        console.log("happy data: ", data);
        if (data.success) {
          location.replace("/profile");
        } else {
          this.setState({
            error: true
          });
        }
      })
      .catch(err => console.log(err.message));
  }
  render() {
    return (
      <div className="loginpage">
        {this.state.error && (
          <div class="error">
            The Person you are trying to login, is either not yet registered or
            you made a typing mistake. Please, try again!
          </div>
        )}
        <form id="loginform" onSubmit={this.logUserIn}>
          <label id="loglabel">
            Email:
            <input
              id="logmail"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            Password:
            <input
              id="pwlog"
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <button id="logBut" onClick={this.logUserIn}>
              Login
            </button>
          </label>
        </form>
      </div>
    );
  }
}
