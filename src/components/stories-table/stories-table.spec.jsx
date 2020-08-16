import React from "react";
import StoriesTable from "./stories-table";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<StoriesTable />", () => {
  let props;
  beforeEach(() => {
    props = {
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
      }],
      actions: {
        viewStory: jest.fn()
      },
      pagination: {
        page: 1,
        totalPages: 5,
        itemsPerPage: 10,
        getPage: jest.fn()
      }
    };
  });

  it("should mount the component", () => {
    const component = render(<StoriesTable {...props} />);
    expect(component).toBeDefined();
  });

  it("should render a message if there are no stories to display", () => {
    props.stories = [];
    const {getByText} = render(<StoriesTable {...props} />);
    expect(getByText("There are no stories to display")).toBeDefined();
  });

  it("should render the expected headers", () => {
    const {getByTestId, getByText} = render(<StoriesTable {...props}/>);
    expect(getByTestId("storiesTable")).toBeDefined();
    expect(getByTestId("storiesTable.table")).toBeDefined();
    expect(getByTestId("storiesTable.tableHead")).toBeDefined();
    expect(getByText("Name")).toBeDefined();
    expect(getByText("Project")).toBeDefined();
    expect(getByText("Owner")).toBeDefined();
    expect(getByText("Creator")).toBeDefined();
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render the story data for each header", () => {
    const {getByTestId, getByText, getAllByText} = render(<StoriesTable {...props} />);
    expect(getByTestId("storiesTable.tableBody")).toBeDefined();
    // Row 1 should be-
    expect(getByText("Test Story 1")).toBeDefined();
    expect(getByText("Test Project 1")).toBeDefined();;
    expect(getByText("Not Assigned")).toBeDefined();
    expect(getAllByText("testUser1")).toHaveLength(2);
    expect(getByText("Aug 13, 2020")).toBeDefined();

    // Row 2 should be-
    expect(getByText("Test Story 2")).toBeDefined();
    expect(getByText("Test Project 5")).toBeDefined();
    expect(getByText("testUser344")).toBeDefined();
    expect(getByText("Jan 13, 2019")).toBeDefined();
  });

  it("should render the action buttons for each row", () => {
    const {getAllByTestId} = render(<StoriesTable {...props} />);
    expect(getAllByTestId("action.viewStory")).toHaveLength(2);
  });

  it("should render the edit action if actions.editStory is present and user has permission", () => {
    props.actions.editStory = jest.fn();
    props.project = {id: "testProject", name: "test project", userRoles: {isDeveloper: true}};
    const {getAllByTestId} = render(<StoriesTable {...props} />);
    expect(getAllByTestId("action.editStory")).toHaveLength(2);
  });

  it("should not render the edit action if actions.editStory is present and user has no permission", () => {
    props.actions.editStory = jest.fn();
    props.project = {id: "testProject", name: "test project", userRoles: {isViewer: true}};
    const {queryAllByTestId} = render(<StoriesTable {...props} />);
    expect(queryAllByTestId("action.editStory")).toHaveLength(0);
  });

  it("should call an edit story action if clicked", () => {
    props.actions.editStory = jest.fn();
    props.project = {id: "testProject", name: "test project", userRoles: {isDeveloper: true}};
    const {getAllByTestId} = render(<StoriesTable {...props} />);
    const editButton = getAllByTestId("action.editStory")[0];
    fireEvent.click(editButton);
    expect(props.actions.editStory).toHaveBeenCalledWith({
      ...props.stories[0],
      project: {
        id: props.project.id,
        name: props.project.name,
        userRoles: props.project.userRoles
      }
    });
  });

  it("should render the delete action if actions.deleteStory is present and user has permission", () => {
    props.actions.deleteStory = jest.fn();
    props.project = {id: "testProject", name: "test project", userRoles: {isDeveloper: true}};
    const {getAllByTestId} = render(<StoriesTable {...props} />);
    expect(getAllByTestId("action.deleteStory")).toHaveLength(2);
  });

  it("should not render the delete action if actions.deleteStory is present and user has no permission", () => {
    props.actions.deleteStory = jest.fn();
    props.project = {id: "testProject", name: "test project", userRoles: {isViewer: true}};
    const {queryAllByTestId} = render(<StoriesTable {...props} />);
    expect(queryAllByTestId("action.deleteStory")).toHaveLength(0);
  });

  it("should call an delete story action if clicked", () => {
    props.actions.deleteStory = jest.fn();
    props.project = {id: "testProject", name: "test project", userRoles: {isDeveloper: true}};
    const {getAllByTestId} = render(<StoriesTable {...props} />);
    const deleteButton = getAllByTestId("action.deleteStory")[0];
    fireEvent.click(deleteButton);
    expect(props.actions.deleteStory).toHaveBeenCalledWith({
      ...props.stories[0],
      project: {
        id: props.project.id,
        name: props.project.name,
        userRoles: props.project.userRoles
      }
    });
  });

  it("should call a view story action if clicked", () => {
    const {getAllByTestId} = render(<StoriesTable {...props} />);
    const viewStory = getAllByTestId("action.viewStory")[0];
    fireEvent.click(viewStory);
    expect(props.actions.viewStory).toHaveBeenCalledWith(props.stories[0]);
  });

  it("should render the action tooltips", () => {
    const {getAllByText} = render(<StoriesTable {...props}/>);
    expect(getAllByText("View Story")).toHaveLength(2);
  });

  it("should render the pagination component", () => {
    const {getByTestId} = render(<StoriesTable {...props}/>);
    expect(getByTestId("storiesTablePagination")).toBeDefined();
  });

  it("should call the getPage method when paginating", () => {
    const {getByTestId} = render(<StoriesTable {...props}/>);
    const nextPage = getByTestId("storiesTablePagination.next");
    fireEvent.click(nextPage);
    expect(props.pagination.getPage).toHaveBeenCalledWith(2);
  });
});
