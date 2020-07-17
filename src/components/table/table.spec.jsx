import React from "react";
import Table from "./table";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<Table />", () => {
  let props;
  let _onClick = jest.fn();
  beforeEach(() => {
    props = {
      dataTestId: "unitTestingTable",
      headers: [{
        label: "Label 1",
        keyName: "key1"
      },{
        label: "Label 2",
        keyName: "key2"
      },{
        label: "Label 3",
        keyName: "key3"
      }],
      rows: [{
        key1: "first value one",
        key2: "first value two",
        key3: "first value three",
        key4: "first value four"
      }, {
        key1: "second value one",
        key2: "second value two",
        key3: "second value three",
        key4: "second value four"
      }],
      rowProps: jest.fn().mockReturnValue({
        onClick: _onClick
      })
    };
  });

  it("should mount the component", () => {
    const component = render(<Table {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the table head with expected headers", () => {
    const {getByTestId, getByText} = render(<Table {...props} />);
    expect(getByTestId("unitTestingTable")).toBeDefined();
    expect(getByTestId("unitTestingTable.table")).toBeDefined();
    expect(getByTestId("unitTestingTable.tableHead")).toBeDefined();
    expect(getByText("Label 1")).toBeDefined();
    expect(getByText("Label 2")).toBeDefined();
    expect(getByText("Label 3")).toBeDefined();
  });

  it("should render the table body with expected data", () => {
    const {getByTestId, queryByText} = render(<Table {...props} />);
    expect(getByTestId("unitTestingTable.tableBody")).toBeDefined();
    expect(queryByText("first value one")).toBeDefined();
    expect(queryByText("first value two")).toBeDefined();
    expect(queryByText("first value three")).toBeDefined();
    expect(queryByText("first value four")).toBeNull();
    expect(queryByText("second value one")).toBeDefined();
    expect(queryByText("second value two")).toBeDefined();
    expect(queryByText("second value three")).toBeDefined();
    expect(queryByText("second value four")).toBeNull();
  });

  it("should apply optional rowProps to each row", () => {
    const {getByText} = render(<Table {...props} />);
    expect(props.rowProps).toHaveBeenCalledTimes(2); // we have 2 rows setup in props.
    const rowCell = getByText("first value one");
    fireEvent.click(rowCell);
    expect(_onClick).toHaveBeenCalledTimes(1);
  });

  it("should format cell data based on the headers format method", () => {
    props.headers[0].format = jest.fn().mockReturnValue("formatted 1").mockReturnValueOnce("formatted 2");
    const {getByText} = render(<Table {...props} />);
    expect(props.headers[0].format).toHaveBeenCalledTimes(2);
    expect(getByText("formatted 1")).toBeDefined();
    expect(getByText("formatted 2")).toBeDefined();
  });

  it("should call renderActions if it is provided to a header", () => {
    props.headers[0].renderActions = jest.fn().mockReturnValue("rendered via actions method");
    const {getAllByText} = render(<Table {...props} />);
    expect(props.headers[0].renderActions).toHaveBeenCalledTimes(2);
    expect(getAllByText("rendered via actions method")).toHaveLength(2);
  });
});
