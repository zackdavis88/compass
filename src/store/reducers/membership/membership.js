import {
  MEMBERSHIP_REQUEST_START,
  MEMBERSHIP_REQUEST_SUCCESS,
  MEMBERSHIP_REQUEST_FAILURE
} from "../../types/membership";

const initialState = {
  isLoading: false
};

export default function membershipReducer(state=initialState, action) {
  switch(action.type){
    case MEMBERSHIP_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case MEMBERSHIP_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case MEMBERSHIP_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
