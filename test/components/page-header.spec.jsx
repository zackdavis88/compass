import React from "react";
import PageHeader from "../../src/components/page-header/page-header";
import { render } from "../utils";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

describe("<PageHeader />", () => {
  let props;
  beforeEach(() => {
    props = {
      text: "Unit Testing Page Header",
      icon: faExclamationTriangle
    }
  });

  it("should mount the component", () => {
    const component = render(<PageHeader {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the header text", () => {
    const { getByText } = render(<PageHeader {...props} />);
    expect(getByText(props.text)).toBeDefined();
  });

  it("should not render any icon if there is not one provided", () => {
    props.icon = undefined;
    const { queryByTestId } = render(<PageHeader {...props} />);
    expect(queryByTestId("pageHeaderIcon")).toBeNull();
  });

  it("should render the header icon if one is provided", () => {
    const { getByTestId } = render(<PageHeader {...props} />);
    expect(getByTestId("pageHeaderIcon")).toBeDefined();
  });
});
