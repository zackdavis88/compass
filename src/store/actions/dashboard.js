import request from "superagent";
import {
  DASHBOARD_REQUEST_START,
  DASHBOARD_REQUEST_SUCCESS,
  DASHBOARD_REQUEST_FAILURE
} from "../types/dashboard";
const apiRoute = "/api/dashboard";

export const getDashboardProjects = (page, itemsPerPage) => dispatch => {
  const queryString = {};
  if(page)
    queryString.page = page;
  if(itemsPerPage)
    queryString.itemsPerPage = itemsPerPage;
  return dispatch({
    types: [DASHBOARD_REQUEST_START, DASHBOARD_REQUEST_SUCCESS, DASHBOARD_REQUEST_FAILURE],
    request: request.get(`${apiRoute}/projects`).query(queryString)
  });
};

export const getDashboardStories = (page, itemsPerPage) => dispatch => {
  const queryString = {};
  if(page)
    queryString.page = page;
  if(itemsPerPage)
    queryString.itemsPerPage = itemsPerPage;
  return dispatch({
    types: [DASHBOARD_REQUEST_START, DASHBOARD_REQUEST_SUCCESS, DASHBOARD_REQUEST_FAILURE],
    request: request.get(`${apiRoute}/stories`).query(queryString)
  });
};
