import axios from "axios";
import { ERRORS, LOGIN_USER } from "./types";
// import {ROOT_URL} from '../lib/constants';
export const FETCH_PEOPLE = "FETCH_PEOPLE";
export const SET_MESSAGE = "SET_MESSAGE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const DISPLAY_MESSAGES = "DISPLAY_MESSAGES";
export const REPLY_MESSAGES = "REPLY_MESSAGES";
export const NEW_MESSAGE = "NEW_MESSAGE";

// const ROOT_URL = "http://18.191.157.136:3001";

// export async function fetchPeople(data) {
//   console.log("ResponseSSSSSSSSSSS before: ", data);
//     const response = await axios.get(window.base_url+`/inbox/peopledetails`);
//     console.log("ResponseSSSSSSSSSSS after: ", response);
//     return {
//       type: FETCH_PEOPLE,
//       payload: response.data
//     };
// }

export const fetchPeople=(data) => dispatch =>{
  console.log("ResponseSSSSSSSSSSS before: ", data);
    axios
        .get(window.base_url+`/inbox/peopledetails`)
        .then(res =>{
          console.log("ResponseSSSSSSSSSSS after: ", res);
          dispatch({
            type: FETCH_PEOPLE,
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

export const sendMessage=(data, history) => dispatch =>{
  //sender,receiver,subject, message, date
    console.log("SENDING DATA FD ", data);
    axios
    .post(window.base_url+`/inbox/sendmessage`, data)
    .then(res=>{
      console.log("Response", res);
      dispatch({
        type: SEND_MESSAGE,
      payload: res.data
      })
      if(res.status===200){
        history.push(`/home/messages`);
      }
      else{
        history.push(`/home/messages/create`);
      }
    })
    .catch(err=>{
      dispatch({
        type: ERRORS,
        payload: ((err||{}).response||{}).data||"error"
      })
    })
};

export const setMessage=(data) =>dispatch=>{
  console.log("set message: ", data);
  dispatch({
    type: SET_MESSAGE,
  payload: data
  })
}
export const displayMessages=(data) =>dispatch=>{
  console.log("inside displayMessages: ", data);
  axios
  .post(window.base_url+`/inbox/displaymessages`, data)
  .then(res=>{
    console.log("res", res);
    dispatch({
      type: DISPLAY_MESSAGES,
    payload: res.data
    })
  })
  .catch(err=>{
    dispatch({
      type: ERRORS,
          payload: err.response.data
    })
  })
}

export const replyMessages=(data, history)=>dispatch=>{
  console.log("inside replyMessages", data);
  axios
      .post(window.base_url+`/inbox/reply`, data)
      .then(res=>{
        console.log("res replyMessages", res)
  history.push(`/home/messages/${data._id}`);
  dispatch({
    type: REPLY_MESSAGES,
    payload: {}
  })
      })
      .catch(err=>{
        dispatch({
          type: ERRORS,
              payload: err.response.data
        })
      })
    }
export const newMessage=(data)=> dispatch=> {
  // return {
  //   type: NEW_MESSAGE,
  //   payload: data
  // }
  console.log("inside replyMessages", data);
    dispatch({
      type: NEW_MESSAGE,
      payload: data
    });
}
