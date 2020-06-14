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
      },
      user: {
        isLoading: false
      }
    });
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

  it("should render the login form", () => {
    const { getByTestId } = render(<LoginPage />, store);
    expect(getByTestId("loginForm")).toBeDefined();
  });

  it("should render the sign up form when the sign up button is clicked", () => {
    const { getByTestId } = render(<LoginPage />, store);
    // Click the Sign Up button
    const button = getByTestId("loginForm.goToSignUpButton");
    fireEvent.click(button);
    expect(getByTestId("signUpForm")).toBeDefined();
  });
});
