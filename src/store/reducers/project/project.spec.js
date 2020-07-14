import projectReducer from "./project";
import {createProject, updateProject} from "../../actions/project";
import {mockStore} from "../../../test-utils";
import { waitFor } from "@testing-library/react";

describe("Project Reducer / Actions", () => {
  let store;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false
    };

    store = mockStore({
      project: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = projectReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the PROJECT_REQUEST_START action type", () => {
    const result = projectReducer(undefined, {type: "PROJECT_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set isLoading to false for the PROJECT_REQUEST_SUCCESS action type", () => {
    const result = projectReducer(undefined, {
      type: "PROJECT_REQUEST_SUCCESS"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should set isLoading to false for the PROJECT_REQUEST_FAILURE action type", () => {
    const result = projectReducer(undefined, {
      type: "PROJECT_REQUEST_FAILURE"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should dispatch a redux API call to create a project", async () => {
    store.dispatch(createProject("unit test project", "", false));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    // First action should be the REQUEST
    expect(store.getActions()[0].type).toBe("PROJECT_REQUEST_START");

    // Second action is expected to be SUCCESS or FAILURE
    const expectedTypes = ["PROJECT_REQUEST_SUCCESS", "PROJECT_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to update a project", async () => {
    store.dispatch(updateProject("someTestId", "unit test project", "", false));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("PROJECT_REQUEST_START");

    const expectedTypes = ["PROJECT_REQUEST_SUCCESS", "PROJECT_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
