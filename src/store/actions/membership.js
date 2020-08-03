import request from "superagent";
import {
  MEMBERSHIP_REQUEST_START,
  MEMBERSHIP_REQUEST_SUCCESS,
  MEMBERSHIP_REQUEST_FAILURE
} from "../types/membership";

export const createMembership = (project, username, roles) => dispatch => {
  return dispatch({
    types: [MEMBERSHIP_REQUEST_START, MEMBERSHIP_REQUEST_SUCCESS, MEMBERSHIP_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/memberships`),
    payload: {
      username,
      roles
    }
  });
};

export const getAvailableUsers = (project) => dispatch => {
  return dispatch({
    types: [MEMBERSHIP_REQUEST_START, MEMBERSHIP_REQUEST_SUCCESS, MEMBERSHIP_REQUEST_FAILURE],
    request: request.get(`/api/projects/${project.id}/memberships/available`)
  });
};

export const getMemberships = (projectId) => dispatch => {
  return dispatch({
    types: [MEMBERSHIP_REQUEST_START, MEMBERSHIP_REQUEST_SUCCESS, MEMBERSHIP_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/memberships`)
  });
};

export const deleteMembership = (membershipData, confirm) => dispatch => {
  const projectId = membershipData.project.id;
  return dispatch({
    types: [MEMBERSHIP_REQUEST_START, MEMBERSHIP_REQUEST_SUCCESS, MEMBERSHIP_REQUEST_FAILURE],
    request: request.delete(`/api/projects/${projectId}/memberships/${membershipData.id}`),
    payload: {
      confirm
    }
  });
};

export const updateMembership = (project, membership, roles) => dispatch => {
  const projectId = project.id;
  const membershipId = membership.id;
  return dispatch({
    types: [MEMBERSHIP_REQUEST_START, MEMBERSHIP_REQUEST_SUCCESS, MEMBERSHIP_REQUEST_FAILURE],
    request: request.post(`/api/projects/${projectId}/memberships/${membershipId}`),
    payload: {
      roles
    }
  });
};
