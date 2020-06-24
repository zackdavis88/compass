import request from "superagent";
import {
  USER_REQUEST_START,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_FAILURE
} from "../types/user";

const apiRoute = "/api/users";
export const createUser = (username, password) => dispatch => {
  return dispatch({
    types: [USER_REQUEST_START, USER_REQUEST_SUCCESS, USER_REQUEST_FAILURE],
    request: request.post(apiRoute).send({username, password})
  });
};

export const getUser = (username) => dispatch => {
  return dispatch({
    types: [USER_REQUEST_START, USER_REQUEST_SUCCESS, USER_REQUEST_FAILURE],
    request: request.get(`${apiRoute}/${username}`)
  });
};

export const changePassword = (username, currentPassword, newPassword) => dispatch => {
  return dispatch({
    types: [USER_REQUEST_START, USER_REQUEST_SUCCESS, USER_REQUEST_FAILURE],
    request: request.post(`${apiRoute}/${username}`).send({currentPassword, password: newPassword})
  });
};
