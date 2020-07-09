import request from "superagent";
import {
  PROJECT_REQUEST_START,
  PROJECT_REQUEST_SUCCESS,
  PROJECT_REQUEST_FAILURE
} from "../types/project";
const apiRoute = "/api/projects";

export const createProject = (name, description, isPrivate) => dispatch => {
  return dispatch({
    types: [PROJECT_REQUEST_START, PROJECT_REQUEST_SUCCESS, PROJECT_REQUEST_FAILURE],
    request: request.post(apiRoute),
    payload: {
      name,
      description,
      isPrivate
    }
  });
};
