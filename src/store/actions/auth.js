import request from "superagent";
import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  LOGOUT
} from "../types/auth";
const apiRoute = `/api/auth`;
const requestStart = () => ({type: TOKEN_REQUEST});
const requestSuccess = (response) => ({type: TOKEN_SUCCESS, response});
const requestFailure = (error) => ({type: TOKEN_FAILURE, error});

// Get Auth Token
export const authenticate = (username, password) => (dispatch) => {
  return new Promise(resolve => {
    dispatch(requestStart());
    request
    .get(apiRoute)
    .set("x-needle-basic", `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`)
    .then((response) => {
      dispatch(requestSuccess(response));
      resolve(response.body.message);
    })
    .catch((error) => {
      dispatch(requestFailure(error));
      resolve();
    });
  });
};

export const logout = () => (dispatch) => {
  dispatch({type: LOGOUT});
};
