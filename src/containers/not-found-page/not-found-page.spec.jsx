import React from "react";
import NotFoundPage from "./not-found-page";
import { render, mockStore } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<NotFoundPage />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it("should mount the component", () => {
    const component = render(<NotFoundPage />, store);
    expect(component).toBeDefined();
  });

  it("should render the not-found page header", () => {
    const {getByTestId, getByText} = render(<NotFoundPage />, store);
    expect(getByTestId("notFoundPageHeader")).toBeDefined();
    expect(getByText("Page Not Found")).toBeDefined();
  });

  it("should render a not-found message", () => {
    const expectedMessage = "Sorry, the requested page was not found.";
    const {getByText} = render(<NotFoundPage />, store);
    expect(getByText(expectedMessage)).toBeDefined();
  });

  it("should render the go-back button", () => {
    const {getByTestId, getByText} = render(<NotFoundPage />, store);
    expect(getByTestId("notFoundBackButton")).toBeDefined();
    expect(getByText("Back to Dashboard")).toBeDefined();
  });

  it("should dispatch a redux action to push history", () => {
    const {getByTestId} = render(<NotFoundPage />, store);
    const button = getByTestId("notFoundBackButton");
    fireEvent.click(button);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        method: "push",
        args: ["/dashboard"]
      }
    });
  });
});
