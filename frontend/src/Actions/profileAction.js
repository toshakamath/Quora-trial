import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../Actions/types";

const token = localStorage.getItem("token");

export const getProfile = () => dispatch => {
  //let token = localStorage.jwtToken;
  dispatch(setProfileLoading());
  console.log("action called");
  axios
    .get(window.base_url + "/profile", {
      headers: { Authorization: token }
    })
    .then(response => {
      console.log("response" + response.data);
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });
    });
};

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
//clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
