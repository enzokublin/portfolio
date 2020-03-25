import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { WelcomeToTheSpicedBears } from "./welcome";
import Registration from "./registration";
import Login from "./login";
import { App } from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducers from "./reducers";
//socket stuff
import { initSocket } from "./socket";

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
if (location.pathname == "/welcome") {
  elem = <WelcomeToTheSpicedBears />;
} else {
  elem = (initSocket(store),
  (
    <Provider store={store}>
      <App />
    </Provider>
  ));
}

ReactDOM.render(
  elem, //this is a component |  you can define it in two different ways, either as a function or class
  // all react components must always start with a capital letter
  document.querySelector("main")
);

// this is a functional component
