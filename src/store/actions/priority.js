import request from "superagent";
import {
  PRIORITY_REQUEST_START,
  PRIORITY_REQUEST_SUCCESS,
  PRIORITY_REQUEST_FAILURE
} from "../types/priority";

export const createPriority = (project, name, color) => dispatch => {
  return dispatch({
    types: [PRIORITY_REQUEST_START, PRIORITY_REQUEST_SUCCESS, PRIORITY_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/priorities`),
    payload: {
      name,
      color
    }
  });
};

export const updatePriority = (project, priority, name, color) => dispatch => {
  const payload = {};
  if(name)
    payload.name = name;
  if(color)
    payload.color = color;
  return dispatch({
    types: [PRIORITY_REQUEST_START, PRIORITY_REQUEST_SUCCESS, PRIORITY_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/priorities/${priority.id}`),
    payload
  });
};

export const deletePriority = (priorityData, confirm=true) => dispatch => {
  const projectId = priorityData.project.id;
  return dispatch({
    types: [PRIORITY_REQUEST_START, PRIORITY_REQUEST_SUCCESS, PRIORITY_REQUEST_FAILURE],
    request: request.delete(`/api/projects/${projectId}/priorities/${priorityData.id}`),
    payload: {
      confirm
    }
  });
};

export const getPriorities = (projectId, page, itemsPerPage) => dispatch => {
  const queryString = {};
  if(page)
    queryString.page = page;
  if(itemsPerPage)
    queryString.itemsPerPage = itemsPerPage;
  return dispatch({
    types: [PRIORITY_REQUEST_START, PRIORITY_REQUEST_SUCCESS, PRIORITY_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/priorities`).query(queryString)
  });
};

export const getPriority = (projectId, priorityId) => dispatch => {
  return dispatch({
    types: [PRIORITY_REQUEST_START, PRIORITY_REQUEST_SUCCESS, PRIORITY_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/priorities/${priorityId}`)
  });
};

export const getAllPriorityNames = (projectId) => dispatch => {
  return dispatch({
    types: [PRIORITY_REQUEST_START, PRIORITY_REQUEST_SUCCESS, PRIORITY_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/priorities/all`)
  });
};
