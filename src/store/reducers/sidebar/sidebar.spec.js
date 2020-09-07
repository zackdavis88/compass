import sidebarReducer from "./sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar
} from "../../actions/sidebar";
import {mockStore} from "../../../test-utils";

describe("Sidebar Reducer / Actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      sidebar: {
        isOpen: false
      }
    });
  });

  it("initial state should set isOpen to false", () => {
    const result = sidebarReducer(undefined, {});
    expect(result).toEqual({isOpen: false});
  });

  it("should set isOpen to true for the openSidebar action", () => {
    const result = sidebarReducer(undefined, {type: "OPEN_SIDEBAR"});
    expect(result).toEqual({isOpen: true});
  });

  it("should set isOpen to false for the closeSidebar action", () => {
    const state = {isOpen: true};
    const result = sidebarReducer(state, {type: "CLOSE_SIDEBAR"});
    expect(result).toEqual({isOpen: false});
  });

  it("should toggle isOpen between true/false for the toggleSidebar action", () => {
    let state = {isOpen: true};
    let result = sidebarReducer(state, {type: "TOGGLE_SIDEBAR"});
    expect(result).toEqual({isOpen: false});

    state = {isOpen: false};
    result = sidebarReducer(state, {type: "TOGGLE_SIDEBAR"});
    expect(result).toEqual({isOpen: true});
  });

  it("should dispatch the OPEN_SIDEBAR action type for the openSidebar action", () => {
    store.dispatch(openSidebar());
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action.type).toEqual("OPEN_SIDEBAR");
  });

  it("should dispatch the CLOSE_SIDEBAR action type for the closeSidebar action", () => {
    store.dispatch(closeSidebar());
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action.type).toEqual("CLOSE_SIDEBAR");
  });

  it("should dispatch the TOGGLE_SIDEBAR action type for the toggleSidebar action", () => {
    store.dispatch(toggleSidebar());
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action.type).toEqual("TOGGLE_SIDEBAR");
  });
});
