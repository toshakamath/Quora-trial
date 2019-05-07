import axios from "axios";
import { GET_ANSWERS, GET_PROFILE_VIEWCOUNT } from "./types";

export const getAnswers = () => dispatch => {
    axios
        .get(window.base_url + "/getallanswer", {
            params: { email: "" }
        })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: GET_ANSWERS,
                payload: response.data
            });
        });
};

export const getProfileViewCount = () => dispatch => {
    axios
        .get(window.base_url + "/profile/views", {
            params: { email: "" }
        })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: GET_PROFILE_VIEWCOUNT,
                payload: response.data
            });
        });
};