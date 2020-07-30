import React from "react";
import DashboardProjectsTable from "./dashboard-projects-table";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<DashboardProjectsTable />", () => {
  let props;
  beforeEach(() => {
    props = {
      projects: [{
        id: "test-id-1",
        name: "Test Project 1",
        isPrivate: false,
        roles: {
          isAdmin: true
        },
        createdOn: "2020-07-13T17:59:52.639Z"
      },{
        id: "test-id-2",
        name: "Test Project 2",
        isPrivate: true,
        roles: {
          isDeveloper: true,
          isViewer: true
        },
        createdOn: "2020-07-14T17:59:52.639Z"
      }],
      actions: {
        deleteProject: jest.fn(),
        updateProject: jest.fn(),
        viewProject: jest.fn()
      }
    };
  });

  it("should mount the component", () => {
    const component = render(<DashboardProjectsTable {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the expected headers", () => {
    const {getByTestId, getByText} = render(<DashboardProjectsTable {...props}/>);
    expect(getByTestId("dashboardProjects")).toBeDefined();
    expect(getByTestId("dashboardProjects.table")).toBeDefined();
    expect(getByTestId("dashboardProjects.tableHead")).toBeDefined();
    expect(getByText("Name")).toBeDefined();
    expect(getByText("Unique ID")).toBeDefined();
    expect(getByText("Visibility")).toBeDefined();
    expect(getByText("Permission Level")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render the project data for each header", () => {
    const {getByTestId, getByText} = render(<DashboardProjectsTable {...props} />);
    expect(getByTestId("dashboardProjects.tableBody")).toBeDefined();
    // Row 1 should be-
    expect(getByText("Test Project 1")).toBeDefined();
    expect(getByText("test-id-1")).toBeDefined();;
    expect(getByText("Public")).toBeDefined();
    expect(getByText("Admin")).toBeDefined();
    expect(getByText("Jul 13, 2020")).toBeDefined();

    // Row 2 should be-
    expect(getByText("Test Project 2")).toBeDefined();
    expect(getByText("test-id-2")).toBeDefined();
    expect(getByText("Private")).toBeDefined();
    expect(getByText("Developer")).toBeDefined();
    expect(getByText("Jul 14, 2020")).toBeDefined();
  });

  it("should render the action buttons for each row", () => {
    const {getAllByTestId} = render(<DashboardProjectsTable {...props} />);
    expect(getAllByTestId("action.deleteProject")).toHaveLength(2);
    expect(getAllByTestId("action.editProject")).toHaveLength(2);
    expect(getAllByTestId("action.addMember")).toHaveLength(2);
    expect(getAllByTestId("action.viewProject")).toHaveLength(2);
  });

  it("should not call an action method if clicked with insufficient permissions", () => {
    const {getAllByTestId} = render(<DashboardProjectsTable {...props} />);
    const deleteAction = getAllByTestId("action.deleteProject")[1];
    fireEvent.mouseOver(deleteAction);
    fireEvent.click(deleteAction);
    expect(props.actions.deleteProject).not.toHaveBeenCalled();
  });

  it("should call an action method if clicked with sufficient permissions", () => {
    const {getAllByTestId} = render(<DashboardProjectsTable {...props} />);
    const deleteAction = getAllByTestId("action.deleteProject")[0];
    fireEvent.mouseOver(deleteAction);
    fireEvent.click(deleteAction);
    expect(props.actions.deleteProject).toHaveBeenCalledWith(props.projects[0]);
  });
});