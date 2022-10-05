import { createStore, combineReducers, applyMiddleware } from "redux";
import { useReducer, userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
});
