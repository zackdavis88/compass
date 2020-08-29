import {
  STATUS_REQUEST_START,
  STATUS_REQUEST_SUCCESS,
  STATUS_REQUEST_FAILURE
} from "../../types/status";

const initialState = {
  isLoading: false
};

export default function statusReducer(state=initialState, action) {
  switch(action.type){
    case STATUS_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case STATUS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case STATUS_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
