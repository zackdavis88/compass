import React from "react";
import TextArea from "./text-area";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<TextArea />", () => {
  let props;
  beforeEach(() => {
    props = {
      id: "test-text-area",
      dataTestId: "testTextArea",
      label: "Test Label",
      placeholder: "Test Placeholder",
      value: "",
      onChange: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<TextArea {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the label as a placeholder when there is no focus or input value", () => {
    const { getByPlaceholderText } = render(<TextArea {...props} />);
    expect(getByPlaceholderText("Test Label")).toBeDefined();
  });

  it("should render the label and placeholder if there is focus", () => {
      const { getByTestId, getByLabelText, getByPlaceholderText } = render(<TextArea {...props} />);
      fireEvent.focus(getByTestId("testTextArea.input"));
      expect(getByLabelText("Test Label")).toBeDefined();
      expect(getByPlaceholderText("Test Placeholder")).toBeDefined();
  });

  it("should render the label if there is an input value", () => {
    props.value = "test value";
    const { getByLabelText } = render(<TextArea {...props} />);
    expect(getByLabelText("Test Label")).toBeDefined();
  });

  it("should render the helperText if it is provided", () => {
    props.helperText = "Unit testing TextArea helperText";
    const { getByText } = render(<TextArea  {...props} />);
    expect(getByText("Unit testing TextArea helperText")).toBeDefined();
  });

  it("should render the errorText if it is provided", () => {
    props.errorText = "Unit testing TextArea errorText";
    const { getByText } = render(<TextArea  {...props} />);
    expect(getByText("Unit testing TextArea errorText")).toBeDefined();
  });

  it("should render the errorText instead of helperText if both are provided", () => {
    props.helperText = "Unit testing TextArea helperText";
    props.errorText = "Unit testing TextArea errorText";
    const { queryByText } = render(<TextArea  {...props} />);
    expect(queryByText("Unit testing TextArea errorText")).toBeDefined();
    expect(queryByText("Unit testing TextArea helperText")).toBeNull();
  });

  it("should render the 'required' text if the input is required", () => {
    props.isRequired = true;
    const { getByText } = render(<TextArea  {...props} />);
    expect(getByText("required")).toBeDefined();
  });

  it("should not render the 'required' text if the input is focused", () => {
    props.isRequired = true;
    const { getByTestId, queryByText } = render(<TextArea  {...props} />);
    fireEvent.focus(getByTestId("testTextArea.input"));
    expect(queryByText("required")).toBeNull();
  });

  it("should not render the 'required' text if the input has a value", () => {
    props.isRequired = true;
    props.value = "something";
    const { queryByText } = render(<TextArea  {...props} />);
    expect(queryByText("required")).toBeNull();
  });

  it("should focus the input if 'required' is clicked", () => {
    props.isRequired = true;
    const { getByText, getByTestId } = render(<TextArea  {...props} />);
    const requiredText = getByText("required");
    fireEvent.click(requiredText);
    expect(getByTestId(`${props.dataTestId}.input`)).toHaveFocus();
  });

  it("should call the onChange method when the input value has changed", () => {
    const testValue = "some text was entered";
    const { getByTestId } = render(<TextArea {...props} />);
    fireEvent.change(getByTestId("testTextArea.input"), {
      target: {
        value: testValue
      }
    });
    expect(props.onChange).toHaveBeenCalledWith(testValue);
  });
});
