import React from "react";
import StoryDetails from "./story-details";
import { render, mockStore } from "../../test-utils";
import {waitFor, fireEvent} from "@testing-library/react";

describe("<StoryDetails />", () => {
  let store;
  let props;
  const mockStoryResponse = {
    story: {
      id: "testStoryId",
      name: "Unit test story",
      details: "This is a unit test story.",
      points: 7,
      project: {
        id: "testProjectId",
        name: "Unit test project",
        userRoles: {
          isAdmin: true
        }
      },
      creator: {
        displayName: "testUser1287"
      },
      owner: {
        displayName: "testUser091123"
      },
      priority: {
        name: "Test Priority",
        color: "#091cda"
      },
      createdOn: "2020-08-01T23:27:33.147Z",
      updatedOn: "2020-08-03T23:27:33.147Z"
    }
  };
  beforeEach(() => {
    props = {
      match: {
        params: {
          projectId: "testProjectId",
          storyId: "testStoryId"
        }
      }
    };
    store = mockStore({
      auth: {
        user: {
          displayName: "unitTestUser"
        }
      },
      story: {
        isLoading: false
      }
    });
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce(mockStoryResponse);
  });

  it("should mount the component", async() => {
    const component = render(<StoryDetails {...props} />, store);
    expect(component).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
  });

  it("should render the loading spinner when awaiting API data", async() => {
    store.dispatch = jest.fn()
    store.dispatch.mockReturnValueOnce(undefined);
    const {getByTestId, getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByTestId("storyDetailsLoader")).toBeDefined();
    expect(getByText("Loading story details")).toBeDefined();
  });

  it("should render the story details page header", async() => {
    const {getByTestId, getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByTestId("storyDetailsHeader")).toBeDefined();
    expect(getByText(`Story Details`)).toBeDefined();
  });

  it("should render the story details tab", async() => {
    const {getByTestId, getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByTestId("storyDetailsTabs")).toBeDefined();
    expect(getByText("Details")).toBeDefined();
  });

  it("should render the story ID under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText(mockStoryResponse.story.id)).toBeDefined();
  });

  it("should render the story name under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText(mockStoryResponse.story.name)).toBeDefined();
  });

  it("should render the story details, if present, under the details tab", async() => {
    const {getByText, getByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Full Details")).toBeDefined();
    expect(getByText(mockStoryResponse.story.details)).toBeDefined();
    expect(getByTestId("storyMarkdownText")).toBeDefined();
  });

  it("should render default text if story details are empty", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, details: null}})
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Full Details")).toBeDefined();
    expect(getByText("This story has no additional details.")).toBeDefined();
  });

  it("should render the story's parent project under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Project")).toBeDefined();
    expect(getByText("Unit test project")).toBeDefined();
  });

  it("should parent project's details page when clicked", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    const projectLink = getByText("Unit test project");
    fireEvent.click(projectLink);
    expect(store.dispatch).toHaveBeenLastCalledWith({
      payload: {
        args: ["/projects/testProjectId"],
        method: "push"
      },
      type: "@@router/CALL_HISTORY_METHOD"
    });
  });

  it("should render the story creator under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Created By")).toBeDefined();
    expect(getByText("testUser1287")).toBeDefined();
  });

  it("should render default text if creator is not found", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, creator: null}});
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Created By")).toBeDefined();
    expect(getByText("Creator Not Found")).toBeDefined();
  });

  it("should render the story owner under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Assigned To")).toBeDefined();
    expect(getByText("testUser091123")).toBeDefined();
  });

  it("should render default text if owner is not found", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, owner: null}});
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Assigned To")).toBeDefined();
    expect(getByText("Not Assigned")).toBeDefined();
  });

  it("should render the story create date under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Create Date")).toBeDefined();
    expect(getByText("Aug 1, 2020")).toBeDefined();
  });

  it("should render the story update date under the details tab", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Last Modified")).toBeDefined();
    expect(getByText("Aug 3, 2020")).toBeDefined();
  });

  it("should not render the story update date if one is not provided", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, updatedOn: null}});
    const {queryByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(queryByText("Last Modified")).toBeNull();
  });

  it("should render a page error if API returns an error", async() => {
    store.dispatch = jest.fn().mockReturnValueOnce({error: "something went wrong"});
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("something went wrong")).toBeDefined();
  });

  it("should render the actions menu component for admins/managers/developers", async() => {
    const {getByText, getByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByTestId("storyDetailsActionsMenu")).toBeDefined();
    expect(getByText("Actions")).toBeDefined();
  });

  it("should not render the actions menu component for viewers", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({
      story: {
        ...mockStoryResponse.story, 
        project: {
          ...mockStoryResponse.story.project,
          userRoles: {isViewer: true}
        }
      }
    });
    const {queryByText, queryByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(queryByTestId("storyDetailsActionsMenu")).toBeNull();
    expect(queryByText("Actions")).toBeNull();
  });

  it("should not render the actions menu component for non-members", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({
      story: {
        ...mockStoryResponse.story, 
        project: {
          ...mockStoryResponse.story.project,
          userRoles: null
        }
      }
    });
    const {queryByText, queryByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(queryByTestId("storyDetailsActionsMenu")).toBeNull();
    expect(queryByText("Actions")).toBeNull();
  });
  
  it("should render the 'Delete Story' action under the actions menu", async() => {
    const {getByText, getByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    const actionsMenu = getByTestId("storyDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("Delete Story")).toBeDefined();
  });

  it("should render the delete story modal when 'Delete Story' is clicked", async() => {
    const {getByText, getByTestId, queryByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    const actionsMenu = getByTestId("storyDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    const deleteAction = getByText("Delete Story");
    expect(queryByTestId("storyDeleteModal.wrapper")).toBeNull();
    fireEvent.click(deleteAction);
    expect(queryByTestId("storyDeleteModal.wrapper")).toBeDefined();
  });

  it("should render the 'Edit Story' action under the actions menu", async() => {
    const {getByText, getByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    const actionsMenu = getByTestId("storyDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    expect(getByText("Edit Story")).toBeDefined();
  });

  it("should render the edit story modal when 'Edit Story' is clicked", async() => {
    const {getByText, getByTestId, queryByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    const actionsMenu = getByTestId("storyDetailsActionsMenu");
    fireEvent.click(actionsMenu);
    const editAction = getByText("Edit Story");
    expect(queryByTestId("storyModal.wrapper")).toBeNull();
    store.dispatch.mockReturnValueOnce({}); // rendering this modal calls a redux action. mock that response before render.
    store.dispatch.mockReturnValueOnce({});
    fireEvent.click(editAction);
    expect(queryByTestId("storyModal.wrapper")).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
  });

  it("should render the priority if one is provided", async() => {
    const {queryByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(queryByText("Priority")).toBeDefined();
    expect(queryByText("Test Priority")).toBeDefined();
  });

  it("should render the points if provided", async() => {
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Points")).toBeDefined();
    expect(getByText("7")).toBeDefined();
  });

  it("should render 'None' if there are no points assigned", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, points: undefined}});
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Points")).toBeDefined();
    expect(getByText("None")).toBeDefined();
  });

  it("should render 'None' if there is no priority assigned", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, priority: undefined}});
    const {getByText} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Priority")).toBeDefined();
    expect(getByText("None")).toBeDefined();
  });

  it("should call the updateStory redux action when a markdown checkbox is clicked", async() => {
    store.dispatch = jest.fn();
    store.dispatch.mockReturnValueOnce({story: {...mockStoryResponse.story, details: "- [ ] A CheckBox"}});
    const {getByTestId} = render(<StoryDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    let checkboxElement = getByTestId("markdownCheckbox.0.input");
    expect(checkboxElement).not.toBeChecked();
    store.dispatch.mockReturnValueOnce({});
    fireEvent.click(checkboxElement);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    checkboxElement = getByTestId("markdownCheckbox.0.input"); // the Markdown library we use will rerender a brand new checkbox component...we have to requery for it.
    expect(checkboxElement).toBeChecked();
  });
});
