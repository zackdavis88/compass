import React from "react";
import RadioGroup from "./radio-group";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<RadioGroup />", () => {
  let radioGroupProps;
  beforeEach(() => {
    radioGroupProps = {
      dataTestId: "unitTestingRadioGroup",
      name: "unitTestingRadioGroup",
      options: [{
        label: "Item 1",
        checked: false,
        onChange: jest.fn()
      }, {
        label: "Item 2",
        checked: true,
        onChange: jest.fn()
      }, {
        label: "Item 3",
        checked: false,
        onChange: jest.fn()
      }]
    };
  });

  it("should mount the component", () => {
    const component = render(<RadioGroup {...radioGroupProps} />);
    expect(component).toBeDefined();
  });

  it("should render the radio buttons for each option", () => {
    const {getByTestId, getByText} = render(<RadioGroup {...radioGroupProps} />);
    expect(getByTestId("unitTestingRadioGroup")).toBeDefined();
    expect(getByText("Item 1")).toBeDefined();
    expect(getByText("Item 2")).toBeDefined();
    expect(getByText("Item 3")).toBeDefined();
    const option1 = getByTestId("unitTestingRadioGroup.option.0");
    const option2 = getByTestId("unitTestingRadioGroup.option.1");
    const option3 = getByTestId("unitTestingRadioGroup.option.2");
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).not.toBeChecked();
  });

  it("should call props.onChange when an option is clicked", () => {
    const {getByText} = render(<RadioGroup {...radioGroupProps} />);
    const option1 = getByText("Item 1");
    fireEvent.click(option1);
    expect(radioGroupProps.options[0].onChange).toHaveBeenCalled();
  });

  it("should not call props.onChange when a disabled option is clicked", () => {
    radioGroupProps = {...radioGroupProps, disabled: true};
    const {getByText} = render(<RadioGroup {...radioGroupProps} />);
    const option1 = getByText("Item 1");
    fireEvent.click(option1);
    expect(radioGroupProps.options[0].onChange).not.toHaveBeenCalled();
  });
});
