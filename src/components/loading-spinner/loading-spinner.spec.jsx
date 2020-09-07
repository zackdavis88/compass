import React from "react";
import LoadingSpinner from "./loading-spinner";
import { render } from "../../test-utils";

describe("<LoadingSpinner />", () => {
  let spinnerProps;
  beforeEach(() => {
    spinnerProps = {
      dataTestId: "unitTestLoadingSpinner",
      message: "Sample Loading Message"
    };
  });

  it("should mount the component", () => {
    const component = render(<LoadingSpinner {...spinnerProps} />);
    expect(component).toBeDefined();
  });

  it("should render the animated spinner and no message by default", () => {
    spinnerProps = {
      dataTestId: "unitTestLoadingSpinner"
    };
    const {queryByTestId} = render(<LoadingSpinner {...spinnerProps} />);
    expect(queryByTestId("unitTestLoadingSpinner")).toBeDefined();
    expect(queryByTestId("unitTestLoadingSpinner.spinner")).toBeDefined();
    expect(queryByTestId("unitTestLoadingSpinner.message")).toBeNull();
  });

  it("should render a message if one is provided", () => {
    const {getByTestId, getByText} = render(<LoadingSpinner {...spinnerProps} />);
    expect(getByTestId("unitTestLoadingSpinner.message")).toBeDefined();
    expect(getByText("Sample Loading Message")).toBeDefined();
  });
});
