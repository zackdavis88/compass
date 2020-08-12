import React from "react";
import ProjectDetails from "./project-details";
import { render, mockStore } from "../../test-utils";
import {waitFor, fireEvent} from "@testing-library/react";

describe("<ProjectDetails />", () => {
  let store;
  let props;
  const mockMembershipsResponse = {
    page: 1,
    totalPages: 1,
    itemsPerPage: 10,
    memberships: [{
      id: "testMembershipId1",
      user: {
        displayName: "testMember1",
      },
      roles: {
        isAdmin: true,
        isManager: false,
        isDeveloper: false,
        isViewer: true
      },
      createdOn: "2020-08-01T23:27:34.147Z"
    }, {
      id: "testMembershipId2",
      user: {
        displayName: "testMember2",
      },
      roles: {
        isAdmin: false,
        isManager: false,
        isDeveloper: true,
        isViewer: true
      },
      createdOn: "2020-08-04T23:27:34.147Z"
    }]
  };
  const mockProjectResponse = {
    project: {
      id: "testProjectId",
      name: "Unit Test Project",
      description: "this is a test description",
      isPrivate: true,
      createdOn: "2020-08-01T23:27:33.147Z",
      updatedOn: "2020-08-05T23:27:33.147Z",
      statistics: {
        memberships: 15,
        stories: 150
      }
    },
    userRoles: {
      isAdmin: true,
      isManager: false,
      isDeveloper: false,
      isViewer: false
    }
  };
  const mockStoriesResponse = {
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
    props = {
      match: {
        params: {
          projectId: "testProjectId"
        }
      },
      location: {
        search: ""
      }
    };
    store = mockStore({
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
    store.dispatch.mockReturnValueOnce(mockProjectResponse);
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
  });

  it("should mount the component", async() => {
    const component = render(<ProjectDetails {...props} />, store);
    expect(component).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
  });

  it("should render the loading spinner when awaiting API data", async() => {
    store.dispatch = jest.fn()
    store.dispatch.mockReturnValueOnce(undefined)
    store.dispatch.mockReturnValueOnce(undefined)
    store.dispatch.mockReturnValueOnce(undefined);
    const {getByTestId, getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectDetailsLoader")).toBeDefined();
    expect(getByText("Loading project details")).toBeDefined();
  });

  it("should render the project details page header", async() => {
    const {getByTestId, getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectDetailsHeader")).toBeDefined();
    expect(getByText(`Project - Unit Test Project`)).toBeDefined();
  });

  it("should render the project details, members, and backlog tabs", async() => {
    const {getByTestId, getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectDetailsTabs")).toBeDefined();
    expect(getByText("Details")).toBeDefined();
    expect(getByText("Members")).toBeDefined();
    expect(getByText("Backlog")).toBeDefined();
  });

  it("should render the project ID under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("testProjectId")).toBeDefined();
  });

  it("should render the project name under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Unit Test Project")).toBeDefined();
  });

  it("should render the public label under the details tab if the project is public", async() => {
    store.dispatch = jest.fn().mockReturnValueOnce({
      ...mockProjectResponse,
      project: {
        ...mockProjectResponse.project,
        isPrivate: false
      }
    }).mockReturnValueOnce(mockMembershipsResponse).mockReturnValueOnce(mockStoriesResponse);
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Public")).toBeDefined();
  });

  it("should render the private label under the details tab if the project is private", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Private")).toBeDefined();
  });

  it("should render the project description, if present, under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Description")).toBeDefined();
    expect(getByText("this is a test description")).toBeDefined();
  });

  it("should render the project create date under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Create Date")).toBeDefined();
    expect(getByText("Aug 1, 2020")).toBeDefined();
  });

  it("should render the project update date under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Last Modified")).toBeDefined();
    expect(getByText("Aug 5, 2020")).toBeDefined();
  });

  it("should not render the project update date if one is not provided", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({
      ...mockProjectResponse,
      project: {
        ...mockProjectResponse.project,
        updatedOn: undefined
      }
    });
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {queryByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByText("Last Modified")).toBeNull();
  });

  it("should render the project total members under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Total Members")).toBeDefined();
    expect(getByText("15")).toBeDefined();
  });

  it("should render the project total stories under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("Total Stories")).toBeDefined();
    expect(getByText("150")).toBeDefined();
  });

  it("should render a page error if API returns an error", async() => {
    store.dispatch = jest.fn().mockReturnValueOnce({error: "something went wrong"});
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByText("something went wrong")).toBeDefined();
  });

  it("should render a message if there are no members to display", async() => {
    store.dispatch = jest.fn().mockReturnValueOnce(mockProjectResponse);
    store.dispatch.mockReturnValueOnce({memberships: []});
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {getByText, queryByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const membersTab = getByText("Members");
    expect(queryByText("This project has no members")).toBeNull();
    fireEvent.click(membersTab);
    expect(queryByText("This project has no members")).toBeDefined();
  });

  it("should render a the memberships table is the members tab is clicked", async() => {
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const membersTab = getByText("Members");
    fireEvent.click(membersTab);
    expect(getByTestId("projectMemberships")).toBeDefined();
  });

  it("should show the delete membership modal if the action is clicked with sufficient permission", async() => {
    const {getByText, getAllByTestId, queryByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const membersTab = getByText("Members");
    fireEvent.click(membersTab);
    const deleteAction = getAllByTestId("action.deleteMembership")[1];
    expect(queryByTestId("membershipDeleteModal.wrapper")).toBeNull();
    fireEvent.click(deleteAction);
    expect(queryByTestId("membershipDeleteModal.wrapper")).toBeDefined();
  });

  it("should show the edit membership modal if the action is clicked with sufficient permission", async() => {
    const {getByText, getAllByTestId, queryByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const membersTab = getByText("Members");
    fireEvent.click(membersTab);
    const editAction = getAllByTestId("action.editMembership")[1];
    expect(queryByTestId("membershipModal.wrapper")).toBeNull();
    fireEvent.click(editAction);
    expect(queryByTestId("membershipModal.wrapper")).toBeDefined();
  });

  it("should render the actions menu component for admins/managers", async() => {
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(getByTestId("projectDetailsActionsMenu")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should not render the actions menu component for viewers", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(Object.assign({}, mockProjectResponse, {userRoles: {isAdmin: false, isViewer: true}}));
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {queryByText, queryByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    expect(queryByTestId("projectDetailsActionsMenu")).toBeNull();
    expect(queryByText("Actions")).toBeNull();
  });
  
  it("should render the 'Delete Project' action if the user has admin permissions", async() => {
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("Delete Project")).toBeDefined();
  });

  it("should not render the 'Delete Project' action if the user has non-admin permissions", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(Object.assign({}, mockProjectResponse, {userRoles: {isAdmin: false, isManager: true}}));
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {queryByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(queryByText("Delete Project")).toBeNull();
  });

  it("should render the delete project modal when 'Delete Project' is clicked", async() => {
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    const deleteItem = getByText("Delete Project");
    fireEvent.click(deleteItem);
    expect(getByTestId("projectDeleteModal.wrapper")).toBeDefined();
  });

  it("should render the 'Edit Project' action if the user has admin/manager permissions", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(Object.assign({}, mockProjectResponse, {userRoles: {isAdmin: false, isManager: true}}));
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("Edit Project")).toBeDefined();
  });

  it("should render the edit project modal when 'Edit Project' is clicked", async() => {
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    const editItem = getByText("Edit Project");
    fireEvent.click(editItem);
    expect(getByTestId("projectModal.wrapper")).toBeDefined();
  });


  it("should render the 'Add Member' action if the user has admin/manager permissions", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(Object.assign({}, mockProjectResponse, {userRoles: {isAdmin: false, isManager: true}}));
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("Add Member")).toBeDefined();
  });

  it("should render the 'New Story' action if the user has developer permissions", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(Object.assign({}, mockProjectResponse, {userRoles: {isDeveloper: true}}));
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("New Story")).toBeDefined();
  });

  it("should render the story modal when 'New Story' is clicked", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(Object.assign({}, mockProjectResponse, {userRoles: {isDeveloper: true}}));
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce(mockStoriesResponse);
    const {getByText, getByTestId, queryByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    store.dispatch.mockReturnValueOnce({});
    const newStoryAction = getByText("New Story");
    expect(queryByTestId("storyModal.wrapper")).toBeNull();
    fireEvent.click(newStoryAction);
    expect(queryByTestId("storyModal.wrapper")).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(4));
  });

  it("should render the add member modal when 'Add Member' is clicked", async() => {
    store.dispatch.mockReturnValueOnce({users: []});
    const {getByText, getByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const actionsMenu = getByTestId("projectDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    const editItem = getByText("Add Member");
    fireEvent.click(editItem);
    expect(getByTestId("membershipModal.wrapper")).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(4));
  });

  it("should render a message if there are no stories to display", async() => {
    store.dispatch = jest.fn().mockReturnValueOnce(mockProjectResponse);
    store.dispatch.mockReturnValueOnce(mockMembershipsResponse);
    store.dispatch.mockReturnValueOnce({...mockStoriesResponse, stories: []});
    const {getByText, queryByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const backlogTab = getByText("Backlog");
    expect(queryByText("This project has no stories")).toBeNull();
    fireEvent.click(backlogTab);
    expect(queryByText("This project has no stories")).toBeDefined();
  });

  it("should render a the stories table is the backlog tab is clicked", async() => {
    const {getByText, queryByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const backlogTab = getByText("Backlog");
    expect(queryByTestId("storiesTable")).toBeNull();
    fireEvent.click(backlogTab);
    expect(queryByTestId("storiesTable")).toBeDefined();
  });

  it("should show the delete story modal if the action is clicked with sufficient permission", async() => {
    const {getByText, getAllByTestId, queryByTestId} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(3));
    const backlogTab = getByText("Backlog");
    fireEvent.click(backlogTab);
    const deleteAction = getAllByTestId("action.deleteStory")[1];
    expect(queryByTestId("storyDeleteModal.wrapper")).toBeNull();
    fireEvent.click(deleteAction);
    expect(queryByTestId("storyDeleteModal.wrapper")).toBeDefined();
  });
});
