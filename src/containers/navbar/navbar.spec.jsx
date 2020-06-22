import React from "react";
import Navbar from "./navbar";
import { render, mockStore } from "../../test-utils";
import { fireEvent } from "@testing-library/react";
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

  it("should render the sidebar toggle button", () => {
    const {getByTestId} = render(<Navbar />, store);
    expect(getByTestId("sidebarBtn")).toBeDefined();
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
      auth: {}
    });
    const {queryByTestId} = render(<Navbar />, store);
    expect(queryByTestId("userMenu")).toBeNull();
  });

  it("should render the user menu when a user is signed in", () => {
    const {getByTestId, getByText} = render(<Navbar />, store);
    expect(getByTestId("userMenu")).toBeDefined();
    expect(getByText("testUser")).toBeDefined();
  });
});
