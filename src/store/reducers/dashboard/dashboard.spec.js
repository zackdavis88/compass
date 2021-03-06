import dashboardReducer from "./dashboard";
import {getDashboardProjects, getDashboardStories} from "../../actions/dashboard";
import {mockStore} from "../../../test-utils";
import { waitFor } from "@testing-library/react";

describe("Dashboard Reducer / Actions", () => {
  let store;
  let mockSuccessResponse;
  let mockFailureResponse;
  let expectedInitialState;
  beforeEach(() => {
    expectedInitialState = {
      isLoading: false,
      message: undefined,
      projects: [],
      stories: []
    };
    
    mockSuccessResponse = {
      body: {
        message: "test message success",
        projects: [{
          id: "some_test_id1",
          name: "test_project1",
        }, {
          id: "some_test_id2",
          name: "test_project2"
        }],
        stories: [{
          id: "some_test_id3",
          name: "test_story"
        }]
      }
    };

    mockFailureResponse = {
      response: {
        body: {
          error: "test message failure"
        }
      }
    };

    store = mockStore({
      dashboard: expectedInitialState,
      auth: {}
    });
  });

  it("should set the initial state to the expected values", () => {
    const result = dashboardReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set isLoading to true for the DASHBOARD_REQUEST_START action type", () => {
    const result = dashboardReducer(undefined, {type: "DASHBOARD_REQUEST_START"});
    expect(result).toEqual({...expectedInitialState, isLoading: true});
  });

  it("should set message, project, and stories data for the DASHBOARD_REQUEST_SUCCESS action type", () => {
    const result = dashboardReducer(undefined, {
      type: "DASHBOARD_REQUEST_SUCCESS",
      response: mockSuccessResponse
    });
    expect(result).toEqual({
      isLoading: false,
      message: mockSuccessResponse.body.message,
      projects: mockSuccessResponse.body.projects,
      stories: mockSuccessResponse.body.stories
    });
  });

  it("should isLoading to false for the DASHBOARD_REQUEST_FAILURE action type", () => {
    const result = dashboardReducer(undefined, {
      type: "DASHBOARD_REQUEST_FAILURE",
      error: mockFailureResponse
    });
    expect(result).toEqual({
      ...expectedInitialState,
      isLoading: false
    });
  });

  it("should dispatch a redux API call to get dashboard projects data", async () => {
    store.dispatch(getDashboardProjects());
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("DASHBOARD_REQUEST_START");
    const expectedTypes = ["DASHBOARD_REQUEST_SUCCESS", "DASHBOARD_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });

  it("should dispatch a redux API call to get dashboard stories data", async () => {
    store.dispatch(getDashboardStories());
    await waitFor(() => expect(store.getActions()).toHaveLength(2));
    expect(store.getActions()[0].type).toBe("DASHBOARD_REQUEST_START");
    const expectedTypes = ["DASHBOARD_REQUEST_SUCCESS", "DASHBOARD_REQUEST_FAILURE"];
    expect(expectedTypes.indexOf(store.getActions()[1].type)).toBeTruthy();
  });
});
