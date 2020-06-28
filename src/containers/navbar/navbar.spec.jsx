import React from "react";
import Navbar from "./navbar";
import { render, mockStore } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { toggleSidebar } from "../../store/actions/sidebar";

describe("<Navbar />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
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

  it("should render the sidebar toggle button if userInfo is present", () => {
    const {getByTestId} = render(<Navbar />, store);
    expect(getByTestId("sidebarBtn")).toBeDefined();
  });

  it("should not render the sidebar toggle button if userInfo is missing", () => {
    store = mockStore({
      sidebar: {
        isOpen: false
      },
      auth: {},
      user: {
        isLoading: false
      }
    });
    const {queryByTestId} = render(<Navbar />, store);
    expect(queryByTestId("sidebarBtn")).toBeNull();
  });

  it("should dispatch a redux action to toggle sidebar on SidebarToggleButton click", () => {
    const {getByTestId} = render(<Navbar />, store);
    const sidebarBtn = getByTestId("sidebarBtn");
    fireEvent.click(sidebarBtn);
    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });

  it("should not render the user menu until a user has signed in", () => {
    store = mockStore({
      sidebar: {isOpen: false},
      auth: {},
      user: {
        isLoading: false
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

  it("should call logout and closeSidebar methods when the Sign Out option is clicked", async() => {
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
