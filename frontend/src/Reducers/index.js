import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import errors from "./errors";
import authReducer from "./authReducer";
import MessageReducer from "./MessageReducer";
import questions from "./questionsReducer";
import ProfileReducer from "./ProfileReducer";

export default combineReducers({
  auth: authReducer,
  errors: errors,
  form: formReducer,
  message: MessageReducer,
  questions: questions,
  profile: ProfileReducer
  
});
