import React from "react";
import ProjectDetails from "./project-details";
import { render, mockStore } from "../../test-utils";
import {waitFor, fireEvent} from "@testing-library/react";

describe("<ProjectDetails />", () => {
  let store;
  let props;
  beforeEach(() => {
    props = {
      match: {
        params: {
          projectId: "testProjectId"
        }
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
      }
    });
    store.dispatch = jest.fn().mockReturnValueOnce({
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
      }
    });
  });

  it("should mount the component", async() => {
    const component = render(<ProjectDetails {...props} />, store);
    expect(component).toBeDefined();
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
  });

  it("should render the loading spinner when awaiting API data", async() => {
    store = mockStore({
      auth: {
        user: {
          displayName: "unitTestUser"
        }
      },
      project: {
        isLoading: true
      }
    });
    store.dispatch = jest.fn().mockReturnValueOnce({});
    const {getByTestId, getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByTestId("projectDetailsLoader")).toBeDefined();
    expect(getByText("Loading project details")).toBeDefined();
  });

  it("should render the project details, members, and backlog tabs", async() => {
    const {getByTestId, getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByTestId("projectDetailsTabs")).toBeDefined();
    expect(getByText("Details")).toBeDefined();
    expect(getByText("Members")).toBeDefined();
    expect(getByText("Backlog")).toBeDefined();
  });

  it("should render the project ID under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("testProjectId")).toBeDefined();
  });

  it("should render the project name under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Unit Test Project")).toBeDefined();
  });

  it("should render the public label under the details tab if the project is public", async() => {
    store.dispatch = jest.fn().mockReturnValueOnce({
      project: {
        id: "testProjectId",
        name: "Unit Test Project",
        description: "this is a test description",
        isPrivate: false,
        createdOn: "2020-08-01T23:27:33.147Z",
        updatedOn: "2020-08-05T23:27:33.147Z",
        statistics: {
          memberships: 15,
          stories: 150
        }
      }
    });
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Public")).toBeDefined();
  });

  it("should render the private label under the details tab if the project is private", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Private")).toBeDefined();
  });

  it("should render the project description, if present, under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Description")).toBeDefined();
    expect(getByText("this is a test description")).toBeDefined();
  });

  it("should render the project create date under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Created On")).toBeDefined();
    expect(getByText("Aug 1, 2020")).toBeDefined();
  });

  it("should render the project update date under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Updated On")).toBeDefined();
    expect(getByText("Aug 5, 2020")).toBeDefined();
  });

  it("should render the project total members under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Total Members")).toBeDefined();
    expect(getByText("15")).toBeDefined();
  });

  it("should render the project total stories under the details tab", async() => {
    const {getByText} = render(<ProjectDetails {...props} />, store);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalled());
    expect(getByText("Total Stories")).toBeDefined();
    expect(getByText("150")).toBeDefined();
  });
});
