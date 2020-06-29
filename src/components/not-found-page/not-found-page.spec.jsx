import React from "react";
import NotFoundPage from "./not-found-page";
import { render } from "../../test-utils";

describe("<NotFoundPage />", () => {
  it("should mount the component", () => {
    const component = render(<NotFoundPage />);
    expect(component).toBeDefined();
  });

  it("should render the not-found page header", () => {
    const {getByTestId, getByText} = render(<NotFoundPage />);
    expect(getByTestId("notFoundPageHeader")).toBeDefined();
    expect(getByText("Page Not Found")).toBeDefined();
  });

  it("should render a not-found message", () => {
    const expectedMessage = "Sorry, the requested page was not found.";
    const {getByText} = render(<NotFoundPage />);
    expect(getByText(expectedMessage)).toBeDefined();
  });
});
