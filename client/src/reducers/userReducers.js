import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {};
    case USER_LOGIN_SUCCESS:
      return {};
    case USER_LOGIN_FAIL:
      return {};
    default:
      return {};
  }
};
