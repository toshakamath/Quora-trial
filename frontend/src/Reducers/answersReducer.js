import { GET_ANSWERS, GET_PROFILE_VIEWCOUNT } from "../Actions/types";
const initialState = {
    answers: [],
    profileview: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ANSWERS:
            console.log("Inside reducer ANswers", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    answers
                        : action.payload
                };
            }
            break;
        case GET_PROFILE_VIEWCOUNT:
            console.log("Inside reducer ANswers", action.payload);
            if (action.payload) {
                return {
                    ...state,
                    profileview
                        : action.payload
                };
            }
            break;
        default:
            return state;
    }
}

