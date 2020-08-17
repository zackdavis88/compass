import React from "react";
import MarkdownText from "./markdown-text";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<MarkdownText />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestMarkdownText",
      sourceData: "# HeaderTest\n\nsome more text\n"
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
});
