import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  VALIDATE_FAILURE,
  LOGOUT
} from "../../types/auth";
import { parseError } from "../../utils";

const initialState = {
  isLoading: false,
  message: undefined,
  token: undefined,
  user: undefined,
  error: undefined
};

export default function authReducer(state=initialState, action) {
  switch(action.type){
    case TOKEN_REQUEST:
      console.log('request');
      return {
        ...state,
        isLoading: true
      };
    case TOKEN_SUCCESS:
      console.log('success');
      localStorage.setItem("token", action.response.headers["x-needle-token"]);
      return {
        isLoading: false,
        message: action.response.body.message,
        user: action.response.body.user,
        token: action.response.headers["x-needle-token"],
        error: undefined
      };
    case TOKEN_FAILURE:
      console.log('failure');
      return {
        ...state,
        isLoading: false,
        error: parseError(action.error)
      };
    case LOGOUT:
      console.log('logout');
      localStorage.removeItem("token");
      return {
        ...initialState
      };
    case VALIDATE_FAILURE: // in the case of validation failure, silently swallow the error...unless a better experience can be found.
      console.log('validate');
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
