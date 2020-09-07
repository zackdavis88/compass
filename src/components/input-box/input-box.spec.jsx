import React from "react";
import InputBox from "./input-box";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<InputBox />", () => {
  let inputProps;
  beforeEach(() => {
    inputProps = {
      id: "test-input-box",
      dataTestId: "testInputBox",
      label: "Test Label",
      placeholder: "Test Placeholder",
      value: "",
      onChange: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<InputBox {...inputProps} />);
    expect(component).toBeDefined();
  });

  it("should render the label as a placeholder when there is no focus or input value", () => {
    const { getByPlaceholderText } = render(<InputBox {...inputProps} />);
    expect(getByPlaceholderText("Test Label")).toBeDefined();
  });

  it("should render the label and placeholder if there is focus", () => {
      const { getByTestId, getByLabelText, getByPlaceholderText } = render(<InputBox {...inputProps} />);
      fireEvent.focus(getByTestId("testInputBox.input"));
      expect(getByLabelText("Test Label")).toBeDefined();
      expect(getByPlaceholderText("Test Placeholder")).toBeDefined();
  });

  it("should render the label and no placeholder if there is an input value", () => {
    inputProps.value = "test value";
    const { getByLabelText, queryByPlaceholderText } = render(<InputBox {...inputProps} />);
    expect(getByLabelText("Test Label")).toBeDefined();
    expect(queryByPlaceholderText("Test Placeholder")).toBeNull();
  });

  it("should render the helperText if it is provided", () => {
    inputProps.helperText = "Unit testing InputBox helperText";
    const { getByText } = render(<InputBox  {...inputProps} />);
    expect(getByText("Unit testing InputBox helperText")).toBeDefined();
  });

  it("should render the errorText if it is provided", () => {
    inputProps.errorText = "Unit testing InputBox errorText";
    const { getByText } = render(<InputBox  {...inputProps} />);
    expect(getByText("Unit testing InputBox errorText")).toBeDefined();
  });

  it("should render the errorText instead of helperText if both are provided", () => {
    inputProps.helperText = "Unit testing InputBox helperText";
    inputProps.errorText = "Unit testing InputBox errorText";
    const { getByText } = render(<InputBox  {...inputProps} />);
    expect(getByText("Unit testing InputBox errorText")).toBeDefined();
  });

  it("should render the 'required' text if the input is required", () => {
    inputProps.isRequired = true;
    const { getByText } = render(<InputBox  {...inputProps} />);
    expect(getByText("required")).toBeDefined();
  });

  it("should not render the 'required' text if the input is focused", () => {
    inputProps.isRequired = true;
    const { getByTestId, queryByText } = render(<InputBox  {...inputProps} />);
    fireEvent.focus(getByTestId("testInputBox.input"));
    expect(queryByText("required")).toBeNull();
  });

  it("should not render the 'required' text if the input has a value", () => {
    inputProps.isRequired = true;
    inputProps.value = "something";
    const { queryByText } = render(<InputBox  {...inputProps} />);
    expect(queryByText("required")).toBeNull();
  });

  it("should focus the input if 'required' is clicked", () => {
    inputProps.isRequired = true;
    const { getByText, getByTestId } = render(<InputBox  {...inputProps} />);
    const requiredText = getByText("required");
    fireEvent.click(requiredText);
    expect(getByTestId(`${inputProps.dataTestId}.input`)).toHaveFocus();
  });

  it("should call the onChange method when the input value has changed", () => {
    const testValue = "some text was entered";
    const { getByTestId } = render(<InputBox {...inputProps} />);
    fireEvent.change(getByTestId("testInputBox.input"), {
      target: {
        value: testValue
      }
    });
    expect(inputProps.onChange).toHaveBeenCalledWith(testValue);
  });
  
  it("should limit the input value if props.maxLength is provided", () => {
    const testValue = "some text that is very long";
    inputProps.maxLength = 10;
    const {getByTestId} = render(<InputBox {...inputProps} />);
    const inputElement = getByTestId("testInputBox.input");
    fireEvent.change(inputElement, {
      target: {
        value: testValue
      }
    });
    expect(inputProps.onChange).toHaveBeenCalledWith("some text ");
  });

  // Testing some functionality changes that are specific to input type=number
  it("should call onChange with the number input value", () => {
    const testValue = "1.5";
    inputProps.type = "number";
    const {getByTestId} = render(<InputBox {...inputProps} />);
    fireEvent.change(getByTestId("testInputBox.input"), {
      target: {
        value: testValue
      }
    });
    expect(inputProps.onChange).toHaveBeenCalledWith(testValue);
  });

  it("should parse the value as integer if props.integerRequired is true", () => {
    const testValue = "8.7";
    inputProps.type = "number";
    inputProps.integerRequired = true;
    const {getByTestId} = render(<InputBox {...inputProps} />);
    fireEvent.change(getByTestId("testInputBox.input"), {
      target: {
        value: testValue
      }
    });
    expect(inputProps.onChange).toHaveBeenCalledWith(parseInt(testValue));
  });

  it("should set the value to props.numMin if the value is lower", () => {
    const testValue = "87.5"
    inputProps.type = "number";
    inputProps.numMin = "98.8"
    const {getByTestId} = render(<InputBox {...inputProps}/>);
    fireEvent.change(getByTestId("testInputBox.input"), {
      target: {
        value: testValue
      }
    });
    expect(inputProps.onChange).toHaveBeenCalledWith(inputProps.numMin);
  });

  it("should set the value to props.numMax if the value is higher", () => {
    const testValue = "87.5"
    inputProps.type = "number";
    inputProps.numMax = "5"
    const {getByTestId} = render(<InputBox {...inputProps}/>);
    fireEvent.change(getByTestId("testInputBox.input"), {
      target: {
        value: testValue
      }
    });
    expect(inputProps.onChange).toHaveBeenCalledWith(inputProps.numMax);
  });
});
