import notificationReducer from "./notification";
import {
  showNotification,
  hideNotification
} from "../../actions/notification";
import {mockStore} from "../../../test-utils";

describe("Notification Reducer / Actions", () => {
  let store;
  let expectedInitialState = {
    message: undefined,
    type: undefined,
    autoHide: undefined
  };
  beforeEach(() => {
    store = mockStore({
      notification: expectedInitialState
    });
  });

  it("should initialize with the expected initial state", () => {
    const result = notificationReducer(undefined, {});
    expect(result).toEqual(expectedInitialState);
  });

  it("should set message, type, and autoHide to the value passed to the reducer for the SHOW_NOTIFICATION action", () => {
    const result = notificationReducer(undefined, {
      type: "SHOW_NOTIFICATION",
      notification: {
        message: "test message",
        type: "info",
        autoHide: false
      }
    });
    expect(result).toEqual({message: "test message", type: "info", autoHide: false});
  });

  it("should set store back to initial state for the HIDE_NOTIFICATION action", () => {
    const result = notificationReducer(undefined, {type: "HIDE_NOTIFICATION"});
    expect(result).toEqual(expectedInitialState);
  });

  it("should dispatch the SHOW_NOTIFICATION action type for the showNotification action", () => {
    store.dispatch(showNotification("unit testing notification actions", "info", true));
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: "SHOW_NOTIFICATION",
      notification: {
        message: "unit testing notification actions",
        type: "info",
        autoHide: true
      }
    });
  });

  it("should dispatch the HIDE_NOTIFICATION action type for the hideNotification action", () => {
    store.dispatch(hideNotification());
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action.type).toEqual("HIDE_NOTIFICATION");
  });
});
