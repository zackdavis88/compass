import React from "react";
import Navbar from "./navbar";
import { render, mockStore } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<Navbar />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      router: {
        location: {
          pathname: "/"
        }
      },
      sidebar: {
        isOpen: false
      },
      auth: {
        user: {
          username: "testuser",
          displayName: "testUser"
        }
      },
      user: {
        isLoading: false
      }
    });

    store.dispatch = jest.fn();
  });

  it("should mount the component", () => {
    const component = render(<Navbar />, store);
    expect(component).toBeDefined();
  });

  it("should render the brand text", () => {
    const {getByTestId, getByText} = render(<Navbar />, store);
    expect(getByTestId("brandName")).toBeDefined();
    expect(getByText("Compass")).toBeDefined();
  });

  it("should render the brand icon", () => {
    const {getByTestId} = render(<Navbar />, store);
    expect(getByTestId("brandIcon")).toBeDefined();
  });

  it("should render the Dashboard link if userInfo is present", () => {
    const {getByText} = render(<Navbar />, store);
    expect(getByText("Dashboard")).toBeDefined();
  });

  it("should not render the Dashboard link if userInfo is missing", () => {
    store = mockStore({
      router: {
        location: {
          pathname: "/"
        }
      },
      sidebar: {
        isOpen: false
      },
      auth: {},
      user: {
        isLoading: false
      }
    });
    const {queryByText} = render(<Navbar />, store);
    expect(queryByText("Dashboard")).toBeNull();
  });

  it("should dispatch a redux push action when the Dashboard link is clicked", () => {
    const {getByText} = render(<Navbar />, store);
    const dashboardLink = getByText("Dashboard");
    fireEvent.click(dashboardLink);
    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        args: ["/dashboard"],
        method: "push"
      },
      type: "@@router/CALL_HISTORY_METHOD"
    });
  });

  it("should not dispatch a redux push action when the Dashboard link is clicked and the location is /dashboard", () => {
    store = mockStore({
      router: {location: {pathname: "/dashboard"}
      },
      sidebar: {isOpen: false},
      auth: {
        user: {
          username: "testuser",
          displayName: "testUser"
        }
      },
      user: {isLoading: false}
    });
    store.dispatch = jest.fn();
    const {getByText} = render(<Navbar />, store);
    const dashboardLink = getByText("Dashboard");
    fireEvent.click(dashboardLink);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("should attach the navlink-active class when the location is /dashboard", () => {
    store = mockStore({
      router: {location: {pathname: "/dashboard"}
      },
      sidebar: {isOpen: false},
      auth: {
        user: {
          username: "testuser",
          displayName: "testUser"
        }
      },
      user: {isLoading: false}
    });
    const {getByText} = render(<Navbar />, store);
    const dashboardLink = getByText("Dashboard");
    expect(dashboardLink.className).toContain("navlink-active");
  });

  it("should not render the user menu until a user has signed in", () => {
    store = mockStore({
      sidebar: {isOpen: false},
      auth: {},
      user: {
        isLoading: false
      },
      router: {
        location: {
          pathname: "/"
        }
      }
    });
    const {queryByTestId} = render(<Navbar />, store);
    expect(queryByTestId("userMenu")).toBeNull();
  });

  it("should render the user menu when a user is signed in", () => {
    const {getByTestId, getByText} = render(<Navbar />, store);
    expect(getByTestId("userMenu")).toBeDefined();
    expect(getByText("testUser")).toBeDefined();
  });

  it("should render the ChangePasswordModal when the Change Password option is clicked", async() => {
    const {getByTestId, getByText} = render(<Navbar />, store);
    const menu = getByTestId("userMenu");
    fireEvent.click(menu);
    const menuItem = getByText("Change Password");
    fireEvent.click(menuItem);
    await waitFor(() => expect(getByTestId("changePasswordModal.wrapper")).toBeDefined());
  });

  it("should call logout and closeSidebar redux actions when the Sign Out option is clicked", async() => {
    const {getByTestId, getByText} = render(<Navbar />, store);
    const menu = getByTestId("userMenu");
    fireEvent.click(menu);
    const menuItem = getByText("Sign Out");
    fireEvent.click(menuItem);
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(2));
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      type: "LOGOUT"
    });
    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: "CLOSE_SIDEBAR"
    });
  });
});
