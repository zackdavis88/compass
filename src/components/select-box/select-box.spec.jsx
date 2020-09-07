import React from "react";
import SelectBox from "./select-box";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<SelectBox />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestSelectBox",
      label: "A Select Box",
      placeholder: "Unit Test Placeholder",
      selectedValue: "",
      options: [
        "Option1",
        "Option2",
        "Option3",
        "Option4"
      ],
      onChange: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<SelectBox {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the select box with placeholder text if there is no selected value", () => {
    const {getByText} = render(<SelectBox {...props}/>);
    expect(getByText("Unit Test Placeholder")).toBeDefined();
  });

  it("should not render the options dropdown by default", () => {
    const {queryByTestId} = render(<SelectBox {...props} />);
    expect(queryByTestId(`${props.dataTestId}.options`)).toBeNull();
  });

  it("should render the options dropdown when the select box is clicked", () => {
    const {queryByTestId, getByTestId} = render(<SelectBox {...props}/>);
    const selectBox = getByTestId(props.dataTestId);
    expect(queryByTestId(`${props.dataTestId}.options`)).toBeNull();
    fireEvent.click(selectBox);
    expect(queryByTestId(`${props.dataTestId}.options`)).toBeDefined();
  });

  it("should not render the label if there is no selected value", () => {
    const {queryByText} = render(<SelectBox {...props}/>);
    expect(queryByText("A Select Box")).toBeNull();
  });

  it("should render the label if there is a selected value", () => {
    props.selectedValue = "some value";
    const {getByText} = render(<SelectBox {...props}/>);
    expect(getByText("A Select Box")).toBeDefined();
  });

  it("should render the label if the dropdown is open", () => {
    const {queryByText, getByTestId} = render(<SelectBox {...props}/>);
    const selectBox = getByTestId(props.dataTestId);
    expect(queryByText("A Select Box")).toBeNull();
    fireEvent.click(selectBox);
    expect(queryByText("A Select Box")).toBeDefined();
  });

  it("should render the selectedValue instead of placeholder, if present", () => {
    props.selectedValue = "some value";
    const {queryByText} = render(<SelectBox {...props}/>);
    expect(queryByText("Unit Test Placeholder")).toBeNull();
    expect(queryByText("some value")).toBeDefined();
  });

  it("should not render the clear button if props.selectedValue is not present", () => {
    const {queryByTestId} = render(<SelectBox {...props}/>);
    expect(queryByTestId(`${props.dataTestId}.clearButton`)).toBeNull();
  });

  it("should not render the clear button if props.clearValue is not present", () => {
    props.selectedValue = "some value";
    const {queryByTestId} = render(<SelectBox {...props}/>);
    expect(queryByTestId(`${props.dataTestId}.clearButton`)).toBeNull();
  });

  it("should render the clear button if both selectedValue and clearValue are present", () => {
    props.selectedValue = "some value";
    props.clearValue = jest.fn();
    const {queryByTestId} = render(<SelectBox {...props}/>);
    expect(queryByTestId(`${props.dataTestId}.clearButton`)).toBeDefined();
  });

  it("should call props.clearValue when the clear button is clicked", () => {
    props.selectedValue = "some value";
    props.clearValue = jest.fn();
    const {getByTestId} = render(<SelectBox {...props}/>);
    const clearButton = getByTestId(`${props.dataTestId}.clearButton`);
    fireEvent.click(clearButton);
    expect(props.clearValue).toHaveBeenCalled();
  });

  it("should render each option in the options dropdown", () => {
    const {getByTestId, getByText} = render(<SelectBox {...props}/>);
    const selectBox = getByTestId(props.dataTestId);
    fireEvent.click(selectBox);
    expect(getByText("Option1")).toBeDefined();
    expect(getByText("Option2")).toBeDefined();
    expect(getByText("Option3")).toBeDefined();
    expect(getByText("Option4")).toBeDefined();
  });

  it("should call props.onChange when an option is clicked", () => {
    const {getByTestId, getByText} = render(<SelectBox {...props}/>);
    const selectBox = getByTestId(props.dataTestId);
    fireEvent.click(selectBox);
    const option1 = getByText("Option1");
    fireEvent.click(option1);
    expect(props.onChange).toHaveBeenCalledWith("Option1");
  });
});
