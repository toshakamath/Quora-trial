import _ from "lodash";
import { GET_PROFILE_NAME } from "../Actions/profileAction";

export default function (state = { profiledetails: [] }, action) {
  switch (action.type) {
    case GET_PROFILE_NAME:
      return Object.assign({}, { ...state }, { profiledetails: action.payload });
    default:
      return state;
  }
}
