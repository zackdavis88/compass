import React from "react";
import SearchBar from "./search-bar";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<SearchBar />", () => {
  let props;
  beforeEach(() => {
    props = {
      id: "test-search-bar",
      dataTestId: "testSearchBar",
      label: "Test Label",
      placeholder: "Test Placeholder",
      searchedValue: "",
      value: "",
      onChange: jest.fn(),
      search: jest.fn(),
      clear: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<SearchBar {...props} />);
    expect(component).toBeDefined();
  });

  it("should render an input box", () => {
    const {getByTestId} = render(<SearchBar {...props} />);
    expect(getByTestId("testSearchBar.input")).toBeDefined();
  });

  it("should render the search button", () => {
    const {getByTestId, getByText} = render(<SearchBar {...props} />);
    expect(getByTestId("testSearchBar.search")).toBeDefined();
    expect(getByText("Search")).toBeDefined();
  });

  it("should render a label if the input is focused", () => {
    const {getByLabelText, getByTestId} = render(<SearchBar {...props} />);
    const inputBox = getByTestId("testSearchBar.input");
    fireEvent.focus(inputBox);
    expect(getByLabelText("Test Label")).toBeDefined();
  });

  it("should render a label if the input has a value", () => {
    props.value = "some value";
    const {getByLabelText, getByTestId} = render(<SearchBar {...props} />);
    const inputBox = getByTestId("testSearchBar.input");
    fireEvent.blur(inputBox);
    expect(getByLabelText("Test Label")).toBeDefined();
  });

  it("should render a placeholder when not focused", () => {
    const {getByPlaceholderText} = render(<SearchBar {...props} />);
    expect(getByPlaceholderText("Test Placeholder")).toBeDefined();
  });

  it("should call onChange prop when input is changed", () => {
    const {getByTestId} = render(<SearchBar {...props} />);
    const input = getByTestId("testSearchBar.input");
    fireEvent.change(input, {
      target: {value: "test value"}
    });
    expect(props.onChange).toHaveBeenCalledWith("test value");
  });

  it("should not call the search method if searchedValue equals input value", () => {
    const {getByTestId} = render(<SearchBar {...props}/>);
    const searchButton = getByTestId("testSearchBar.search");
    fireEvent.click(searchButton);
    expect(props.search).not.toHaveBeenCalled();
  });

  it("should call the search method if value does not equal searchedValue", () => {
    props.value = "something";
    const {getByTestId} = render(<SearchBar {...props}/>);
    const searchButton = getByTestId("testSearchBar.search");
    fireEvent.click(searchButton);
    expect(props.search).toHaveBeenCalledWith("something");
  });

  it("should not render the clear button if searchedValue is empty", () => {
    const {queryByTestId} = render(<SearchBar {...props} />);
    expect(queryByTestId("testSearchBar.clear")).toBeNull();
  });

  it("should render the clear button if searchedValue is present", () => {
    props.searchedValue = "something here";
    const {queryByTestId} = render(<SearchBar {...props} />);
    expect(queryByTestId("testSearchBar.clear")).toBeDefined();
  });

  it("should called the clear method if the clear button is clicked", () => {
    props.searchedValue = "some test value";
    const {getByTestId} = render(<SearchBar {...props}/>);
    const clearButton = getByTestId("testSearchBar.clear");
    fireEvent.click(clearButton);
    expect(props.clear).toHaveBeenCalled();
  });
});
