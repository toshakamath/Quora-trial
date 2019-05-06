import {
    GET_QUESTIONS_CONTENT, GET_ANSWERS_CONTENT, GET_ALL_CONTENT, GET_ALL_CONTENT_ANSWERS,
    GET_ALL_CONTENT_QUESTIONS, GET_ALL_CONTENT_FOLLOWEDQUESTIONS, GET_FOLLOWEDQUESTIONS_CONTENT
} from "../Actions/types";
const initialState = {
    questions: [],
    answers: [],
    followedQuestions: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS_CONTENT:
            console.log("Inside reducer content questions", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    questions: action.payload,
                    answers: [],
                    followedQuestions: []
                };
            }
            break;
        case GET_ANSWERS_CONTENT:
            console.log("Inside reducer content answers", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    answers: action.payload,
                    questions: [],
                    followedQuestions: []
                };
            }
            break;
        case GET_FOLLOWEDQUESTIONS_CONTENT:
            console.log("Inside reducer content answers", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    followedQuestions: action.payload,
                    questions: [],
                    answers: []
                };
            }
            break;
        case GET_ALL_CONTENT_QUESTIONS:
            console.log("Inside reducer content questions", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    questions: action.payload,
                };
            }
            break;
        case GET_ALL_CONTENT_ANSWERS:
            console.log("Inside reducer content answers", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    answers: action.payload,
                };
            }
            break;
        case GET_ALL_CONTENT_FOLLOWEDQUESTIONS:
            console.log("Inside reducer content answers", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    followedQuestions: action.payload,
                };
            }
            break;
        case GET_ALL_CONTENT:
            console.log("Inside reducer content all", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    questions: action.payload
                };
            }
            break;
        default:
            return state;
    }
}
