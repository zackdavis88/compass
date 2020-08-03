import membershipReducer from "./membership";
import {createMembership, getAvailableUsers, getMemberships, deleteMembership} from "../../actions/membership";
import {mockStore} from "../../../test-utils";
import { waitFor } from "@testing-library/react";

describe("Membership Reducer / Actions", () => {
  let store;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false
    };

    store = mockStore({
      membership: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = membershipReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the MEMBERSHIP_REQUEST_START action type", () => {
    const result = membershipReducer(undefined, {type: "MEMBERSHIP_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set isLoading to false for the MEMBERSHIP_REQUEST_SUCCESS action type", () => {
    const result = membershipReducer(undefined, {
      type: "MEMBERSHIP_REQUEST_SUCCESS"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should set isLoading to false for the MEMBERSHIP_REQUEST_FAILURE action type", () => {
    const result = membershipReducer(undefined, {
      type: "MEMBERSHIP_REQUEST_FAILURE"
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should dispatch a redux API call to create a membership", async () => {
    store.dispatch(createMembership("testProjectId", "testUsername", {isAdmin: true}));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("MEMBERSHIP_REQUEST_START");
    const expectedTypes = ["MEMBERSHIP_REQUEST_SUCCESS", "MEMBERSHIP_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get available users for membership", async () => {
    store.dispatch(getAvailableUsers("testProjectId"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("MEMBERSHIP_REQUEST_START");
    const expectedTypes = ["MEMBERSHIP_REQUEST_SUCCESS", "MEMBERSHIP_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get a project's memberships", async () => {
    store.dispatch(getMemberships("testProjectId"));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("MEMBERSHIP_REQUEST_START");
    const expectedTypes = ["MEMBERSHIP_REQUEST_SUCCESS", "MEMBERSHIP_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to delete a project's memberships", async () => {
    store.dispatch(deleteMembership({id: "someMemberId", project: {id: "someProjectId"}}));
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("MEMBERSHIP_REQUEST_START");
    const expectedTypes = ["MEMBERSHIP_REQUEST_SUCCESS", "MEMBERSHIP_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
