import {
  PROJECT_REQUEST_START,
  PROJECT_REQUEST_SUCCESS,
  PROJECT_REQUEST_FAILURE
} from "../../types/project";
import { parseError } from "../../utils";

const initialState = {
  isLoading: false
};

export default function projectReducer(state=initialState, action) {
  switch(action.type){
    case PROJECT_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case PROJECT_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PROJECT_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
