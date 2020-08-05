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
        projects: [{
          id: "some-id",
          name: "Test Project",
          description: "",
          isPrivate: true,
          roles: {
            isAdmin: true
          },
          createdOn: new Date().toISOString()
        }],
        stories: []
      },
      auth: {
        user: {
          displayName: "unitTestUser"
        }
      },
      project: {
        isLoading: false
      },
      membership: {
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
      },
      membership: {
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
    expect(getByText("New Project")).toBeDefined();
  });

  it("should render the tabs component", () => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    expect(getByTestId("dashboardTabs")).toBeDefined();
    expect(getByText("My Projects")).toBeDefined();
    expect(getByText("My Stories")).toBeDefined();
  });

  it("should render the ProjectModal when the new project button is clicked", () => {
    const {queryByTestId} = render(<Dashboard />, store);
    const newProjectButton = queryByTestId("dashboardNewProject");
    expect(newProjectButton).toBeDefined();
    expect(queryByTestId("projectModal.wrapper")).toBeNull();
    fireEvent.click(newProjectButton);
    expect(queryByTestId("projectModal.wrapper")).toBeDefined();
  });

  it("should render a message is there are no projects to display", () => {
    store = mockStore({
      dashboard: {
        isLoading: false,
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
      },
      membership: {
        isLoading: false
      }
    });
    const {getByText} = render(<Dashboard />, store);
    expect(getByText("You are not a member of any projects")).toBeDefined();
  });

  it("should render the projects table if there are projects to display", () => {
    const {getByTestId} = render(<Dashboard />, store);
    expect(getByTestId("dashboardProjects")).toBeDefined();
  });

  // it("should render the ProjectModal if the edit project action is clicked", () => {
  //   const {getByTestId, queryByTestId} = render(<Dashboard />, store);
  //   const editButton = getByTestId("action.editProject");
  //   expect(queryByTestId("projectModal.wrapper")).toBeNull();
  //   fireEvent.click(editButton);
  //   expect(queryByTestId("projectModal.wrapper")).toBeDefined();
  // });

  it("should render the DeleteModal if the delete project action is clicked", () => {
    const {getByTestId, queryByTestId} = render(<Dashboard />, store);
    const deleteButton = getByTestId("action.deleteProject");
    expect(queryByTestId("projectDeleteModal.wrapper")).toBeNull();
    fireEvent.click(deleteButton);
    expect(queryByTestId("projectDeleteModal.wrapper")).toBeDefined();
  });

  it("should render the MembershipModal if the add member action is clicked", async() => {
    store.dispatch = jest.fn().mockReturnValue({});
    const {getByTestId, queryByTestId} = render(<Dashboard />, store);
    const addMemberButton = getByTestId("action.addMember");
    expect(queryByTestId("membershipModal.wrapper")).toBeNull();
    fireEvent.click(addMemberButton);
    expect(queryByTestId("membershipModal.wrapper")).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
  });

  it("should call the push redux action when the view project action is clicked", async() => {
    store.dispatch = jest.fn();
    const {getByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    const viewButton = getByTestId("action.viewProject");
    fireEvent.mouseOver(viewButton);
    fireEvent.click(viewButton);
    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: "@@router/CALL_HISTORY_METHOD",
      payload: {
        method: "push",
        args: [`/projects/${store.getState().dashboard.projects[0].id}`]
      }
    });
  });
});
