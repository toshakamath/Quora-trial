import axios from "axios";
import {
    GET_QUESTIONS_CONTENT, GET_ANSWERS_CONTENT, GET_ALL_CONTENT_QUESTIONS, GET_ALL_CONTENT_ANSWERS,
    GET_ALL_CONTENT, GET_FOLLOWEDQUESTIONS_CONTENT, GET_ALL_CONTENT_FOLLOWEDQUESTIONS
} from "./types";

export const getContentQuestions = (year, type, sort) => dispatch => {

    let Token = localStorage.getItem("token");

    console.log("TOKEN: ", Token);
    axios
        .get(window.base_url + "/content/questions",
            {
                headers: { Authorization: Token },
                params: {
                    year: year,
                    type: "",
                    sort: sort
                }
            }
        )
        .then(response => {
            console.log("TEST METHOD : getContentQuestions");
            console.log(response.data);
            if (type === "All Types") {
                dispatch({
                    type: GET_ALL_CONTENT_QUESTIONS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: GET_QUESTIONS_CONTENT,
                    payload: response.data
                });
            }
        });
};


export const getContentAnswers = (year, type, sort) => dispatch => {

    let Token = localStorage.getItem("token");

    console.log("TOKEN: ", Token);
    axios
        .get(window.base_url + "/content/answers",
            {
                headers: { Authorization: Token },
                params: {
                    year: year,
                    type: "",
                    sort: sort
                }
            }
        )
        .then(response => {
            console.log("TEST METHOD : getContentAnswers");
            console.log(response.data);
            if (type === "All Types") {
                dispatch({
                    type: GET_ALL_CONTENT_ANSWERS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: GET_ANSWERS_CONTENT,
                    payload: response.data
                });
            }
        });
};

export const getContentFollowedQuestions = (year, type, sort) => dispatch => {

    let Token = localStorage.getItem("token");

    console.log("TOKEN: ", Token);
    axios
        .get(window.base_url + "/content/questionsfollowed",
            {
                headers: { Authorization: Token },
                params: {
                    year: year,
                    type: "",
                    sort: sort
                }
            }
        )
        .then(response => {
            console.log("TEST METHOD : getContentAnswers");
            console.log(response.data);
            if (type === "All Types") {
                dispatch({
                    type: GET_ALL_CONTENT_FOLLOWEDQUESTIONS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: GET_FOLLOWEDQUESTIONS_CONTENT,
                    payload: response.data
                });
            }
        });
};