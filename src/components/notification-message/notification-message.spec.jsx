import React from "react";
import NotificationMessage from "./notification-message";
import { render } from "../../test-utils";

describe("<NotificationMessage />", () => {
  let props;
  beforeEach(() => {
    props = {
      message: "unit testing notification message",
      type: "info",
      autoHide: false,
      hideNotification: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<NotificationMessage {...props}/>);
    expect(component).toBeDefined();
  });

  it("should render the expected message", () => {
    const {getByText} = render(<NotificationMessage {...props} />);
    expect(getByText(props.message)).toBeDefined();
  });

  it("should render the notification close button", () => {
    const {getByTestId} = render(<NotificationMessage {...props} />);
    expect(getByTestId("notificationCloseButton")).toBeDefined();
  });
});
