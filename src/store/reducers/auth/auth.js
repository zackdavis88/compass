import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
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
        isLoading: true,
        message: undefined,
        token: undefined,
        user: undefined,
        error: undefined,
      };
    case TOKEN_SUCCESS:
      console.log('success');
      return {
        isLoading: false,
        message: action.response.body.message,
        user: action.response.body.user,
        token: action.response.headers["x-compass-token"],
        error: undefined
      };
    case TOKEN_FAILURE:
      console.log('failure');
      return {
        isLoading: false,
        message: undefined,
        user: undefined,
        token: undefined,
        error: parseError(action.error)
      };
    case LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
