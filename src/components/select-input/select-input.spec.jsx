import React from "react";
import SelectInput from "./select-input";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<SelectInput />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestSelectInput",
      id: "unitTestSelectInput",
      label: "Test Label",
      placeholder: "Testing Unfocused Placeholder",
      focusedPlaceholder: "Testing Focused Placeholder",
      value: "",
      onChange: jest.fn(),
      items: [
        "chicken",
        "shrimp",
        "pizza",
        "steak",
        "tacos"
      ]
    };
  });

  it("should mount the component", () => {
    const component = render(<SelectInput {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the label once the input box is focused", () => {
    const {queryByLabelText, getByTestId} = render(<SelectInput {...props}/>);
    expect(queryByLabelText(props.label)).toBeNull();
    const input = getByTestId(`${props.dataTestId}.input`);
    fireEvent.focus(input);
    expect(queryByLabelText(props.label)).toBeDefined();
  });

  it("should render an initial placeholder and a focusedPlaceholder when input is focused", () => {
    const {queryByPlaceholderText, getByTestId} = render(<SelectInput {...props} />);
    expect(queryByPlaceholderText(props.placeholder)).toBeDefined();
    expect(queryByPlaceholderText(props.focusedPlaceholder)).toBeNull();
    const input = getByTestId(`${props.dataTestId}.input`);
    fireEvent.focus(input);
    expect(queryByPlaceholderText(props.placeholder)).toBeNull();
    expect(queryByPlaceholderText(props.focusedPlaceholder)).toBeDefined();
  });

  it("should render 'required' text if isRequired is true", () => {
    props.isRequired = true;
    const {getByText} = render(<SelectInput {...props}/>);
    expect(getByText("required")).toBeDefined();
  });

  it("should not render the options flyout if the component is disabled", () => {
    props.disabled = true;
    const {getByTestId, queryByTestId} = render(<SelectInput {...props}/>);
    fireEvent.click(getByTestId(props.dataTestId));
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
  });

  it("should render errorText if provided", () => {
    props.errorText = "something went wrong";
    const {getByText} = render(<SelectInput {...props}/>);
    expect(getByText("something went wrong")).toBeDefined();
  });

  it("should call the onChange method when input has changed", () => {
    const {getByTestId} = render(<SelectInput {...props}/>);
    const input = getByTestId(`${props.dataTestId}.input`);
    fireEvent.change(input, {
      target: {
        value: "some user input"
      }
    });
    expect(props.onChange).toHaveBeenCalledWith("some user input");
  });

  it("should render the options flyout once the component is clicked", () => {
    const {queryByTestId, getByTestId} = render(<SelectInput {...props}/>);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
    const componentWrapper = getByTestId(props.dataTestId);
    fireEvent.click(componentWrapper);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
  });

  it("should render all options in the flyout by default", () => {
    const {getByTestId, queryByText} = render(<SelectInput {...props}/>);
    const componentWrapper = getByTestId(props.dataTestId);
    fireEvent.click(componentWrapper);
    expect(getByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
    props.items.forEach(item => {
      expect(queryByText(item)).toBeDefined();
    });
  });

  it("should filter flyout options based on input value", () => {
    props.value = "s";
    const {getByTestId, queryByText} = render(<SelectInput {...props}/>);
    const componentWrapper = getByTestId(props.dataTestId);
    fireEvent.click(componentWrapper);

    // Since 's' is our value, dropdown results should only contain items that start with 's'
    expect(getByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
    expect(queryByText("shrimp")).toBeDefined();
    expect(queryByText("steak")).toBeDefined();

    // the remaining options shouldnt be showing
    expect(queryByText("chicken")).toBeNull();
    expect(queryByText("pizza")).toBeNull();
    expect(queryByText("tacos")).toBeNull();
  });

  it("should show a default message if there are no options available", () => {
    props.value = "z";
    const {getByTestId, queryByText} = render(<SelectInput {...props}/>);
    const componentWrapper = getByTestId(props.dataTestId);
    fireEvent.click(componentWrapper);
    expect(getByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
    expect(queryByText("No options meet filter critera")).toBeDefined();
  });

  it("should call the onChange method when an option is clicked", () => {
    const {getByTestId, getByText} = render(<SelectInput {...props}/>);
    const componentWrapper = getByTestId(props.dataTestId);
    fireEvent.click(componentWrapper);
    expect(getByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
    const option = getByText("chicken");
    fireEvent.click(option);
    expect(props.onChange).toHaveBeenCalledWith("chicken");
  });

  it("should close the flyout after any click event", () => {
    const {getByTestId, queryByTestId} = render(<SelectInput {...props}/>);
    const componentWrapper = getByTestId(props.dataTestId);
    fireEvent.click(componentWrapper);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
    fireEvent.click(componentWrapper);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
  });
});
