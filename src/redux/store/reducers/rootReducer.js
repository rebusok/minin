import {combineReducers} from "redux";
import QuizReducer from './Quiz';


export default combineReducers({
    quiz:QuizReducer,

})