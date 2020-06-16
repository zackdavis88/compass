import React from "react";
import Tooltip from "./tooltip";
import { render } from "../../test-utils";

describe("<LoginForm />", () => {
  let props;
  beforeEach(() => {
    props = {
      text: "unit testing tooltip"
    };
  });

  it("should mount the component", () => {
    const component = render(<Tooltip {...props}/>);
    expect(component).toBeDefined();
  });

  it("should render the text property", () => {
    const {getByText} = render(<Tooltip {...props}/>);
    expect(getByText("unit testing tooltip")).toBeDefined();
  });
});
