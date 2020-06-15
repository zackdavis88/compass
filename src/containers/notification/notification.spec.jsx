import React from "react";
import Notification from "./notification";
import { render, mockStore } from "../../test-utils";

describe("<Notification />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      notification: {
        message: undefined,
        type: undefined,
        autoHide: undefined
      }
    });
  });

  it("should mount the component", () => {
    const component = render(<Notification />, store);
    expect(component).toBeDefined();
  });

  it("should render the notification message if one is in the store", () => {
    store = mockStore({
      notification: {
        message: "unit testing notification message",
        type: "info",
        autoHide: false
      }
    });
    const {getByText} = render(<Notification />, store);
    expect(getByText(store.getState().notification.message)).toBeDefined();
  });
});
