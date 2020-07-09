import {
  DASHBOARD_REQUEST_START,
  DASHBOARD_REQUEST_SUCCESS,
  DASHBOARD_REQUEST_FAILURE
} from "../../types/dashboard";
import { parseError } from "../../utils";

const initialState = {
  isLoading: false,
  message: undefined,
  error: undefined,
  projects: [],
  stories: []
};

export default function dashboardReducer(state=initialState, action) {
  switch(action.type){
    case DASHBOARD_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case DASHBOARD_REQUEST_SUCCESS:
      return {
        isLoading: false,
        message: action.response.body.message,
        error: undefined,
        projects: action.response.body.projects,
        stories: action.response.body.stories
      };
    case DASHBOARD_REQUEST_FAILURE:
      return {
        isLoading: false,
        message: undefined,
        error: parseError(action.error),
        projects: [],
        stories: []
      };
    default:
      return state;
  }
};
