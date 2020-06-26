import authReducer from "./auth";
import {authenticate, logout, validateToken} from "../../actions/auth";
import {mockStore} from "../../../test-utils";
import { waitFor } from "@testing-library/react";

describe("Auth Reducer / Actions", () => {
  let store;
  let mockSuccessResponse;
  let mockFailureResponse;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false,
      message: undefined,
      token: undefined,
      user: undefined,
      error: undefined
    };
    
    mockSuccessResponse = {
      body: {
        message: "test message success",
        user: {
          username: "testuser"
        }
      },
      headers: {
        "x-needle-token": "testToken"
      }
    };

    mockFailureResponse = {
      response: {
        body: {
          error: "test message failure"
        }
      }
    };

    store = mockStore({
      auth: expectedInitialState
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = authReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the TOKEN_REQUEST action type", () => {
    const result = authReducer(undefined, {type: "TOKEN_REQUEST"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set message, user, and token data for the TOKEN_SUCCESS action type", () => {
    const result = authReducer(undefined, {
      type: "TOKEN_SUCCESS",
      response: mockSuccessResponse
    });
    expect(result).toEqual({
      isLoading: false,
      message: mockSuccessResponse.body.message,
      user: mockSuccessResponse.body.user,
      token: mockSuccessResponse.headers["x-needle-token"],
      error: undefined
    });
  });

  it("should set error data for the TOKEN_FAILURE action type", () => {
    const result = authReducer(undefined, {
      type: "TOKEN_FAILURE",
      error: mockFailureResponse
    });
    expect(result).toEqual({
      isLoading: false,
      message: undefined,
      user: undefined,
      token: undefined,
      error: mockFailureResponse.response.body.error
    });
  });

  it("should reset back to the initial state for the LOGOUT action type", () => {
    const result = authReducer(undefined, {type: "LOGOUT"});
    expect(result).toEqual(expectedInitialState);
  });

  it("should dispatch the LOGOUT action type for the logout action", () => {
    store.dispatch(logout());
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action.type).toEqual("LOGOUT");
  });

  it("should dispatch a redux API call to authenticate user credentials", async () => {
    store.dispatch(authenticate("testUser", "Password1"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    // First action should be the REQUEST
    expect(store.getActions()[0].type).toBe("TOKEN_REQUEST");

    // Second action is expected to be SUCCESS or FAILURE
    const expectedTypes = ["TOKEN_SUCCESS", "TOKEN_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to validate an existing token", async () => {
    store.dispatch(validateToken("some_token"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("TOKEN_REQUEST");
    const expectedTypes = ["TOKEN_SUCCESS", "VALIDATE_TOKEN"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
