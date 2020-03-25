import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import { Link } from "react-router-dom";

export function WelcomeToTheSpicedBears() {
  return (
    <div id="welcome">
      <h1 id="welcomeh1"> Welcome to the SPICED BEARS! </h1>
      <div id="design">
        <img id="logo" src="./socialnetwork-logo.png" />
        <HashRouter>
          <div id="welrouter">
            <Route exact path="/" component={Registration} />
            <Route path="/login" component={Login} />
          </div>
        </HashRouter>
      </div>
    </div>
  );
}
