import React from "react";
import Sidebar from "./sidebar";
import { render, mockStore } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<Sidebar />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      sidebar: {
        isOpen: true
      },
      router: {
        location: {}
      }
    });
    store.dispatch = jest.fn();
  });

  it("should mount the component", () => {
    const component = render(<Sidebar />, store);
    expect(component).toBeDefined();
  });

  it("should not render sidebar content when the sidebar is closed", () => {
    store = mockStore({
      sidebar: {
        isOpen: false
      },
      router: {
        location: {}
      }
    });
    const {queryByTestId} = render(<Sidebar />, store);
    expect(queryByTestId("sidebarContent")).toBeNull();
  });

  it("should render sidebar content, header, and footer when the sidebar is open", () => {
    const {getByTestId} = render(<Sidebar />, store);
    expect(getByTestId("sidebarContent")).toBeDefined();
    expect(getByTestId("sidebarHeader")).toBeDefined();
    expect(getByTestId("sidebarFooter")).toBeDefined();
  });

  it("should render the sidebar nav list and items", () => {
    const {getByTestId, getAllByTestId} = render(<Sidebar />, store);
    expect(getByTestId("sidebarNavList")).toBeDefined();
    expect(getAllByTestId("sidebarNavItem")).toHaveLength(2);
  });

  it("should dispatch a redux action to navigate to Login Page on nav item click", () => {
    const {getByText} = render(<Sidebar />, store);
    const loginPageNavItem = getByText("Login Page");
    fireEvent.click(loginPageNavItem);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "@@router/CALL_HISTORY_METHOD",
      payload: {method: "push", args: ["/"]}
    });
  });

  it("should dispatch a redux action to navigate to Dashboard on nav item click", () => {
    const {getByText} = render(<Sidebar />, store);
    const dashboardNavItem = getByText("Dashboard");
    fireEvent.click(dashboardNavItem);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "@@router/CALL_HISTORY_METHOD",
      payload: {method: "push", args: ["/dashboard"]}
    });
  });
});
