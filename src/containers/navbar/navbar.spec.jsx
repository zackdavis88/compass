import React from "react";
import { render } from '@testing-library/react';
import Navbar from "./navbar";

describe("<Navbar />", () => {
  it("should mount the component", () => {
    const component = render(<Navbar />);
    expect(component).toBeDefined();
  });

  it("should render the brand text", () => {
    const {getByTestId, getByText} = render(<Navbar />);
    expect(getByTestId("brandName")).toBeDefined();
    expect(getByText("Compass")).toBeDefined();
  });

  it("should render the brand icon", () => {
    const {getByTestId} = render(<Navbar />);
    expect(getByTestId("brandIcon")).toBeDefined();
  });
});
