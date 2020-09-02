import React from "react";
import StoryCollapsibleList from "./story-collapsible-list";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<StoryCollapsibleList />", () => {
  let props;
  beforeEach(() => {
    props = {
      stories: [{
        id: "testStory1",
        name: "Update all unit tests.",
        project: {
          id: "testProject1",
          name: "Unit Test Project 1"
        },
        priority: {
          name: "Test Priority 1",
          color: "#000000"
        },
        status: {
          name: "Test Status 1",
          color: "#ffffff"
        },
        points: 35,
        creator: {
          displayName: "testUser1"
        },
        owner: {
          displayName: "testUser23"
        },
        createdOn: "2020-08-05T12:00:37.237Z",
        updatedOn: "2020-08-07T12:00:37.237Z"
      }, {
        id: "testStory2",
        name: "Add that one feature. You know the one.",
        project: {
          id: "testProject12",
          name: "Unit Test Project 12"
        },
        createdOn: "2020-09-01T12:00:37.237Z"
      }],
      actions: {
        viewDetails:jest.fn()
      },
      pagination: {
        page: 1,
        totalPages: 5,
        itemsPerPage: 10,
        getPage: jest.fn()
      },
      dataTestId: "unitTestStoryList"
    };
  });

  it("should mount the component", () => {
    const component = render(<StoryCollapsibleList {...props} />);
    expect(component).toBeDefined();
  });

  it("should render a default message is there are no stories", () => {
    props.stories = [];
    const {getByText} = render(<StoryCollapsibleList {...props} />);
    expect(getByText("There are no stories to display")).toBeDefined();
  });

  it("should render a collapsible panel for each story", () => {
    const {getByTestId} = render(<StoryCollapsibleList {...props} />);
    expect(getByTestId(`${props.dataTestId}.collapsible.0`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.collapsible.1`)).toBeDefined();
  });

  it("should render the data for each story", () => {
    const {getByText, getAllByText} = render(<StoryCollapsibleList {...props} />);
    expect(getByText("testStory1")).toBeDefined();
    expect(getAllByText("Update all unit tests.")).toHaveLength(2);
    expect(getByText("testProject1")).toBeDefined();
    expect(getByText("Unit Test Project 1")).toBeDefined();
    expect(getAllByText("Test Priority 1")).toHaveLength(2); // status/priority have a length of 2 because a decorator is also rendering this data.
    expect(getAllByText("Test Status 1")).toHaveLength(2);
    expect(getByText("35")).toBeDefined();
    expect(getByText("testUser1")).toBeDefined();
    expect(getByText("testUser23")).toBeDefined();
    expect(getByText("Aug 5, 2020")).toBeDefined();
    expect(getByText("Aug 7, 2020")).toBeDefined();

    expect(getByText("testStory2")).toBeDefined();
    expect(getAllByText("Add that one feature. You know the one.")).toHaveLength(2);
    expect(getByText("testProject12")).toBeDefined();
    expect(getByText("Unit Test Project 12")).toBeDefined();
    expect(getAllByText("None")).toHaveLength(3);
    expect(getByText("None Found")).toBeDefined();
    expect(getByText("Not Assigned")).toBeDefined();
    expect(getByText("Sep 1, 2020")).toBeDefined();
  });

  it("should render the expected story actions", () => {
    const {getAllByTestId} = render(<StoryCollapsibleList {...props} />);
    expect(getAllByTestId("action.viewStory")).toHaveLength(2);
  });

  it("should render the expected story action tooltip", () => {
    const {getAllByText} = render(<StoryCollapsibleList {...props} />);
    expect(getAllByText("View Story")).toHaveLength(2);
  });

  it("should call actions.viewStory when the view story action is clicked", () => {
    const {getAllByTestId} = render(<StoryCollapsibleList {...props} />);
    const viewStoryAction = getAllByTestId("action.viewStory")[0];
    fireEvent.click(viewStoryAction);
    expect(props.actions.viewDetails).toHaveBeenCalledWith(props.stories[0]);
  });

  it("should not render the pagination component if totalPages is 1 or below", () => {
    props.pagination.totalPages = 1;
    const {queryByTestId} = render(<StoryCollapsibleList {...props} />);
    expect(queryByTestId("storiesPagination")).toBeNull();
  });

  it("should render the pagination component if totalPages is above 1", () => {
    const {queryByTestId} = render(<StoryCollapsibleList {...props} />);
    expect(queryByTestId("storiesPagination")).toBeDefined();
  });

  it("should call pagination.getPage on page click", () => {
    const {getByTestId} = render(<StoryCollapsibleList {...props} />);
    fireEvent.click(getByTestId("storiesPagination.next"));
    expect(props.pagination.getPage).toHaveBeenCalledWith(2);
  });

  it("should render the project decorator for each story", () => {
    const {getByText} = render(<StoryCollapsibleList {...props}/>);
    expect(getByText("Project: Unit Test Project 1")).toBeDefined();
    expect(getByText("Project: Unit Test Project 12")).toBeDefined();
  });

  it("should set project data for each story if props.project is provided", () => {
    props.project = {id: "someProjectId111", name: "What-a-Project"};
    const {getAllByText} = render(<StoryCollapsibleList {...props}/>);
    expect(getAllByText("Project: What-a-Project")).toHaveLength(2); // decorators.
    expect(getAllByText("someProjectId111")).toHaveLength(2); // Project data.
    expect(getAllByText("What-a-Project")).toHaveLength(2);
  });

  it("should render action.deleteStory action when actions.deleteStory is present", () => {
    props.actions.deleteStory = jest.fn();
    const {getAllByTestId} = render(<StoryCollapsibleList {...props} />);
    expect(getAllByTestId("action.deleteStory")).toHaveLength(2);
  });

  it("should call actions.deleteStory action when ther action is clicked with permissions", () => {
    props.project = {id: "someProjectId111", name: "What-a-Project", userRoles: {isDeveloper: true}};
    props.actions.deleteStory = jest.fn();
    const {getAllByTestId} = render(<StoryCollapsibleList {...props} />);
    const deleteAction = getAllByTestId("action.deleteStory")[0];
    fireEvent.click(deleteAction);
    expect(props.actions.deleteStory).toHaveBeenCalledTimes(1);
    expect(props.actions.deleteStory).toHaveBeenCalledWith(props.stories[0]);
  });

  it("should not call actions.deleteStory action when ther action is clicked with no permission", () => {
    props.project = {id: "someProjectId111", name: "What-a-Project", userRoles: {isViewer: true}};
    props.actions.deleteStory = jest.fn();
    const {getAllByTestId} = render(<StoryCollapsibleList {...props} />);
    const deleteAction = getAllByTestId("action.deleteStory")[0];
    fireEvent.click(deleteAction);
    expect(props.actions.deleteStory).not.toHaveBeenCalled();

  });
  
  it("should render the delete action tooltip when the user has permissions", () => {
    props.project = {id: "someProjectId111", name: "What-a-Project", userRoles: {isDeveloper: true}};
    props.actions.deleteStory = jest.fn();
    const {getAllByText} = render(<StoryCollapsibleList {...props} />);
    expect(getAllByText("Delete Story")).toHaveLength(2);
  });
  
  it("should not render the delete action tooltip when the user has no permissions", () => {
    props.project = {id: "someProjectId111", name: "What-a-Project", userRoles: {isViewer: true}};
    props.actions.deleteStory = jest.fn();
    const {queryByText} = render(<StoryCollapsibleList {...props} />);
    expect(queryByText("Delete Story")).toBeNull();
  });
});
