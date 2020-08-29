import statusReducer from "./status";
import {
  getStatus,
  getAllStatus,
  createStatus,
  updateStatus,
  deleteStatus,
  getAllStatusNames
} from "../../actions/status";
import {mockStore} from "../../../test-utils";
import {waitFor} from "@testing-library/react";

describe("Status Reducer / Actions", () => {
  let store;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false
    };

    store = mockStore({
      status: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = statusReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the STATUS_REQUEST_START action type", () => {
    const result = statusReducer(undefined, {type: "STATUS_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set isLoading to false for the STATUS_REQUEST_SUCCESS action type", () => {
    const result = statusReducer(undefined, {
      type: "STATUS_REQUEST_SUCCESS"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should set isLoading to false for the STATUS_REQUEST_FAILURE action type", () => {
    const result = statusReducer(undefined, {
      type: "STATUS_REQUEST_FAILURE"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should dispatch a redux API call to create a status", async () => {
    store.dispatch(createStatus({id: "testProjectId"}, "testStatus", "#000000"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STATUS_REQUEST_START");
    const expectedTypes = ["STATUS_REQUEST_SUCCESS", "STATUS_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to update a status", async () => {
    store.dispatch(updateStatus({id: "testProjectId"}, {id: "testStatusId"}, "testStatus", "#000000"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STATUS_REQUEST_START");
    const expectedTypes = ["STATUS_REQUEST_SUCCESS", "STATUS_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to delete a status", async () => {
    store.dispatch(deleteStatus({id: "testStatusId", project: {id: "testProjectId"}}));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STATUS_REQUEST_START");
    const expectedTypes = ["STATUS_REQUEST_SUCCESS", "STATUS_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get a paginated list of status", async () => {
    store.dispatch(getAllStatus("testProjectId", 1, 10));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STATUS_REQUEST_START");
    const expectedTypes = ["STATUS_REQUEST_SUCCESS", "STATUS_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get a status", async () => {
    store.dispatch(getStatus("testProjectId", "testStatusId"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STATUS_REQUEST_START");
    const expectedTypes = ["STATUS_REQUEST_SUCCESS", "STATUS_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get all status names", async () => {
    store.dispatch(getAllStatusNames({id: "testProjectId"}));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("STATUS_REQUEST_START");
    const expectedTypes = ["STATUS_REQUEST_SUCCESS", "STATUS_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
