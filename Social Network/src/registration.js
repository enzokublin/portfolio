import React from "react";
import axios from "./axios"; // when ever we have a file which wants to use axios, we have to import it.
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.handleTheLoginClick = this.handleTheLoginClick.bind(this);
  }
  handleChange(event) {
    console.log("happy login: ", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTheLoginClick(event) {
    event.preventDefault();
  }

  registerUser(event) {
    event.preventDefault();
    axios
      .post("/register", this.state)
      .then(({ data }) => {
        console.log(data);
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
      <div className="registerpage">
        {this.state.error && (
          <div className="error">
            The Person you have called is not available like present. Please,
            try again!
          </div>
        )}
        <form id="regForm" onSubmit={this.registerUser}>
          <label id="reglab">
            Prename:
            <input
              id="regFirst"
              type="text"
              name="firstname"
              placeholder="firstname"
              onChange={this.handleChange}
            />
            Surname:
            <input
              id="regLast"
              type="text"
              name="lastname"
              placeholder="lastname"
              onChange={this.handleChange}
            />
            Email:
            <input
              id="regEmail"
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
            />
            Password:
            <input
              id="regPw"
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <button id="regBut">Register</button>
          </label>
        </form>
        <p id="regP">
          <Link to="/login">
            If you are already registered than click here: login
          </Link>
        </p>
      </div>
    );
  }
}

// hash password, firstname, lastname, email
