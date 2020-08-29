import request from "superagent";
import {
  STATUS_REQUEST_START,
  STATUS_REQUEST_SUCCESS,
  STATUS_REQUEST_FAILURE
} from "../types/status";

export const createStatus = (project, name, color, transparent) => dispatch => {
  return dispatch({
    types: [STATUS_REQUEST_START, STATUS_REQUEST_SUCCESS, STATUS_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/status`),
    payload: {
      name,
      color,
      transparent
    }
  });
};

export const updateStatus = (project, status, name, color, transparent) => dispatch => {
  const payload = {};
  if(name)
    payload.name = name;
  if(color)
    payload.color = color;
  if(typeof transparent === "boolean")
    payload.transparent = transparent;
  return dispatch({
    types: [STATUS_REQUEST_START, STATUS_REQUEST_SUCCESS, STATUS_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/status/${status.id}`),
    payload
  });
};

export const deleteStatus = (statusData, confirm=true) => dispatch => {
  const projectId = statusData.project.id;
  return dispatch({
    types: [STATUS_REQUEST_START, STATUS_REQUEST_SUCCESS, STATUS_REQUEST_FAILURE],
    request: request.delete(`/api/projects/${projectId}/status/${statusData.id}`),
    payload: {
      confirm
    }
  });
};

export const getAllStatus = (projectId, page, itemsPerPage) => dispatch => {
  const queryString = {};
  if(page)
    queryString.page = page;
  if(itemsPerPage)
    queryString.itemsPerPage = itemsPerPage;
  return dispatch({
    types: [STATUS_REQUEST_START, STATUS_REQUEST_SUCCESS, STATUS_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/status`).query(queryString)
  });
};

export const getStatus = (projectId, statusId) => dispatch => {
  return dispatch({
    types: [STATUS_REQUEST_START, STATUS_REQUEST_SUCCESS, STATUS_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/status/${statusId}`)
  });
};

export const getAllStatusNames = (project) => dispatch => {
  return dispatch({
    types: [STATUS_REQUEST_START, STATUS_REQUEST_SUCCESS, STATUS_REQUEST_FAILURE],
    request: request.get(`/api/projects/${project.id}/status/all`)
  });
};
