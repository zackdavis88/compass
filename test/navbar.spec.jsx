import React from "react";
import Navbar from "../src/containers/navbar/navbar";
import { render, store } from "./utils";
import { fireEvent } from "@testing-library/react";
import {
  TOGGLE_SIDEBAR
} from "../src/store/actions/sidebar";

describe("<Navbar />", () => {
  it("should mount the component", () => {
    const component = render(<Navbar />);
    expect(component).toBeDefined();
  });

  it("should render the brand text", () => {
    const {getByTestId, getByText} = render(<Navbar />);
    expect(getByTestId("brandName")).toBeDefined();
    expect(getByText("Compass")).toBeDefined();
  });

  it("should render the brand icon", () => {
    const {getByTestId} = render(<Navbar />);
    expect(getByTestId("brandIcon")).toBeDefined();
  });

  it("should render the sidebar toggle button", () => {
    const {getByTestId} = render(<Navbar />);
    expect(getByTestId("sidebarBtn")).toBeDefined();
  });

  it("should call the redux action to toggle sidebar on SidebarToggleButton click", () => {
    const {getByTestId} = render(<Navbar />);
    const sidebarBtn = getByTestId("sidebarBtn");
    fireEvent.click(sidebarBtn);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: TOGGLE_SIDEBAR
    });
  });
});
