import request from "superagent";
import {
  DASHBOARD_REQUEST_START,
  DASHBOARD_REQUEST_SUCCESS,
  DASHBOARD_REQUEST_FAILURE
} from "../types/dashboard";
const apiRoute = "/api/dashboard";

export const getDashboard = () => dispatch => {
  return dispatch({
    types: [DASHBOARD_REQUEST_START, DASHBOARD_REQUEST_SUCCESS, DASHBOARD_REQUEST_FAILURE],
    request: request.get(apiRoute)
  });
};
