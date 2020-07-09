import React from "react";
import Dashboard from "./dashboard";
import { render, mockStore } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<Dashboard />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      dashboard: {
        isLoading: false,
        projects: [],
        stories: []
      },
      auth: {
        user: {
          displayName: "unitTestUser"
        }
      }
    });
  });

  it("should mount the component", () => {
    const component = render(<Dashboard />, store);
    expect(component).toBeDefined();
  });

  it("should render the loading spinner when awaiting API data", () => {
    store = mockStore({
      dashboard: {
        isLoading: true,
        stories: [],
        projects: []
      },
      auth: {
        user: {
          displayName: "unitTestUser"
        }
      }
    });
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardLoader")).toBeDefined();
    expect(getByText("Loading Dashboard for unitTestUser")).toBeDefined();
  });

  it("should render the tabs component", () => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardTabs")).toBeDefined();
    expect(getByText("My Projects")).toBeDefined();
    expect(getByText("My Tasks")).toBeDefined();
  });
});
