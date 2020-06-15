import React from "react";
import NotificationMessage from "./notification-message";
import { render } from "../../test-utils";
import { fireEvent, createEvent } from "@testing-library/react";
import { scaleOut } from "../../common-styles/animations";

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

  it("should call the hideNotification method once the scaleOut animation ends", () => {
    const {getByTestId} = render(<NotificationMessage {...props} />);
    const wrapper = getByTestId("notificationMessage");

    // Create animation event attached to the wrapper that has onAnimationEnd listener.
    const animationEndEvent = createEvent.animationEnd(wrapper);
    // Attach an animationName property to the event
    animationEndEvent.animationName = scaleOut.getName();
    // Fire!
    fireEvent(wrapper, animationEndEvent);
    expect(props.hideNotification).toHaveBeenCalledTimes(1);
  });
});
