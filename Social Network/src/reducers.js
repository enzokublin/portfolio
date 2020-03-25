export default function(state = {}, action) {
  if (action.type == "SPICE_BEAR_Who_LEFT") {
    console.log("happy spiceBearWhoLeft", action.spiceBearWhoLeft[0]);
    state = {
      ...state,
      onlineSpiceBears: state.onlineSpiceBears.filter(
        user => user.id != action.spiceBearWhoLeft[0].id
      )
    };
  }

  if (action.type == "List_OF_ONLINE_SPICE_BEARS") {
    state = {
      ...state,
      onlineSpiceBears: action.users
    };
  }

  if (action.type == "RECEIVE_BUDDY_BEARS_AND_WANNABIE_BUDDY_BEARS") {
    state = {
      ...state,
      buddybearsAndWannabieBuddyBears: action.data
    };
  }

  if (action.type == "CANCEL_BUDDY_BEAR_REQUEST") {
    state = {
      ...state,
      buddybearsAndWannabieBuddyBears: state.buddybearsAndWannabieBuddyBears.filter(
        user => user.id != action.id
      )
    };
  }

  if (action.type == "END_BUDDY_BEARSHIP") {
    state = {
      ...state,
      buddybearsAndWannabieBuddyBears: state.buddybearsAndWannabieBuddyBears.filter(
        user => user.id != action.id
      )
    };
  }

  if (action.type == "NEW_SPICE_BEAR_MESSAGE_POSTED") {
    console.log("happy post: ", action.type);
    state = {
      ...state,
      message: [...state.message, action.newMessage]
    };
  }

  if (action.type == "NEW_SPICE_BEAR_MESSAGES_POSTED") {
    state = {
      ...state,
      allMessageReducer: action.newestMessages
    };
    console.log("happy post: ", state.allMessageReducer);
  }

  if (action.type == "GET_SPICE_BEAR_WALL_POSTS") {
    console.log("reducer: ", action.data);
    state = {
      ...state,
      posts: action.data
    };
  }

  if (action.type == "ACCEPT_BUDDY_BEAR_REQUEST") {
    state = {
      ...state,
      buddybearsAndWannabieBuddyBears: state.buddybearsAndWannabieBuddyBears.map(
        user => {
          if (user.id == action.id) {
            return {
              ...user,
              accepted: true
            };
          } else {
            return user;
          }
        }
      )
    };
  }
  return state;
}
