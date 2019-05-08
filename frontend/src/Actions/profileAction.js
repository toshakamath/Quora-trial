import axios from "axios";
import { ERRORS } from "./types";
import jwt_decode from "jwt-decode";
export const GET_PROFILE_NAME = "GET_PROFILE_NAME";

// export const getProfile = () => dispatch => {
//   let token = localStorage.jwtToken;
//   const decoded = jwt_decode(token);

//   axios
//     .get(window.base_url + "/users/profile", {
//       params: { email: decoded.email }
//     })
//     .then(response => {
//       console.log(response.data);
//       dispatch({
//         type: GET_PROFILE,
//         payload: response.data
//       });
//     });
// };

export const getProfileName = data => dispatch => {
  console.log("ResponseSSSSSSSSSSS PROFILE before: ", data.token);
  let Token = localStorage.getItem("token");
  console.log("ResponseSSSSSSSSSSS PROFILE before: ", Token);
  axios
    .get(window.base_url + `/profile`, { headers: { Authorization: Token } })
    .then(res => {
      console.log("ResponseSSSSSSSSSSS after: ", res);
      dispatch({
        type: GET_PROFILE_NAME,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERRORS,
        payload: err.response.data
      });
    });
};
