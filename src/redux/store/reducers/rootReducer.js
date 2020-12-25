import {combineReducers} from "redux";
import QuizReducer from './Quiz';
import CreateReducer from "./Create";
import AuthReducer from "./Auth";

export default combineReducers({
    quiz:QuizReducer,
    create: CreateReducer,
    auth: AuthReducer
})