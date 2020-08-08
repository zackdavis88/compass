import storyReducer from "./story";
import {mockStore} from "../../../test-utils";

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
});
