import {
  PRIORITY_REQUEST_START,
  PRIORITY_REQUEST_SUCCESS,
  PRIORITY_REQUEST_FAILURE
} from "../../types/priority";

const initialState = {
  isLoading: false
};

export default function priorityReducer(state=initialState, action) {
  switch(action.type){
    case PRIORITY_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case PRIORITY_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PRIORITY_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
