import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import errors from "./errors";
import authReducer from "./authReducer";
import MessageReducer from "./MessageReducer";
import questions from "./questionsReducer";
import answers from "./answersReducer";
import profileReducer from "./profileReducer";
import ProfileReducer from "./profileReducer";
import contentReducer from "./contentReducer";
import contentAnsweredReducer from "./contentAnsweredReducer";
import answersReducer from "./answersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errors,
  profile: profileReducer,
  form: formReducer,
  message: MessageReducer,
  questions: questions,
  // answers: answers
  answers: answersReducer,
  content: contentReducer,
  contentAnswered: contentAnsweredReducer
});
