import notificationReducer from "./notification";
import {
  showNotification,
  hideNotification
} from "../../actions/notification";
import {mockStore} from "../../../test-utils";

describe("Notification Reducer / Actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      notification: {
        message: ""
      }
    });
  });

  it("initial state should set message to an empty-string", () => {
    const result = notificationReducer(undefined, {});
    expect(result).toEqual({message: ""});
  });

  it("should set message to the value passed to the reducer for the SHOW_NOTIFICATION action", () => {
    const result = notificationReducer(undefined, {type: "SHOW_NOTIFICATION", message: "test message"});
    expect(result).toEqual({message: "test message"});
  });

  it("should set message to an empty-string for the HIDE_NOTIFICATION action", () => {
    const result = notificationReducer(undefined, {type: "HIDE_NOTIFICATION"});
    expect(result).toEqual({message: ""});
  });

  it("should dispatch the SHOW_NOTIFICATION action type for the showNotification action", () => {
    store.dispatch(showNotification("unit testing notification actions"));
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: "SHOW_NOTIFICATION",
      message: "unit testing notification actions"
    });
  });

  it("should dispatch the HIDE_NOTIFICATION action type for the hideNotification action", () => {
    store.dispatch(hideNotification());
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action.type).toEqual("HIDE_NOTIFICATION");
  });
});
