import userReducer from "./user";
import {createUser, getUser} from "../../actions/user";
import {mockStore} from "../../../test-utils";
import { waitFor } from "@testing-library/react";

describe("User Reducer / Actions", () => {
  let store;
  let mockSuccessResponse;
  let mockFailureResponse;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false,
      message: undefined,
      user: undefined,
      error: undefined
    };
    
    mockSuccessResponse = {
      body: {
        message: "test message success",
        user: {
          username: "testuser"
        }
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
      user: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = userReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the USER_REQUEST_START action type", () => {
    const result = userReducer(undefined, {type: "USER_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set message and user data for the USER_REQUEST_SUCCESS action type", () => {
    const result = userReducer(undefined, {
      type: "USER_REQUEST_SUCCESS",
      response: mockSuccessResponse
    });
    expect(result).toEqual({
      isLoading: false,
      message: mockSuccessResponse.body.message,
      user: mockSuccessResponse.body.user,
      error: undefined
    });
  });

  it("should set error data for the USER_REQUEST_FAILURE action type", () => {
    const result = userReducer(undefined, {
      type: "USER_REQUEST_FAILURE",
      error: mockFailureResponse
    });
    expect(result).toEqual({
      isLoading: false,
      message: undefined,
      user: undefined,
      error: mockFailureResponse.response.body.error
    });
  });

  it("should dispatch a redux API call to create a new user", async () => {
    store.dispatch(createUser("testUser", "Password1"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    // First action should be the REQUEST
    expect(store.getActions()[0].type).toBe("USER_REQUEST_START");

    // Second action is expected to be SUCCESS or FAILURE
    const expectedTypes = ["USER_REQUEST_SUCCESS", "USER_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
  
  it("should dispatch a redux API call get a user", async () => {
    store.dispatch(getUser("testUser"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    // First action should be the REQUEST
    expect(store.getActions()[0].type).toBe("USER_REQUEST_START");

    // Second action is expected to be SUCCESS or FAILURE
    const expectedTypes = ["USER_REQUEST_SUCCESS", "USER_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
