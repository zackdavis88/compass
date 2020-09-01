import React from "react";
import ProjectCollapsibleList from "./project-collapsible-list";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<ProjectCollapsibleList />", () => {
  let props;
  beforeEach(() => {
    props = {
      projects: [{
        id: "testProject1",
        name: "Some Name",
        isPrivate: true,
        createdOn: "2020-08-01T19:08:37.237Z",
        roles: {
          isAdmin: true
        }
      }, {
        id: "testProject2",
        name: "Another Name",
        isPrivate: false,
        createdOn: "2020-08-05T12:00:37.237Z",
        updatedOn: "2020-08-07T12:00:37.237Z",
        roles: {
          isDeveloper: true
        }
      }],
      actions: {
        addMember:jest.fn(),
        addStory:jest.fn(),
        viewDetails:jest.fn(),
        viewConfigs:jest.fn()
      },
      pagination: {
        page: 1,
        totalPages: 5,
        itemsPerPage: 10,
        getPage: jest.fn()
      },
      dataTestId: "unitTestProjectList"
    };
  });

  it("should mount the component", () => {
    const component = render(<ProjectCollapsibleList {...props} />);
    expect(component).toBeDefined();
  });

  it("should render a default message is there are no projects", () => {
    props.projects = [];
    const {getByText} = render(<ProjectCollapsibleList {...props} />);
    expect(getByText("There are no projects to display")).toBeDefined();
  });

  it("should render a collapsible panel for each project", () => {
    const {getByTestId} = render(<ProjectCollapsibleList {...props} />);
    expect(getByTestId(`${props.dataTestId}.collapsible.0`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.collapsible.1`)).toBeDefined();
  });

  it("should render the data for each project", () => {
    const {getByText} = render(<ProjectCollapsibleList {...props} />);
    expect(getByText("testProject1")).toBeDefined();
    expect(getByText("Some Name")).toBeDefined();
    expect(getByText("Private")).toBeDefined();
    expect(getByText("Admin")).toBeDefined();
    expect(getByText("Aug 1, 2020")).toBeDefined();

    expect(getByText("testProject2")).toBeDefined();
    expect(getByText("Another Name")).toBeDefined();
    expect(getByText("Public")).toBeDefined();
    expect(getByText("Developer")).toBeDefined();
    expect(getByText("Aug 5, 2020")).toBeDefined();
    expect(getByText("Aug 7, 2020")).toBeDefined();
  });

  it("should render the expected projects actions", () => {
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    expect(getAllByTestId("action.addMember")).toHaveLength(2);
    expect(getAllByTestId("action.addStory")).toHaveLength(2);
    expect(getAllByTestId("action.viewProjectConfigs")).toHaveLength(2);
    expect(getAllByTestId("action.viewProject")).toHaveLength(2);
  });

  it("should call actions.addMember when the add member action is clicked with permissions", () => {
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const addMemberAction = getAllByTestId("action.addMember")[0];
    fireEvent.click(addMemberAction);
    expect(props.actions.addMember).toHaveBeenCalledWith(props.projects[0], true);
  });

  it("should call actions.addStory when the add story action is clicked with permissions", () => {
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const addStoryAction = getAllByTestId("action.addStory")[0];
    fireEvent.click(addStoryAction);
    expect(props.actions.addStory).toHaveBeenCalledWith(props.projects[0]);
  });

  it("should call actions.viewConfigs when the view configs action is clicked with permissions", () => {
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const viewConfigsAction = getAllByTestId("action.viewProjectConfigs")[0];
    fireEvent.click(viewConfigsAction);
    expect(props.actions.viewConfigs).toHaveBeenCalledWith(props.projects[0]);
  });

  it("should call actions.viewProject when the view project action is clicked with permissions", () => {
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const viewProjectAction = getAllByTestId("action.viewProject")[0];
    fireEvent.click(viewProjectAction);
    expect(props.actions.viewDetails).toHaveBeenCalledWith(props.projects[0]);
  });

  it("should not call actions.addMember if clicked with insufficient permission", () => {
    props.projects[0].roles = {};
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const addMemberAction = getAllByTestId("action.addMember")[0];
    fireEvent.click(addMemberAction);
    expect(props.actions.addMember).not.toHaveBeenCalled();
  });

  it("should not call actions.addStory if clicked with insufficient permission", () => {
    props.projects[0].roles = {};
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const addStoryAction = getAllByTestId("action.addStory")[0];
    fireEvent.click(addStoryAction);
    expect(props.actions.addStory).not.toHaveBeenCalled();
  });

  it("should not call actions.viewConfigs if clicked with insufficient permission", () => {
    props.projects[0].roles = {};
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const viewConfigsAction = getAllByTestId("action.viewProjectConfigs")[0];
    fireEvent.click(viewConfigsAction);
    expect(props.actions.viewConfigs).not.toHaveBeenCalled();
  });

  it("should not call actions.viewDetails if clicked with insufficient permission", () => {
    props.projects[0].roles = {};
    const {getAllByTestId} = render(<ProjectCollapsibleList {...props} />);
    const viewDetailsAction = getAllByTestId("action.viewProject")[0];
    fireEvent.click(viewDetailsAction);
    expect(props.actions.viewDetails).not.toHaveBeenCalled();
  });

  it("should not render the pagination component if totalPages is 1 or below", () => {
    props.pagination.totalPages = 1;
    const {queryByTestId} = render(<ProjectCollapsibleList {...props} />);
    expect(queryByTestId("projectsPagination")).toBeNull();
  });

  it("should render the pagination component if totalPages is above 1", () => {
    const {queryByTestId} = render(<ProjectCollapsibleList {...props} />);
    expect(queryByTestId("projectsPagination")).toBeDefined();
  });

  it("should call pagination.getPage on page click", () => {
    const {getByTestId} = render(<ProjectCollapsibleList {...props} />);
    fireEvent.click(getByTestId("projectsPagination.next"));
    expect(props.pagination.getPage).toHaveBeenCalledWith(2);
  });
});
