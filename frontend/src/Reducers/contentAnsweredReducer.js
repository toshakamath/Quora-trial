import { GET_ANSWERS_CONTENT, GET_ALL_CONTENT } from "../Actions/types";
const initialState = {
    questions: [],
    answers: [],
    followed: []
};

export default function (state = initialState, action) {
    switch (action.type) {

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
