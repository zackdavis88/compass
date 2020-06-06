import sidebarReducer from "../../src/store/reducers/sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar
} from "../../src/store/dispatchers/sidebar";

describe("Sidebar Reducer", () => {
  it("initial state should set isOpen to false", () => {
    const result = sidebarReducer(undefined, {});
    expect(result).toEqual({isOpen: false});
  });

  it("should set isOpen to true for the openSidebar dispatcher", () => {
    const result = sidebarReducer(undefined, openSidebar());
    expect(result).toEqual({isOpen: true});
  });

  it("should set isOpen to false for the closeSidebar dispatcher", () => {
    const state = {isOpen: true};
    const result = sidebarReducer(state, closeSidebar());
    expect(result).toEqual({isOpen: false});
  });

  it("should toggle isOpen between true/false for the toggleSidebar dispatcher", () => {
    let state = {isOpen: true};
    let result = sidebarReducer(state, toggleSidebar());
    expect(result).toEqual({isOpen: false});

    state = {isOpen: false};
    result = sidebarReducer(state, toggleSidebar());
    expect(result).toEqual({isOpen: true});
  });
});
