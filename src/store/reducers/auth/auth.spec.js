import authReducer from "./auth";

describe("Auth Reducer", () => {
  const expectedInitialState = {
    isLoading: false,
    message: undefined,
    token: undefined,
    user: undefined,
    error: undefined
  };

  const mockSuccessResponse = {
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

  const mockFailureResponse = {
    response: {
      body: {
        error: "test message failure"
      }
    }
  };

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
});
