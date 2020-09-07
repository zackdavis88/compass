import React from "react";
import MarkdownText from "./markdown-text";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<MarkdownText />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestMarkdownText",
      sourceData: "# HeaderTest\n\nsome more text\n",
      updateMarkdown: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<MarkdownText {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the sourceData as markdown", () => {
    const {getByText} = render(<MarkdownText {...props} />);
    expect(getByText("HeaderTest")).toBeDefined();
    expect(document.getElementsByTagName("h1")).toHaveLength(1);
    expect(getByText("some more text")).toBeDefined();
  });

  it("should render a CheckBox component that calls props.updateMarkdown on click", async() => {
    const initialMarkdown = "### Checkboxes\n\n- [ ] First Box\n- [ ] Second Box";
    const updatedMarkdown = "### Checkboxes\n\n- [x] First Box\n- [ ] Second Box";
    props.sourceData = initialMarkdown;
    const {queryByText, queryByTestId} = render(<MarkdownText {...props} />);
    expect(queryByText("First Box")).toBeDefined();
    expect(queryByText("Second Box")).toBeDefined();
    expect(queryByTestId("markdownCheckbox.1")).toBeDefined();
    const checkboxElement = queryByTestId("markdownCheckbox.0");
    expect(checkboxElement).toBeDefined();
    fireEvent.click(checkboxElement);
    expect(props.updateMarkdown).toHaveBeenCalledWith(updatedMarkdown);
  });
});
