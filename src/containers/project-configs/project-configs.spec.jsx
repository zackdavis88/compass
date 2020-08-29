import React from "react";
import ProjectConfigs from "./project-configs";
import { render, mockStore } from "../../test-utils";
import {waitFor, fireEvent} from "@testing-library/react";

describe("<ProjectConfigs />", () => {
  let store;
  let props;
  let projectsResponse = {
    project: {
      id: "testProjectId",
      name: "Unit Test Project"
    },
    userRoles: {
      isAdmin: true
    }
  };
  let prioritiesResponse = {
    page: 1,
    totalPages: 10,
    itemsPerPage: 10,
    priorities: [{
      id: "testPriority1",
      name: "Test Priority 1",
      color: "#9a6c1d",
      createdOn: "2020-08-28T18:40:03.471Z"
    }, {
      id: "testPriority2",
      name: "Test Priority 2",
      color: "#000000",
      createdOn: "2020-08-28T18:40:03.471Z"
    }]
  };
  let statusResponse = {
    page: 1,
    totalPages: 10,
    itemsPerPage: 10,
    status: [{
      id: "testStatus1",
      name: "Test Status 1",
      color: "#9a6c1d",
      createdOn: "2020-08-28T18:40:03.471Z"
    }, {
      id: "testStatus2",
      name: "Test Status 2",
      color: "#000000",
      createdOn: "2020-08-28T18:40:03.471Z"
    }]
  };
  beforeEach(() => {
    props = {
      match: {
        params: {projectId: "testProjectId"}
      },
      location: {
        search: ""
      }
    };
    store = mockStore({
      priority: {isLoading: false},
      status: {isLoading: false}
    });

    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(projectsResponse);
    store.dispatch.mockReturnValueOnce(prioritiesResponse);
    store.dispatch.mockReturnValueOnce(statusResponse);
  });

  it("should mount the component", async() => {
    const component = render(<ProjectConfigs {...props} />, store);
    expect(component).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
  });

  it("should render a PageError if the API returns an error", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({error: "something went wrong"});
    store.dispatch.mockReturnValueOnce(prioritiesResponse);
    store.dispatch.mockReturnValueOnce(statusResponse);
    const {queryByText} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByText("something went wrong")).toBeDefined();
  });

  it("should render a LoadingSpinner while awaiting initial API data", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined).mockReturnValueOnce(undefined);
    const {queryByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectConfigsLoader")).toBeDefined();
    expect(queryByText("Loading project configs")).toBeDefined();
  });

  it("should render the expected page header", async() => {
    const {queryByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectConfigsHeader")).toBeDefined();
    expect(queryByText("Configs - Unit Test Project")).toBeDefined();
  });

  it("should render an info message about project configs", async() => {
    const {queryByText} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByText("Configs are project specific values that can be associated with stories.")).toBeDefined();
  });

  it("should render a View Project Details button with the info message", async() => {
    const {queryByText, queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByTestId("projectDetailsButton")).toBeDefined();
    expect(queryByText("View Project Details")).toBeDefined();
  });

  it("should dispatch a redux push action to go to project details on button click", async() => {
    const {getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const detailsButton = getByTestId("projectDetailsButton");
    fireEvent.click(detailsButton);
    expect(store.dispatch).toHaveBeenCalledTimes(4);
    expect(store.dispatch).toHaveBeenLastCalledWith({
      payload: {
        args: [`/projects/${projectsResponse.project.id}`],
        method: "push"
      },
      type: "@@router/CALL_HISTORY_METHOD"
    });
  });

  it("should not render an actions menu for developers or viewers", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({project: projectsResponse.project, userRoles: {isDeveloper: true, isViewer: true}});
    store.dispatch.mockReturnValueOnce(prioritiesResponse);
    store.dispatch.mockReturnValueOnce(statusResponse);
    const {queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByTestId("projectConfigsActionsMenu")).toBeNull();
  });

  it("should render an actions menu for admins or managers", async() => {
    const {queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByTestId("projectConfigsActionsMenu")).toBeDefined();
  });

  it("should render an action menu item to Add Priority", async() => {
    const {queryByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectConfigsActionsMenu");
    expect(queryByText("Add Priority")).toBeNull();
    fireEvent.click(actionsMenu);
    expect(queryByText("Add Priority")).toBeDefined();
  });

  it("should render an action menu item to Add Status", async() => {
    const {queryByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectConfigsActionsMenu");
    expect(queryByText("Add Status")).toBeNull();
    fireEvent.click(actionsMenu);
    expect(queryByText("Add Status")).toBeDefined();
  });

  it("should render the ProjectConfigModal on add priority action click", async() => {
    const {getByText, getByTestId, queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByTestId("projectConfigsActionsMenu")).toBeDefined();
    const actionsMenu = getByTestId("projectConfigsActionsMenu");
    fireEvent.click(actionsMenu);
    const actionItem = getByText("Add Priority");
    expect(queryByTestId("projectConfigModal.wrapper")).toBeNull();
    fireEvent.click(actionItem);
    expect(queryByTestId("projectConfigModal.wrapper")).toBeDefined();
    expect(getByText("Add Priority")).toBeDefined();
  });

  it("should render the ProjectConfigModal on add status action click", async() => {
    const {getByText, getByTestId, queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByTestId("projectConfigsActionsMenu")).toBeDefined();
    const actionsMenu = getByTestId("projectConfigsActionsMenu");
    fireEvent.click(actionsMenu);
    const actionItem = getByText("Add Status");
    expect(queryByTestId("projectConfigModal.wrapper")).toBeNull();
    fireEvent.click(actionItem);
    expect(queryByTestId("projectConfigModal.wrapper")).toBeDefined();
    expect(getByText("Add Status")).toBeDefined();
  });

  it("should render the Tabs component and expected headers", async() => {
    const {queryByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectConfigsTabs")).toBeDefined();
    expect(queryByText("Priorities")).toBeDefined();
    expect(queryByText("Status")).toBeDefined();
  });

  it("should render a message if a project has no priorities", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(projectsResponse);
    store.dispatch.mockReturnValueOnce({...prioritiesResponse, priorities: []});
    store.dispatch.mockReturnValueOnce(statusResponse);
    const {getByText} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("This project currently has no priorities.")).toBeDefined();
  });

  it("should render a message if a project has no status", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(projectsResponse);
    store.dispatch.mockReturnValueOnce(prioritiesResponse);
    store.dispatch.mockReturnValueOnce({...statusResponse, status: []});
    const {getByText} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const statusTab = getByText("Status");
    fireEvent.click(statusTab);
    expect(getByText("This project currently has no status.")).toBeDefined();
  });

  it("should render a priorities table with expected headers", async() => {
    const {getByText, getAllByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectConfigsTable.table")).toBeDefined();
    expect(getByTestId("projectConfigsTable.tableHead")).toBeDefined();
    expect(getByText("Priority")).toBeDefined();
    expect(getByText("Unique ID")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getAllByText("Actions")).toHaveLength(2);
  });

  it("should render a status table with expected headers", async() => {
    const {getByText, getAllByText, getByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const statusTab = getByText("Status");
    fireEvent.click(statusTab);
    expect(getByTestId("projectConfigsTable.table")).toBeDefined();
    expect(getByTestId("projectConfigsTable.tableHead")).toBeDefined();
    expect(getAllByText("Status")).toHaveLength(2);
    expect(getByText("Unique ID")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getAllByText("Actions")).toHaveLength(2);
  });

  it("should render the ProjectConfigModal when the edit priority table action is clicked", async() => {
    const {getAllByTestId, queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const editAction = getAllByTestId("action.editConfig")[0];
    expect(queryByTestId("projectConfigModal.wrapper")).toBeNull();
    fireEvent.click(editAction);
    expect(queryByTestId("projectConfigModal.wrapper")).toBeDefined();
  });

  it("should render the ProjectConfigModal when the edit status table action is clicked", async() => {
    const {getByText, getAllByText, getAllByTestId, queryByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const statusTab = getByText("Status");
    fireEvent.click(statusTab);
    const editAction = getAllByTestId("action.editConfig")[0];
    expect(queryByTestId("projectConfigModal.wrapper")).toBeNull();
    fireEvent.click(editAction);
    expect(queryByTestId("projectConfigModal.wrapper")).toBeDefined();
    expect(getAllByText("Edit Status")).toHaveLength(3); // 2 of these are tooltips on the DOM. 1 is the modal header.
  });

  it("should call the deletePriority redux action when the delete priority table action is clicked", async() => {
    const {getAllByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const deleteAction = getAllByTestId("action.deleteConfig")[0];
    fireEvent.click(deleteAction);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(4));
  });

  it("should call the deleteStatus redux action when the delete status table action is clicked", async() => {
    const {getByText, getAllByTestId} = render(<ProjectConfigs {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const statusTab = getByText("Status");
    fireEvent.click(statusTab);
    const deleteAction = getAllByTestId("action.deleteConfig")[0];
    fireEvent.click(deleteAction);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(4));
  });
});
