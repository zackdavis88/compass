import React from "react";
import Pagination from "./pagination";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<Pagination />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "testPagination",
      page: 1,
      totalPages: 53,
      onPageClick: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<Pagination {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the first page button", () => {
    const {getByTestId, getByText} = render(<Pagination {...props} />);
    expect(getByTestId("testPagination.first")).toBeDefined();
    expect(getByText("First")).toBeDefined();
  });

  it("should render the last page button", () => {
    const {getByTestId, getByText} = render(<Pagination {...props} />);
    expect(getByTestId("testPagination.last")).toBeDefined();
    expect(getByText("Last")).toBeDefined();
  });

  it("should render the next page button", () => {
    const {getByTestId} = render(<Pagination {...props} />);
    expect(getByTestId("testPagination.next")).toBeDefined();
  });

  it("should render the previous page button", () => {
    const {getByTestId} = render(<Pagination {...props} />);
    expect(getByTestId("testPagination.prev")).toBeDefined();
  });

  it("should render less than 5 pages if the totalPages is less than 5", () => {
    props.totalPages = 2;
    const {queryByText} = render(<Pagination {...props}/>);
    expect(queryByText("1")).toBeDefined();
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeNull();
  });

  it("should render the page in the middle of the range if possible", () => {
    props.page = 4;
    const {queryByText} = render(<Pagination {...props}/>);
    expect(queryByText("1")).toBeNull();
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeDefined();
    expect(queryByText("4")).toBeDefined();
    expect(queryByText("5")).toBeDefined();
    expect(queryByText("6")).toBeDefined();
    expect(queryByText("7")).toBeNull();
  });

  it("should render the highest range of numbers if the page is second to last", () => {
    props.page = 52;
    const {queryByText} = render(<Pagination {...props}/>);
    expect(queryByText("48")).toBeNull();
    expect(queryByText("49")).toBeDefined();
    expect(queryByText("50")).toBeDefined();
    expect(queryByText("51")).toBeDefined();
    expect(queryByText("52")).toBeDefined();
    expect(queryByText("53")).toBeDefined();
  });

  it("should render the highest range of numbers if the page is last", () => {
    props.page = 53;
    const {queryByText} = render(<Pagination {...props}/>);
    expect(queryByText("48")).toBeNull();
    expect(queryByText("49")).toBeDefined();
    expect(queryByText("50")).toBeDefined();
    expect(queryByText("51")).toBeDefined();
    expect(queryByText("52")).toBeDefined();
    expect(queryByText("53")).toBeDefined();
  });

  it("should fetch data for the first page when First is clicked", () => {
    props.page = 23;
    const {queryByText, getByText} = render(<Pagination {...props}/>);

    // At this moment, the component should be showing 21-25
    expect(queryByText("21")).toBeDefined();
    expect(queryByText("22")).toBeDefined();
    expect(queryByText("23")).toBeDefined();
    expect(queryByText("24")).toBeDefined();
    expect(queryByText("25")).toBeDefined();

    const firstButton = getByText("First");
    fireEvent.click(firstButton);
    expect(props.onPageClick).toHaveBeenCalledWith(1);

    // The range should be 1-5 now.
    expect(queryByText("1")).toBeDefined();
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeDefined();
    expect(queryByText("4")).toBeDefined();
    expect(queryByText("5")).toBeDefined();
  });

  it("should fetch data for the next page when Next is clicked", () => {
    props.page = 3;
    const {queryByText, getByTestId} = render(<Pagination {...props}/>);

    // At this moment, the component should be showing 1-5
    expect(queryByText("1")).toBeDefined();
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeDefined();
    expect(queryByText("4")).toBeDefined();
    expect(queryByText("5")).toBeDefined();

    const nextButton = getByTestId(`${props.dataTestId}.next`);
    fireEvent.click(nextButton);
    expect(props.onPageClick).toHaveBeenCalledWith(props.page+1);

    // The range should be 2-6 now.
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeDefined();
    expect(queryByText("4")).toBeDefined();
    expect(queryByText("5")).toBeDefined();
    expect(queryByText("6")).toBeDefined();
  });

  it("should fetch data for the previous page when Prev is clicked", () => {
    props.page = 3;
    const {queryByText, getByTestId} = render(<Pagination {...props}/>);

    // At this moment, the component should be showing 1-5
    expect(queryByText("1")).toBeDefined();
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeDefined();
    expect(queryByText("4")).toBeDefined();
    expect(queryByText("5")).toBeDefined();

    const prevButton = getByTestId(`${props.dataTestId}.prev`);
    fireEvent.click(prevButton);
    expect(props.onPageClick).toHaveBeenCalledWith(props.page-1);

    // The range should be the same.
    expect(queryByText("1")).toBeDefined();
    expect(queryByText("2")).toBeDefined();
    expect(queryByText("3")).toBeDefined();
    expect(queryByText("4")).toBeDefined();
    expect(queryByText("5")).toBeDefined();
  });

  it("should fetch data for the last page when Last is clicked", () => {
    props.page = 24;
    const {queryByText, getByText} = render(<Pagination {...props}/>);

    // At this moment, the component should be showing 22-26
    expect(queryByText("22")).toBeDefined();
    expect(queryByText("23")).toBeDefined();
    expect(queryByText("24")).toBeDefined();
    expect(queryByText("25")).toBeDefined();
    expect(queryByText("26")).toBeDefined();

    const lastButton = getByText("Last");
    fireEvent.click(lastButton);
    expect(props.onPageClick).toHaveBeenCalledWith(props.totalPages);

    // The range should be 49-53 now.
    expect(queryByText("49")).toBeDefined();
    expect(queryByText("50")).toBeDefined();
    expect(queryByText("51")).toBeDefined();
    expect(queryByText("52")).toBeDefined();
    expect(queryByText("53")).toBeDefined();
  });

  it("should fetch data and update page range when the 4th item is clicked", () => {
    props.page = 8;
    const {queryByText, getByText} = render(<Pagination {...props}/>);
    // Component should be showing 6-10
    expect(queryByText("6")).toBeDefined();
    expect(queryByText("7")).toBeDefined();
    expect(queryByText("8")).toBeDefined();
    expect(queryByText("9")).toBeDefined();
    expect(queryByText("10")).toBeDefined();

    const nine = getByText("9");
    fireEvent.click(nine);
    expect(props.onPageClick).toHaveBeenCalledWith(9);

    // Should be showing 7-11 now.
    expect(queryByText("7")).toBeDefined();
    expect(queryByText("8")).toBeDefined();
    expect(queryByText("9")).toBeDefined();
    expect(queryByText("10")).toBeDefined();
    expect(queryByText("11")).toBeDefined();
  });

  it("should fetch data and update page range when the 5th item is clicked", () => {
    props.page = 8;
    const {queryByText, getByText} = render(<Pagination {...props}/>);
    // Component should be showing 6-10
    expect(queryByText("6")).toBeDefined();
    expect(queryByText("7")).toBeDefined();
    expect(queryByText("8")).toBeDefined();
    expect(queryByText("9")).toBeDefined();
    expect(queryByText("10")).toBeDefined();

    const ten = getByText("10");
    fireEvent.click(ten);
    expect(props.onPageClick).toHaveBeenCalledWith(10);

    // Should be showing 7-11 now.
    expect(queryByText("7")).toBeDefined();
    expect(queryByText("8")).toBeDefined();
    expect(queryByText("9")).toBeDefined();
    expect(queryByText("10")).toBeDefined();
    expect(queryByText("11")).toBeDefined();
  });

  it("should fetch data and update page range when the 2nd item is clicked", () => {
    props.page = 37;
    const {queryByText, getByText} = render(<Pagination {...props}/>);
    // Component should be showing 35-39
    expect(queryByText("35")).toBeDefined();
    expect(queryByText("36")).toBeDefined();
    expect(queryByText("37")).toBeDefined();
    expect(queryByText("38")).toBeDefined();
    expect(queryByText("39")).toBeDefined();

    const secondItem = getByText("36");
    fireEvent.click(secondItem);
    expect(props.onPageClick).toHaveBeenCalledWith(36);

    // Should be showing 34-38 now.
    expect(queryByText("34")).toBeDefined();
    expect(queryByText("35")).toBeDefined();
    expect(queryByText("36")).toBeDefined();
    expect(queryByText("37")).toBeDefined();
    expect(queryByText("38")).toBeDefined();
  });

  it("should fetch data and update page range when the 1st item is clicked", () => {
    props.page = 13;
    const {queryByText, getByText} = render(<Pagination {...props}/>);
    // Component should be showing 11-15
    expect(queryByText("11")).toBeDefined();
    expect(queryByText("12")).toBeDefined();
    expect(queryByText("13")).toBeDefined();
    expect(queryByText("14")).toBeDefined();
    expect(queryByText("15")).toBeDefined();

    const firstItem = getByText("11");
    fireEvent.click(firstItem);
    expect(props.onPageClick).toHaveBeenCalledWith(11);

    // Should be showing 34-38 now.
    expect(queryByText("10")).toBeDefined();
    expect(queryByText("11")).toBeDefined();
    expect(queryByText("12")).toBeDefined();
    expect(queryByText("13")).toBeDefined();
    expect(queryByText("14")).toBeDefined();
  });
});
