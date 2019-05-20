import axios from "axios";
import { ERRORS, SIGNUP, LOGIN_USER, SET_CURRENT_USER, TOPICS } from "./types";
import jwt_decode from "jwt-decode";
var setData = require("../components/Localstorage").setData;
var getToken = require("../components/Localstorage").getToken;

let user_id = "";

export const signupUser = (signupdata, history) => dispatch => {
  console.log("checking data in backend", signupdata);
  axios
    .post(window.base_url + "/signup", signupdata)
    .then(res => {
      console.log("this is the data from back end", res.data);
      history.push("/interests");
      user_id = res.data._id;
    })
    .catch(err => {
      dispatch({
        type: ERRORS,
        payload: err.response.data
      });
    });
};

/****** Login User *****/
export const loginUser = (logindata, history) => dispatch => {
  console.log("checking data in backend", logindata);
  axios
    .post(window.base_url + "/login", logindata)
    .then(res => {
      console.log("inside login back from backedn", res.data);
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      /***** Setting up the data in localstorage *****/
      setData(res.data.token);
      console.log("resData", res.data);
      const decoded = jwt_decode(res.data.token);
      console.log("decoded token", decoded);
      console.log("decodedname", decoded.name);
      localStorage.setItem("name", decoded.name);
      localStorage.setItem("profileImage", decoded.profileImage);
      console.log("localstoarge", localStorage.getItem("name"));
      history.push("/home");
    })
    .catch(err => {
      history.push("/login");
      // dispatch({
      //   type: ERRORS,
      //   payload: err.response.data
      // });
    });
};

/***** Topics interests *****/
export const topicsSelected = (topicsInterested, history) => dispatch => {
  topicsInterested.userId = user_id;
  // console.log("the data is topics ", topicsInterested);
  axios
    .post(window.base_url + "/topic", topicsInterested)
    .then(res => {
      //  dispatch({
      //    type: INTERESTS,
      //    payload: res.data
      //    });
      //  console.log("this is the data from back end", res.data);
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: ERRORS,
        payload: err.response.data
      });
    });
};

/***** Render all Topics Selected *****/
export const fetchTopics = () => dispatch => {
  // let token = getToken();
  const Token = localStorage.getItem("token");
  console.log(Token);
  const decoded = jwt_decode(Token);
  axios
    .get(window.base_url + "/topic", {
      params: { email: decoded.email }
    })
    .then(response => {
      dispatch({
        type: TOPICS,
        payload: response.data.topics
      });
    });
};
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
