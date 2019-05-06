// import { SIGNUP, LOGIN_USER, SET_CURRENT_USER } from "../Actions/types";
// import isEmpty from "../validation/is-empty";
// const initialState = {
//   token: "",
//   user: {},
//   authenticated: false
// };
// export default function(state = initialState, action) {
//   switch (action.type) {
//     case SET_CURRENT_USER:
//       console.log("user", action.payload);
//       return {
//         ...state,
//         isAuthenticated: !isEmpty(action.payload),
//         user: action.payload
//       };
//     case LOGIN_USER:
//       console.log("Inside reducer login", action.payload);
//       if (action.payload) {
//         return {
//           ...state,
//           token: action.payload
//         };
//       }
//     default:
//       return state;
//   }
// }

import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../Actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
