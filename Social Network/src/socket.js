//front-end socket code here

import * as io from "socket.io-client";
import {
  onlineSpiceBears,
  spiceBearJoined,
  spiceBearLeft,
  getNewPost,
  getNewestPosts
} from "./actions";

let socket;
export function initSocket(store) {
  if (!socket) {
    socket = io.connect();
    socket.on("onlineSpiceBears", function(listOfSpiceBears) {
      store.dispatch(onlineSpiceBears(listOfSpiceBears));
    });

    socket.on("newMessage", function(newMessage) {
      console.log("new Message in Front: ", newMessage);
      store.dispatch(getNewPost(newMessage));
    });

    socket.on("newestMessages", function(newestMessages) {
      console.log("newest Messages in Front: ", newestMessages);
      store.dispatch(getNewestPosts(newestMessages));
    });

    socket.on("spiceBearJoined", listOfSpiceBears => {
      store.dispatch(spiceBearJoined(listOfSpiceBears));
    });

    socket.on("spiceBearLeft", spiceBearWhoLeft => {
      store.dispatch(spiceBearLeft(spiceBearWhoLeft));
    });
    //this is where we will listen for socket events
    // ie where you will write your front-end socket code
  }
  return socket;
}
