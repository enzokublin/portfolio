import axios from "./axios";

export async function receiveBuddyBearsAndWannabieBuddyBears() {
  const { data } = await axios.get("/api-buddybears");
  return {
    type: "RECEIVE_BUDDY_BEARS_AND_WANNABIE_BUDDY_BEARS",
    data
  };
}

export async function acceptBuddyBearRequest(id) {
  await axios.post("/accept-buddybear-request", {
    receiver_id: id
  });
  return {
    type: "ACCEPT_BUDDY_BEAR_REQUEST",
    id
  };
}

export async function endbuddybearship(id) {
  await axios.post("/end-bear-buddyship", {
    receiver_id: id
  });
  return {
    type: "END_BUDDY_BEARSHIP",
    id
  };
}

export async function cancleBuddyBearRequest(id) {
  await axios.post("/cancle-buddybear-request", {
    receiver_id: id
  });
  return {
    type: "CANCEL_BUDDY_BEAR_REQUEST",
    id
  };
}

// #################################################################
export function onlineSpiceBears(listOfSpiceBears) {
  return {
    type: "List_OF_ONLINE_SPICE_BEARS",
    users: listOfSpiceBears
  };
}

export function spiceBearJoined(listOfSpiceBears) {
  return {
    type: "List_OF_ONLINE_SPICE_BEARS",
    users: listOfSpiceBears
  };
}

export function spiceBearLeft(spiceBearWhoLeft) {
  return {
    type: "SPICE_BEAR_Who_LEFT",
    users: spiceBearWhoLeft
  };
}

export function getNewestPosts(newestMessages) {
  console.log("awesome new actions: ", newestMessages);
  return {
    type: "NEW_SPICE_BEAR_MESSAGES_POSTED",
    newestMessages
  };
}

export function getNewPost(newMessage) {
  console.log("awesome new action: ", newMessage);
  return {
    type: "NEW_SPICE_BEAR_MESSAGE_POSTED",
    newMessage: newMessage
  };
}

// ############################################################################

export async function getWallPosts() {
  console.log("action wall post is fired!");
  const { data } = await axios.get("/wall-posts");
  console.log("happy data results: ", data);
  return {
    type: "GET_SPICE_BEAR_WALL_POSTS",
    data
  };
}

export function getWallPost(newestComment) {
  console.log("Happy Wallpost: ", newestComment);
  return {
    type: "NEW_COMMENT_IS_POSTED_AT_THE_WALL",
    newestComment
  };
}
