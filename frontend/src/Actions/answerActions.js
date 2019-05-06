import axios from "axios";
import { GET_ANSWERS } from "./types";

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