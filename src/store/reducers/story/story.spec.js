import storyReducer from "./story";
import {
  createStory,
  updateStory,
  getStories,
  deleteStory,
  getStory
} from "../../actions/story";
import {mockStore} from "../../../test-utils";
import {waitFor} from "@testing-library/react";

describe("Story Reducer / Actions", () => {
  let store;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false
    };

    store = mockStore({
      story: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = storyReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the STORY_REQUEST_START action type", () => {
    const result = storyReducer(undefined, {type: "STORY_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set isLoading to false for the STORY_REQUEST_SUCCESS action type", () => {
    const result = storyReducer(undefined, {
      type: "STORY_REQUEST_SUCCESS"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should set isLoading to false for the STORY_REQUEST_FAILURE action type", () => {
    const result = storyReducer(undefined, {
      type: "STORY_REQUEST_FAILURE"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should dispatch a redux API call to create a story", async () => {
    store.dispatch(createStory({id: "testProjectId"}, "testStory", "testDetails", "testOwner"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STORY_REQUEST_START");
  
    const expectedTypes = ["STORY_REQUEST_SUCCESS", "STORY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to update a story", async () => {
    store.dispatch(updateStory({id: "testProjectId"}, {id: "testProjectId"}, "testStory", "testDetails", "testOwner"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STORY_REQUEST_START");
    const expectedTypes = ["STORY_REQUEST_SUCCESS", "STORY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get all stories for a project", async () => {
    store.dispatch(getStories("testProjectId"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STORY_REQUEST_START");
    const expectedTypes = ["STORY_REQUEST_SUCCESS", "STORY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to delete a story", async () => {
    store.dispatch(deleteStory({id: "storyId", project: {id: "projectId"}}));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STORY_REQUEST_START");
    const expectedTypes = ["STORY_REQUEST_SUCCESS", "STORY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get a story", async () => {
    store.dispatch(getStory("testProject", "testStory"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STORY_REQUEST_START");
    const expectedTypes = ["STORY_REQUEST_SUCCESS", "STORY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
