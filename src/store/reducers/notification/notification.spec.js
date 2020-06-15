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
        message: "",
        type: ""
      }
    });
  });

  it("initial state should set message to an empty-string", () => {
    const result = notificationReducer(undefined, {});
    expect(result).toEqual({message: "", type: ""});
  });

  it("should set message and type to the value passed to the reducer for the SHOW_NOTIFICATION action", () => {
    const result = notificationReducer(undefined, {
      type: "SHOW_NOTIFICATION",
      notification: {
        message: "test message",
        type: "info"
      }
    });
    expect(result).toEqual({message: "test message", type: "info"});
  });

  it("should set message and type to an empty-string for the HIDE_NOTIFICATION action", () => {
    const result = notificationReducer(undefined, {type: "HIDE_NOTIFICATION"});
    expect(result).toEqual({message: "", type: ""});
  });

  it("should dispatch the SHOW_NOTIFICATION action type for the showNotification action", () => {
    store.dispatch(showNotification("unit testing notification actions", "info"));
    expect(store.getActions()).toHaveLength(1);
    const action = store.getActions()[0];
    expect(action).toEqual({
      type: "SHOW_NOTIFICATION",
      notification: {
        message: "unit testing notification actions",
        type: "info"
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
