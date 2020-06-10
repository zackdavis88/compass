import React from "react";
import LoginPage from "./login-page";
import { render, mockStore } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<LoginPage />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoading: false
      }
    });

    store.dispatch = jest.fn();
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

  it("should render the login form actions", () => {
    const { getByTestId, getByText } = render(<LoginPage />, store);
    expect(getByTestId("loginButton")).toBeDefined();
    expect(getByText("Sign In")).toBeDefined();
    expect(getByTestId("signUpButton")).toBeDefined();
    expect(getByText("Sign Up")).toBeDefined();
  });
});
