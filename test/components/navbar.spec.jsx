import React from "react";
import Navbar from "../../src/containers/navbar/navbar";
import { render, mockStore } from "../utils";
import { fireEvent } from "@testing-library/react";
import { TOGGLE_SIDEBAR } from "../../src/store/actions/sidebar";

describe("<Navbar />", () => {
  const store = mockStore({
    sidebar: {
      isOpen: false,
      extra: "data"
    }
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

  it("should call the redux action to toggle sidebar on SidebarToggleButton click", () => {
    const {getByTestId} = render(<Navbar />, store);
    const sidebarBtn = getByTestId("sidebarBtn");
    fireEvent.click(sidebarBtn);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: TOGGLE_SIDEBAR
    });
  });
});
