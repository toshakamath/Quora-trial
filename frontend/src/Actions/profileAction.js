import axios from "axios";
import { GET_PROFILE } from "./type";
import jwt_decode from "jwt-decode";

export const getProfile = () => dispatch => {
  let token = localStorage.jwtToken;
  const decoded = jwt_decode(token);

  axios
    .get(window.base_url + "/users/profile", {
      params: { email: decoded.email }
    })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });
    });
};


