import request from "superagent";
import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
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

export const logout = () => (dispatch) => {
  dispatch({type: LOGOUT});
};
