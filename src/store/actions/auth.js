import request from "superagent";
import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  VALIDATE_FAILURE,
  LOGOUT
} from "../types/auth";

// Get Auth Token
export const authenticate = (username, password) => dispatch => {
  return dispatch({
    types: [TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE],
    request: request
              .get("/api/auth")
              .set("x-needle-basic", `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`)
  });
};

export const logout = () => ({
  type: LOGOUT
});

export const validateToken = (token) => dispatch => {
  return dispatch({
    types: [TOKEN_REQUEST, TOKEN_SUCCESS, VALIDATE_FAILURE],
    request: request
              .get("/api/auth/token")
              .set("x-needle-token", token)
  });
};
