import React from "react";
import LoginPage from "./login-page";
import { render, mockStore } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<LoginPage />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoading: false
      }
    });

    // store.dispatch = jest.fn();
  });

  it("should mount the component", () => {
    const component = render(<LoginPage />, store);
    expect(component).toBeDefined();
  });

  it("should render the page header", () => {
    const { getByText, getByTestId } = render(<LoginPage />, store);
    expect(getByText("Login Required")).toBeDefined();
    expect(getByTestId("loginPageHeader")).toBeDefined();
    expect(getByTestId("pageHeaderIcon")).toBeDefined();
  });

  it("should render the login form inputs", () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginPage />, store);
    expect(getByTestId("loginForm")).toBeDefined();
    expect(getByTestId("usernameInput")).toBeDefined();
    expect(getByPlaceholderText("Username")).toBeDefined();
    expect(getByTestId("passwordInput")).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
  });

  it("should render the login form actions with the login button disabled by default", () => {
    const { getByTestId, getByText } = render(<LoginPage />, store);
    expect(getByTestId("loginButton")).toBeDefined();
    expect(getByText("Sign In")).toBeDefined();
    expect(getByTestId("signUpButton")).toBeDefined();
    expect(getByText("Sign Up")).toBeDefined();
    expect(getByTestId("loginButton")).toBeDisabled();
  });

  it("should enable the login button once username and password inputs have value", () => {
    const { getByTestId } = render(<LoginPage />, store);
    const button = getByTestId("loginButton");
    const usernameInput = getByTestId("usernameInput.input");
    const passwordInput = getByTestId("passwordInput.input");
    // Update the username input
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    // Button should still be disabled at this point
    expect(button).toBeDisabled();
    // Update the password input
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    // Button should be enabled
    expect(button).toBeEnabled();
  });

  it("should dispatch a redux API call to authenticate user credentials", async () => {
    const { getByTestId } = render(<LoginPage />, store);
    const button = getByTestId("loginButton");
    const usernameInput = getByTestId("usernameInput.input");
    const passwordInput = getByTestId("passwordInput.input");
    fireEvent.change(usernameInput, {
      target: {
        value: "testUser"
      }
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "Password1"
      }
    });
    fireEvent.click(button);
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    // First action should be the REQUEST
    expect(store.getActions()[0].type).toBe("TOKEN_REQUEST");

    // Second action is expected to be SUCCESS or FAILURE
    const expectedTypes = ["TOKEN_SUCCESS", "TOKEN_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
