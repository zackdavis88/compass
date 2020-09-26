import React from "react";
import Footer from "./footer";
import { render } from "../../test-utils";
import {version, license} from "../../../package.json";

describe("<Footer />", () => {
  it("should mount the component", () => {
    const component = render(<Footer />);
    expect(component).toBeDefined();
  });

  it("should render the application license", () => {
    const {getByText} = render(<Footer />);
    expect(getByText(license)).toBeDefined();
  });

  it("should render the application version", () => {
    const {getByText} = render(<Footer />);
    expect(getByText(`v${version}`)).toBeDefined();
  });

  it("should render the repository link for the UI", () => {
    const {getByText} = render(<Footer />);
    expect(getByText("UI")).toBeDefined();
    expect(getByText("UI")).toHaveAttribute("href", "https://github.com/zackdavis88/compass");
  });

  it("should render the repository link for the API", () => {
    const {getByText} = render(<Footer />);
    expect(getByText("API")).toBeDefined();
    expect(getByText("API")).toHaveAttribute("href", "https://github.com/zackdavis88/needle");
  });
});
