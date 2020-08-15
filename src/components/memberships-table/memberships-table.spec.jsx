import React from "react";
import MembershipsTable from "./memberships-table";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<MembershipsTable />", () => {
  let props;
  beforeEach(() => {
    props = {
      memberships: [{
        id: "testMembership1",
        user: {
          displayName: "testUser1"
        },
        roles: {
          isAdmin: true
        },
        createdOn: "2020-07-13T22:09:36.829Z"
      },{
        id: "testMembership2",
        user: {
          displayName: "testUser2"
        },
        roles: {
          isDeveloper: true
        },
        createdOn: "2020-08-02T22:09:36.829Z"
      }],
      userRoles: {
        isAdmin: true
      },
      actions: {
        deleteMembership: jest.fn(),
        editMembership: jest.fn()
      },
      pagination: {
        page: 1,
        totalPages: 3,
        itemsPerPage: 10,
        getPage: jest.fn()
      }
    };
  });

  it("should mount the component", () => {
    const component = render(<MembershipsTable {...props} />);
    expect(component).toBeDefined();
  });

  it("should render a message if there are no memberships to display", () => {
    props.memberships = [];
    const {getByText} = render(<MembershipsTable {...props}/>);
    expect(getByText("There are no memberships to display")).toBeDefined();
  });

  it("should render the expected headers", () => {
    const {getByTestId, getByText} = render(<MembershipsTable {...props}/>);
    expect(getByTestId("projectMemberships")).toBeDefined();
    expect(getByTestId("projectMemberships.table")).toBeDefined();
    expect(getByTestId("projectMemberships.tableHead")).toBeDefined();
    expect(getByText("User")).toBeDefined();
    expect(getByText("Permission Level")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render the membership data for each header", () => {
    const {getByTestId, getByText} = render(<MembershipsTable {...props} />);
    expect(getByTestId("projectMemberships.tableBody")).toBeDefined();
    // Row 1 should be-
    expect(getByText("testUser1")).toBeDefined();
    expect(getByText("Admin")).toBeDefined();
    expect(getByText("Jul 13, 2020")).toBeDefined();

    // Row 2 should be-
    expect(getByText("testUser2")).toBeDefined();
    expect(getByText("Developer")).toBeDefined();
    expect(getByText("Aug 2, 2020")).toBeDefined();
  });

  it("should render the action buttons for each row", () => {
    const {getAllByTestId} = render(<MembershipsTable {...props} />);
    expect(getAllByTestId("action.deleteMembership")).toHaveLength(2);
    expect(getAllByTestId("action.editMembership")).toHaveLength(2);
  });

  it("should not call an action method if a manager tries to alter an admin", () => {
    props.userRoles = {isManager: true};
    const {getAllByTestId} = render(<MembershipsTable {...props} />);
    const deleteAction = getAllByTestId("action.deleteMembership")[0];
    const editAction = getAllByTestId("action.editMembership")[0];
    fireEvent.click(deleteAction);
    fireEvent.click(editAction);
    expect(props.actions.deleteMembership).not.toHaveBeenCalled();
    expect(props.actions.editMembership).not.toHaveBeenCalled();
  });

  it("should not call an action method if the user has insufficient permission", () => {
    props.userRoles = {isDeveloper: true};
    const {getAllByTestId} = render(<MembershipsTable {...props} />);
    const deleteAction = getAllByTestId("action.deleteMembership")[1];
    const editAction = getAllByTestId("action.editMembership")[1];
    fireEvent.click(deleteAction);
    fireEvent.click(editAction);
    expect(props.actions.deleteMembership).not.toHaveBeenCalled();
    expect(props.actions.editMembership).not.toHaveBeenCalled();
  });

  it("should call an action method if clicked with sufficient permissions", () => {
    const {getAllByTestId} = render(<MembershipsTable {...props} />);
    const deleteAction = getAllByTestId("action.deleteMembership")[0];
    const editAction = getAllByTestId("action.editMembership")[0];
    fireEvent.click(deleteAction);
    fireEvent.click(editAction);
    expect(props.actions.deleteMembership).toHaveBeenCalledWith(props.memberships[0]);
    expect(props.actions.editMembership).toHaveBeenCalledWith(props.memberships[0]);
  });

  it("should render the action tooltips if they are allowed", () => {
    const {getAllByText} = render(<MembershipsTable {...props}/>);
    expect(getAllByText("Remove Member")).toHaveLength(2);
    expect(getAllByText("Edit Roles")).toHaveLength(2);
  });

  it("should render the pagination component", () => {
    const {getByTestId} = render(<MembershipsTable {...props}/>);
    expect(getByTestId("projectMembershipsPagination")).toBeDefined();
  });

  it("should call the getPage method when paginating", () => {
    const {getByTestId} = render(<MembershipsTable {...props}/>);
    const nextPage = getByTestId("projectMembershipsPagination.next");
    fireEvent.click(nextPage);
    expect(props.pagination.getPage).toHaveBeenCalledWith(2);
  });
});
