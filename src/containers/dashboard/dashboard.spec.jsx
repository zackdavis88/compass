import React from "react";
import Dashboard from "./dashboard";
import { render, mockStore } from "../../test-utils";
import {waitFor, fireEvent} from "@testing-library/react";

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
      },
      project: {
        isLoading: false
      }
    });
  });

  it("should mount the component", () => {
    const component = render(<Dashboard />, store);
    expect(component).toBeDefined();
  });

  it("should call props.getDashboard on component mount", async() => {
    render(<Dashboard />, store);
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0]).toEqual({type: "DASHBOARD_REQUEST_START"});
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
      },
      project: {
        isLoading: false
      }
    });
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardLoader")).toBeDefined();
    expect(getByText("Loading Dashboard for unitTestUser")).toBeDefined();
  });

  it("should render the dashboard action buttons", () => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardNewProject")).toBeDefined();
    expect(getByTestId("dashboardNewStory")).toBeDefined();
    expect(getByText("New Project")).toBeDefined();
    expect(getByText("New Story")).toBeDefined();
  });

  it("should render the tabs component", () => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardTabs")).toBeDefined();
    expect(getByText("My Projects")).toBeDefined();
    expect(getByText("My Stories")).toBeDefined();
  });

  it("should render the NewProjectModal when the new project button is clicked", () => {
    const {queryByTestId} = render(<Dashboard />, store);
    const newProjectButton = queryByTestId("dashboardNewProject");
    expect(newProjectButton).toBeDefined();
    expect(queryByTestId("newProjectModal.wrapper")).toBeNull();
    fireEvent.click(newProjectButton);
    expect(queryByTestId("newProjectModal.wrapper")).toBeDefined();
  });
});
