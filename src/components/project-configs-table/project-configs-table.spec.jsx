import React from "react";
import ProjectConfigsTable from "./project-configs-table";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<ProjectConfigsTable />", () => {
  let props;
  beforeEach(() => {
    props = {
      projectConfigs: [{
        id: "testConfigId1",
        name: "Test Config 1",
        color: "#8ac19b",
        createdOn: "2020-08-10T16:42:21.374Z"
      }, {
        id: "testConfigId2",
        name: "Test Config 2",
        color: "#aabbcc",
        createdOn: "2020-08-23T16:42:21.374Z"
      }],
      configType: "priority",
      actions: {
        editConfig: jest.fn(),
        deleteConfig: jest.fn()
      },
      pagination: {
        page: 1,
        totalPages: 5,
        itemsPerPage: 10,
        getPage: jest.fn()
      },
      userRoles: {
        isAdmin: true
      }
    };
  });

  it("should mount the component", () => {
    const component = render(<ProjectConfigsTable {...props} />);
    expect(component).toBeDefined();
  });

  it("should render a message if there are no priorities to display for priority configType", () => {
    props.projectConfigs = [];
    const {getByText} = render(<ProjectConfigsTable {...props} />);
    expect(getByText("This project currently has no priorities.")).toBeDefined();
  });

  it("should render a message if there are no status to display for status configType", () => {
    props.projectConfigs = [];
    props.configType = "status";
    const {getByText} = render(<ProjectConfigsTable {...props} />);
    expect(getByText("This project currently has no status.")).toBeDefined();
  });

  it("should render the expected table headers for priority configType", () => {
    const {getByTestId, getByText} = render(<ProjectConfigsTable {...props}/>);
    expect(getByTestId("projectConfigsTable")).toBeDefined();
    expect(getByTestId("projectConfigsTable.table")).toBeDefined();
    expect(getByTestId("projectConfigsTable.tableHead")).toBeDefined();
    expect(getByText("Priority")).toBeDefined();
    expect(getByText("Color")).toBeDefined();
    expect(getByText("Unique ID")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render the expected table headers for status configType", () => {
    props.configType = "status";
    const {getByTestId, getByText} = render(<ProjectConfigsTable {...props}/>);
    expect(getByTestId("projectConfigsTable")).toBeDefined();
    expect(getByTestId("projectConfigsTable.table")).toBeDefined();
    expect(getByTestId("projectConfigsTable.tableHead")).toBeDefined();
    expect(getByText("Status")).toBeDefined();
    expect(getByText("Color")).toBeDefined();
    expect(getByText("Unique ID")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render the config data for each header", () => {
    props.projectConfigs[1].transparent = true;
    const {getByTestId, getByText} = render(<ProjectConfigsTable {...props} />);
    expect(getByTestId("projectConfigsTable.tableBody")).toBeDefined();
    // Row 1 should be-
    expect(getByText("Test Config 1")).toBeDefined();
    expect(getByText("#8AC19B")).toBeDefined();
    expect(getByText("testConfigId1")).toBeDefined();;
    expect(getByText("Aug 10, 2020")).toBeDefined();

    // Row 2 should be-
    expect(getByText("Test Config 2")).toBeDefined();
    expect(getByText("Transparent")).toBeDefined();
    expect(getByText("testConfigId2")).toBeDefined();
    expect(getByText("Aug 23, 2020")).toBeDefined();
  });

  it("should render 'None' for color if there is no color or transparency values", () => {
    props.projectConfigs[0].color = undefined;
    const {getByTestId, getByText} = render(<ProjectConfigsTable {...props} />);
    expect(getByTestId("projectConfigsTable.tableBody")).toBeDefined();
    expect(getByText("Test Config 1")).toBeDefined();
    expect(getByText("None")).toBeDefined();
    expect(getByText("testConfigId1")).toBeDefined();;
    expect(getByText("Aug 10, 2020")).toBeDefined();
  });

  it("should render the action buttons for each row", () => {
    const {getAllByTestId} = render(<ProjectConfigsTable {...props} />);
    expect(getAllByTestId("action.deleteConfig")).toHaveLength(2);
    expect(getAllByTestId("action.editConfig")).toHaveLength(2);
  });

  it("should not call the edit action if clicked with insufficient permissions", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {getAllByTestId} = render(<ProjectConfigsTable {...props}/>);
    const editButton = getAllByTestId("action.editConfig")[0];
    fireEvent.click(editButton);
    expect(props.actions.editConfig).not.toHaveBeenCalled();
  });

  it("should call an edit config action if clicked", () => {
    props.userRoles = {isManager: true};
    const {getAllByTestId} = render(<ProjectConfigsTable {...props} />);
    const editButton = getAllByTestId("action.editConfig")[0];
    fireEvent.click(editButton);
    expect(props.actions.editConfig).toHaveBeenCalledWith(props.projectConfigs[0]);
  });

  it("should not call the delete action if clicked with insufficient permissions", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {getAllByTestId} = render(<ProjectConfigsTable {...props}/>);
    const deleteButton = getAllByTestId("action.deleteConfig")[0];
    fireEvent.click(deleteButton);
    expect(props.actions.deleteConfig).not.toHaveBeenCalled();
  });

  it("should call the delete action if clicked", () => {
    const {getAllByTestId} = render(<ProjectConfigsTable {...props} />);
    const deleteButton = getAllByTestId("action.deleteConfig")[0];
    fireEvent.click(deleteButton);
    expect(props.actions.deleteConfig).toHaveBeenCalledWith(props.projectConfigs[0]);
  });

  it("should render the action tooltips for users with insufficient permissions", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {getAllByText} = render(<ProjectConfigsTable {...props}/>);
    expect(getAllByText("You can not perform this action")).toHaveLength(4);
  });

  it("should render the action tooltips for users with permission for priority configType", () => {
    const {getAllByText} = render(<ProjectConfigsTable {...props}/>);
    expect(getAllByText("Delete Priority")).toHaveLength(2);
    expect(getAllByText("Edit Priority")).toHaveLength(2);
  });

  it("should render the action tooltips for users with permission for status configType", () => {
    props.configType = "status";
    const {getAllByText} = render(<ProjectConfigsTable {...props}/>);
    expect(getAllByText("Delete Status")).toHaveLength(2);
    expect(getAllByText("Edit Status")).toHaveLength(2);
  });

  it("should render the pagination component", () => {
    const {getByTestId} = render(<ProjectConfigsTable {...props}/>);
    expect(getByTestId("projectConfigsTablePagination")).toBeDefined();
  });

  it("should call the getPage method when paginating", () => {
    const {getByTestId} = render(<ProjectConfigsTable {...props}/>);
    const nextPage = getByTestId("projectConfigsTablePagination.next");
    fireEvent.click(nextPage);
    expect(props.pagination.getPage).toHaveBeenCalledWith(2);
  });
});
