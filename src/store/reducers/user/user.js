import {
  USER_REQUEST_START,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE
} from "../../types/user";

const initialState = {
  isLoading: false,
  message: undefined,
  user: undefined
};

export default function userReducer(state=initialState, action) {
  switch(action.type){
    case USER_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case USER_REQUEST_SUCCESS:
      return {
        isLoading: false,
        message: action.response.body.message,
        user: action.response.body.user
      };
    case USER_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
