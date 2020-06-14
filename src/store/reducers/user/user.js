import {
  USER_REQUEST_START,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE
} from "../../types/user";
import { parseError } from "../../utils";

const initialState = {
  isLoading: false,
  message: undefined,
  user: undefined,
  error: undefined
};

export default function userReducer(state=initialState, action) {
  switch(action.type){
    case USER_REQUEST_START:
      return {
        isLoading: true,
        message: undefined,
        user: undefined,
        error: undefined
      };
    case USER_REQUEST_SUCCESS:
      return {
        isLoading: false,
        message: action.response.body.message,
        user: action.response.body.user,
        error: undefined
      };
    case USER_REQUEST_FAILURE:
      return {
        isLoading: false,
        message: undefined,
        user: undefined,
        error: parseError(action.error)
      };
    default:
      return state;
  }
};
