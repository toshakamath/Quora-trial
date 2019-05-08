import { GET_QUESTIONS } from "../Actions/types";
const initialState = {
    questions: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            console.log("Inside reducer questions", action.payload);
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
