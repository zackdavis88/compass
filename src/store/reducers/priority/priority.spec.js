import priorityReducer from "./priority";
import {
  getPriority,
  getPriorities,
  createPriority,
  updatePriority,
  deletePriority
} from "../../actions/priority";
import {mockStore} from "../../../test-utils";
import {waitFor} from "@testing-library/react";

describe("Priority Reducer / Actions", () => {
  let store;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false
    };

    store = mockStore({
      priority: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = priorityReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the PRIORITY_REQUEST_START action type", () => {
    const result = priorityReducer(undefined, {type: "PRIORITY_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set isLoading to false for the PRIORITY_REQUEST_SUCCESS action type", () => {
    const result = priorityReducer(undefined, {
      type: "PRIORITY_REQUEST_SUCCESS"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should set isLoading to false for the PRIORITY_REQUEST_FAILURE action type", () => {
    const result = priorityReducer(undefined, {
      type: "PRIORITY_REQUEST_FAILURE"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should dispatch a redux API call to create a priority", async () => {
    store.dispatch(createPriority({id: "testProjectId"}, "testPriority", "#000000"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("PRIORITY_REQUEST_START");
    const expectedTypes = ["PRIORITY_REQUEST_SUCCESS", "PRIORITY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to update a priority", async () => {
    store.dispatch(updatePriority({id: "testProjectId"}, {id: "testPriorityId"}, "testPriority", "#000000"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("PRIORITY_REQUEST_START");
    const expectedTypes = ["PRIORITY_REQUEST_SUCCESS", "PRIORITY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to delete a priority", async () => {
    store.dispatch(deletePriority({id: "testPriorityId", project: {id: "testProjectId"}}));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("PRIORITY_REQUEST_START");
    const expectedTypes = ["PRIORITY_REQUEST_SUCCESS", "PRIORITY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get a paginated list of priorities", async () => {
    store.dispatch(getPriorities("testProjectId", 1, 10));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("PRIORITY_REQUEST_START");
    const expectedTypes = ["PRIORITY_REQUEST_SUCCESS", "PRIORITY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get a priority", async () => {
    store.dispatch(getPriority("testProjectId", "testPriorityId"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("PRIORITY_REQUEST_START");
    const expectedTypes = ["PRIORITY_REQUEST_SUCCESS", "PRIORITY_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
