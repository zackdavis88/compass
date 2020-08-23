import React from "react";
import PrioritiesTable from "./priorities-table";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<PrioritiesTable />", () => {
  let props;
  beforeEach(() => {
    props = {
      priorities: [{
        id: "testPriority1",
        name: "Test Priority 1",
        color: "#000000",
        createdOn: "2020-08-23T16:42:21.374Z"
      }, {
        id: "testPriority2",
        name: "Test Priority 2",
        color: "#ffffff",
        createdOn: "2020-08-26T16:44:21.374Z"
      }],
      actions: {
        createPriority: jest.fn(),
        editPriority: jest.fn(),
        deletePriority: jest.fn()
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
    const component = render(<PrioritiesTable {...props} />);
    expect(component).toBeDefined();
  });

  it("should render an info message about priorities", () => {
    const {getByText} = render(<PrioritiesTable {...props} />);
    expect(getByText("Priorities are project specific labels that can be attached to stories.")).toBeDefined();
  });

  it("should render an Add Priority button for managers and admins", () => {
    const {getByTestId} = render(<PrioritiesTable {...props} />);
    expect(getByTestId("addPriorityButton")).toBeDefined();
  });

  it("should not render the button for developers and viewers", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {queryByTestId} = render(<PrioritiesTable {...props} />);
    expect(queryByTestId("addPriorityButton")).toBeNull();
  });

  it("should call props.actions.createPriority when Add Priority is clicked", () => {
    const {getByTestId} = render(<PrioritiesTable {...props} />);
    const addButton = getByTestId("addPriorityButton");
    fireEvent.click(addButton);
    expect(props.actions.createPriority).toHaveBeenCalled();
  });

  it("should render a message if there are no priorities to display", () => {
    props.priorities = [];
    const {getByText} = render(<PrioritiesTable {...props} />);
    expect(getByText("This project currently has no priorities.")).toBeDefined();
  });

  it("should render the expected table headers", () => {
    const {getByTestId, getByText} = render(<PrioritiesTable {...props}/>);
    expect(getByTestId("prioritiesTable")).toBeDefined();
    expect(getByTestId("prioritiesTable.table")).toBeDefined();
    expect(getByTestId("prioritiesTable.tableHead")).toBeDefined();
    expect(getByText("Priority")).toBeDefined();
    expect(getByText("Unique ID")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render the priority data for each header", () => {
    const {getByTestId, getByText} = render(<PrioritiesTable {...props} />);
    expect(getByTestId("prioritiesTable.tableBody")).toBeDefined();
    // Row 1 should be-
    expect(getByText("Test Priority 1")).toBeDefined();
    expect(getByText("testPriority1")).toBeDefined();;
    expect(getByText("Aug 23, 2020")).toBeDefined();

    // Row 2 should be-
    expect(getByText("Test Priority 2")).toBeDefined();
    expect(getByText("testPriority2")).toBeDefined();
    expect(getByText("Aug 26, 2020")).toBeDefined();
  });

  it("should render the action buttons for each row", () => {
    const {getAllByTestId} = render(<PrioritiesTable {...props} />);
    expect(getAllByTestId("action.deletePriority")).toHaveLength(2);
    expect(getAllByTestId("action.editPriority")).toHaveLength(2);
  });

  it("should not call the edit action if clicked with insufficient permissions", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {getAllByTestId} = render(<PrioritiesTable {...props}/>);
    const editButton = getAllByTestId("action.editPriority")[0];
    fireEvent.click(editButton);
    expect(props.actions.editPriority).not.toHaveBeenCalled();
  });

  it("should call an edit priority action if clicked", () => {
    props.project = {id: "testProject", name: "test project", userRoles: {isManager: true}};
    const {getAllByTestId} = render(<PrioritiesTable {...props} />);
    const editButton = getAllByTestId("action.editPriority")[0];
    fireEvent.click(editButton);
    expect(props.actions.editPriority).toHaveBeenCalledWith(props.priorities[0]);
  });

  it("should not call the delete action if clicked with insufficient permissions", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {getAllByTestId} = render(<PrioritiesTable {...props}/>);
    const deleteButton = getAllByTestId("action.deletePriority")[0];
    fireEvent.click(deleteButton);
    expect(props.actions.deletePriority).not.toHaveBeenCalled();
  });

  it("should call a delete priority action if clicked", () => {
    const {getAllByTestId} = render(<PrioritiesTable {...props} />);
    const deleteButton = getAllByTestId("action.deletePriority")[0];
    fireEvent.click(deleteButton);
    expect(props.actions.deletePriority).toHaveBeenCalledWith(props.priorities[0]);
  });

  it("should render the action tooltips for users with insufficient permissions", () => {
    props.userRoles = {isDeveloper: true, isViewer: true};
    const {getAllByText} = render(<PrioritiesTable {...props}/>);
    expect(getAllByText("You can not perform this action")).toHaveLength(4);
  });

  it("should render the action tooltips for users with permission", () => {
    const {getAllByText} = render(<PrioritiesTable {...props}/>);
    expect(getAllByText("Delete Priority")).toHaveLength(2);
    expect(getAllByText("Edit Priority")).toHaveLength(2);
  });

  it("should render the pagination component", () => {
    const {getByTestId} = render(<PrioritiesTable {...props}/>);
    expect(getByTestId("prioritiesTablePagination")).toBeDefined();
  });

  it("should call the getPage method when paginating", () => {
    const {getByTestId} = render(<PrioritiesTable {...props}/>);
    const nextPage = getByTestId("prioritiesTablePagination.next");
    fireEvent.click(nextPage);
    expect(props.pagination.getPage).toHaveBeenCalledWith(2);
  });
});
