import React from "react";
import Button from "./button";
import { render } from "../../test-utils";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { fireEvent } from "@testing-library/react";

describe("<Button />", () => {
  let buttonProps;
  beforeEach(() => {
    buttonProps = {
      label: "Test Label",
      onClick: jest.fn(),
      dataTestId: "testButton",
      tooltip: "testing tooltip"
    };
  });

  it("should mount the component", () => {
    const component = render(<Button {...buttonProps} />);
    expect(component).toBeDefined();
  });

  it("should render the label", () => {
    const { getByText } = render(<Button {...buttonProps} />);
    expect(getByText(buttonProps.label)).toBeDefined();
  });

  it("should render the startIcon if provided", () => {
    buttonProps.startIcon = faUserPlus;
    const { getByTestId } = render(<Button {...buttonProps} />);
    expect(getByTestId(`${buttonProps.dataTestId}.startIcon`));
  });

  it("should render the endIcon if provided", () => {
    buttonProps.endIcon = faUserPlus;
    const { getByTestId } = render(<Button {...buttonProps} />);
    expect(getByTestId(`${buttonProps.dataTestId}.endIcon`));
  });

  it("should call the onClick function when on click", () => {
    const { getByTestId } = render(<Button {...buttonProps} />);
    const buttonElement = getByTestId(buttonProps.dataTestId);
    fireEvent.click(buttonElement);
    expect(buttonProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("should render a tooltip on hover if provided", () => {
    const {getByTestId, getByText} = render(<Button {...buttonProps}/>);
    const buttonElement = getByTestId(buttonProps.dataTestId);
    fireEvent.mouseOver(buttonElement);
    expect(getByText(buttonProps.tooltip)).toBeDefined();
  });
});
