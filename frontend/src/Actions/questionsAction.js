import axios from "axios";
import { GET_QUESTIONS } from "./types";

export const getQuestions = () => dispatch => {
    axios
        .get(window.base_url + "/question", {
            params: { email: "" }
        })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: GET_QUESTIONS,
                payload: response.data
            });
        });
};