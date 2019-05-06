import { LOGIN_USER, TOPICS } from "../Actions/types";
const initialState = {
  token: {},
  authenticated: false,
  topics: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log("Inside reducer login", action.payload);
      if (action.payload) {
        return {
          ...state,
          token: action.payload,
          authenticated: true
        };
      }
      break;
    case TOPICS:
      return {
        ...state,
        topics: action.payload
      };
      break;
    default:
      return state;
  }
}
