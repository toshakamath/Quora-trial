import { GET_ANSWERS } from "../Actions/types";
const initialState = {
    answers: []
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
        default:
            return state;
    }
}
