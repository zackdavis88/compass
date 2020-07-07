import React from "react";
import Dashboard from "./dashboard";
import { render, mockStore } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<Dashboard />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  it("should mount the component", () => {
    const component = render(<Dashboard />, store);
    expect(component).toBeDefined();
  });

  it("should render the tabs component", () => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardTabs")).toBeDefined();
    expect(getByText("My Projects")).toBeDefined();
    expect(getByText("My Tasks")).toBeDefined();
  });
});
