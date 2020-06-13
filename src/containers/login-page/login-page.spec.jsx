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
});
