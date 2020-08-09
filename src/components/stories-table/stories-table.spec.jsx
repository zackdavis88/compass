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

  // TODO: After component updates; it should render additional Actions if userPermissions are present.

  it("should call an view story action if clicked", () => {
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
