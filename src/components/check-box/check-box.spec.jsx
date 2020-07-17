import React from "react";
import CheckBox from "./check-box";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<CheckBox />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestCheckBox",
      label: "Unit Testing Checkbox",
      checked: false,
      onChange: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<CheckBox {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the checkbox label", () => {
    const {getByTestId, getByText} = render(<CheckBox {...props} />);
    expect(getByTestId("unitTestCheckBox")).toBeDefined();
    expect(getByText("Unit Testing Checkbox")).toBeDefined();
    const checkbox = getByTestId("unitTestCheckBox.input");
    expect(checkbox).not.toBeChecked();
  });

  it("should call props.onChange when the checkbox is clicked", () => {
    const {getByText} = render(<CheckBox {...props} />);
    const checkbox = getByText("Unit Testing Checkbox");
    fireEvent.click(checkbox);
    expect(props.onChange).toHaveBeenCalled();
  });

  it("should not call props.onChange when a disabled checkbox is clicked", () => {
    props.disabled = true;
    const {getByText} = render(<CheckBox {...props} />);
    const checkbox = getByText("Unit Testing Checkbox");
    fireEvent.click(checkbox);
    expect(props.onChange).not.toHaveBeenCalled();
  });
});
