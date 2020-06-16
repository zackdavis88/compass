import React from "react";
import Sidebar from "./sidebar";
import { render, mockStore } from "../../test-utils";

describe("<Sidebar />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      sidebar: {
        isOpen: false
      }
    });
  });

  it("should mount the component", () => {
    const component = render(<Sidebar />, store);
    expect(component).toBeDefined();
  });

  it("should not render sidebar content when the sidebar is closed", () => {
    const {queryByTestId} = render(<Sidebar />, store);
    expect(queryByTestId("sidebarContent")).toBeNull();
  });

  it("should render sidebar content, header, and footer when the sidebar is open", () => {
    store = mockStore({
      sidebar: {
        isOpen: true
      }
    });
    const {getByTestId} = render(<Sidebar />, store);
    expect(getByTestId("sidebarContent")).toBeDefined();
    expect(getByTestId("sidebarHeader")).toBeDefined();
    expect(getByTestId("sidebarFooter")).toBeDefined();
  });

  // More tests will be added as sidebar functionality is figured out. why did I build this component for no reason? lol.
});
