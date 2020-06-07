import React from "react";
import LoginPage from "./login-page";
import { render, mockStore } from "../../test-utils";

describe("<LoginPage />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      sidebar: {
        isOpen: false
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
});
