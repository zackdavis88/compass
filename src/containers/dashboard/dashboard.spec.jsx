import React from "react";
import Dashboard from "./dashboard";
import { render, mockStore } from "../../test-utils";
import {waitFor, fireEvent} from "@testing-library/react";

describe("<Dashboard />", () => {
  let store;
  const projectsResponse = {
    page: 1,
    totalPages: 1,
    itemsPerPage: 10,
    projects: [{
      id: "testProject1",
      name: "Some Name",
      isPrivate: true,
      createdOn: "2020-08-01T19:08:37.237Z",
      roles: {
        isAdmin: true
      }
    },{
      id: "testProject2",
      name: "Another Name",
      isPrivate: false,
      createdOn: "2020-08-05T12:00:37.237Z",
      roles: {
        isDeveloper: true
      }
    }]
  };
  const storiesResponse = {
    page: 1,
    totalPages: 1,
    itemsPerPage: 10,
    stories: [{
      id: "testStory1",
      name: "Test Story 1",
      creator: {
        displayName: "testUser1"
      },
      project: {
        id: "testProject1",
        name: "Test Project 1"
      },
      createdOn: "2020-08-13T17:59:52.639Z"
    }, {
      id: "testStory2",
      name: "Test Story 2",
      creator: {
        displayName: "testUser1"
      },
      owner: {
        displayName: "testUser344"
      },
      project: {
        id: "testProject1",
        name: "Test Project 5"
      },
      createdOn: "2019-01-13T17:59:52.639Z"
    }]
  };
  beforeEach(() => {
    store = mockStore({
      dashboard: {
        isLoading: false
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
      },
      story: {
        isLoading: false
      }
    });

    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(projectsResponse);
    store.dispatch.mockReturnValueOnce(storiesResponse);
  });

  it("should mount the component", async() => {
    const component = render(<Dashboard />, store);
    expect(component).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
  });

  it("should call getDashboardProjects and getDashboardStories on component mount", async() => {
    const component = render(<Dashboard />, store);
    expect(component).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
  });

  it("should render the loading spinner when awaiting API data", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({});
    store.dispatch.mockReturnValueOnce({});
    const {getByTestId, getByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(getByTestId("dashboardLoader")).toBeDefined();
    expect(getByText("Loading Dashboard for unitTestUser")).toBeDefined();
  });

  it("should render the Dashboard header", async() => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(getByTestId("dashboardHeader")).toBeDefined();
    expect(getByText("Dashboard")).toBeDefined();
  });

  it("should render the dashboard actions menu", async() => {
    const {getByTestId, getAllByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(getByTestId("dashboardActionsMenu")).toBeDefined();
    expect(getAllByText("Actions")).toBeDefined();
  });

  it("should render the 'New Project' item under the actions menu", async() => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    const actionsMenu = getByTestId("dashboardActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("New Project")).toBeDefined();
  });

  it("should render the tabs component", async() => {
    const {getByTestId, getByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(getByTestId("dashboardTabs")).toBeDefined();
    expect(getByText("My Projects")).toBeDefined();
    expect(getByText("My Stories")).toBeDefined();
  });

  it("should render the ProjectModal when the new project button is clicked", async() => {
    const {getByTestId, getByText, queryByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    const actionsMenu = getByTestId("dashboardActionsMenu");
    fireEvent.click(actionsMenu);
    const newProjectButton = getByText("New Project");
    expect(queryByTestId("projectModal.wrapper")).toBeNull();
    fireEvent.click(newProjectButton);
    expect(queryByTestId("projectModal.wrapper")).toBeDefined();
  });

  it("should render a message is there are no projects to display", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({...projectsResponse, projects: []});
    store.dispatch.mockReturnValueOnce(storiesResponse);
    const {getByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(getByText("You are not a member of any projects")).toBeDefined();
  });

  it("should render the projects table if there are projects to display", async() => {
    const {getByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(getByTestId("dashboardProjects")).toBeDefined();
  });

  it("should render the DeleteModal if the delete project action is clicked", async() => {
    const {getAllByTestId, queryByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    const deleteButton = getAllByTestId("action.deleteProject")[0];
    expect(queryByTestId("projectDeleteModal.wrapper")).toBeNull();
    fireEvent.click(deleteButton);
    expect(queryByTestId("projectDeleteModal.wrapper")).toBeDefined();
  });

  it("should render the MembershipModal if the add member action is clicked", async() => {
    const {getAllByTestId, queryByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    store.dispatch.mockReturnValueOnce({}); // mock get available members API response.
    const addMemberButton = getAllByTestId("action.addMember")[0];
    expect(queryByTestId("membershipModal.wrapper")).toBeNull();
    fireEvent.click(addMemberButton);
    expect(queryByTestId("membershipModal.wrapper")).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
  });

  it("should render the StoryModal if the new story action is clicked", async() => {
    const {getAllByTestId, queryByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    store.dispatch.mockReturnValueOnce({});
    const addStoryButton = getAllByTestId("action.addStory")[0];
    expect(queryByTestId("storyModal.wrapper")).toBeNull();
    fireEvent.click(addStoryButton);
    expect(queryByTestId("storyModal.wrapper")).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
  });

  it("should call the push redux action when the view project action is clicked", async() => {
    const {getAllByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    const viewButton = getAllByTestId("action.viewProject")[0];
    fireEvent.click(viewButton);
    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: "@@router/CALL_HISTORY_METHOD",
      payload: {
        method: "push",
        args: [`/projects/${projectsResponse.projects[0].id}`]
      }
    });
  });

  it("should render a message is there are no stories to display", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(projectsResponse);
    store.dispatch.mockReturnValueOnce({...storiesResponse, stories: []});
    const {getByText} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    const storiesTab = getByText("My Stories");
    fireEvent.click(storiesTab);
    expect(getByText("You are not the owner/creator of any stories")).toBeDefined();
  });

  it("should render the StoriesTable when the Stories tab is clicked", async() => {
    const {getByText, queryByTestId} = render(<Dashboard />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    const storiesTab = getByText("My Stories");
    expect(queryByTestId("storiesTable")).toBeNull();
    fireEvent.click(storiesTab);
    expect(queryByTestId("storiesTable")).toBeDefined();
  });
});
