import React from "react";
import CollapsiblePanel from "./collapsible-panel";
import {Action} from "./collapsible-panel.styles";
import { render } from "../../test-utils";
import {fireEvent} from "@testing-library/react";

describe("<CollapsiblePanel />", () => {
  let props;
  let component;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestCollapsiblePanel",
      isActive: false,
      onHeaderClick: jest.fn(),
      headerText: "Unit Testing Collapsible Panel"
    };
    component = (
      <CollapsiblePanel {...props} >
        unit test sample text
      </CollapsiblePanel>
    );
  });

  it("should mount the component", () => {
    expect(render(component)).toBeDefined();
  });

  it("should render the panel header and header text", () => {
    const {getByTestId, getByText} = render(component);
    expect(getByTestId("unitTestCollapsiblePanel")).toBeDefined();
    expect(getByTestId("unitTestCollapsiblePanel.header")).toBeDefined();
    expect(getByText("Unit Testing Collapsible Panel")).toBeDefined();
  });

  it("should render the panel content as hidden by default", () => {
    const {getByTestId} = render(component);
    const contentPanel = getByTestId("unitTestCollapsiblePanel.contentPanel")
    expect(contentPanel).toBeDefined();
    const contentPanelStyles = window.getComputedStyle(contentPanel);
    expect(contentPanelStyles.maxHeight).toEqual("0");
  });

  it("should render the panel content when isActive is true", () => {
    props = {...props, isActive: true};
    component = <CollapsiblePanel {...props}><div>sample content text</div></CollapsiblePanel>;
    const {getByText} = render(component);
    expect(getByText("sample content text")).toBeDefined();
  });

  it("should call props.onHeaderClick when the header is clicked", () => {
    const {getByTestId} = render(component);
    const panelHeader = getByTestId(`${props.dataTestId}.header`);
    fireEvent.click(panelHeader);
    expect(props.onHeaderClick).toHaveBeenCalledWith(!props.isActive);
    fireEvent.click(panelHeader);
    expect(props.onHeaderClick).toHaveBeenLastCalledWith(!props.isActive);
    expect(props.onHeaderClick).toHaveBeenCalledTimes(2);
  });

  it("should render the expand/collapse Action component", () => {
    const {getByTestId} = render(component);
    expect(getByTestId(`${props.dataTestId}.toggleAction`)).toBeDefined();
  });

  it("should set the rotateDown class when an in-active header is clicked", () => {
    const {getByTestId} = render(component);
    const expandCollapseAction = getByTestId(`${props.dataTestId}.toggleAction`);
    expect(expandCollapseAction.className).not.toContain("rotateDown");
    fireEvent.click(expandCollapseAction);
    expect(expandCollapseAction.className).toContain("rotateDown");
  });

  it("should set the rotateUp class when an active header is clicked", () => {
    props = {...props, isActive: true};
    component = <CollapsiblePanel {...props}><div>sample content text</div></CollapsiblePanel>;
    const {getByTestId} = render(component);
    const expandCollapseAction = getByTestId(`${props.dataTestId}.toggleAction`);
    expect(expandCollapseAction.className).not.toContain("rotateUp");
    fireEvent.click(expandCollapseAction);
    expect(expandCollapseAction.className).toContain("rotateUp");
  });

  it("should not render the ActionsWrapper if props.actions is not present", () => {
    const {queryByTestId} = render(component);
    expect(queryByTestId(`${props.dataTestId}.actionsWrapper`)).toBeNull();
  });

  it("should render the ActionsWrapper if props.actions is present", () => {
    props.actions = <Action>test action</Action>;
    component = <CollapsiblePanel {...props}>sample content</CollapsiblePanel>;
    const {queryByTestId, getByText} = render(component);
    expect(queryByTestId(`${props.dataTestId}.actionsWrapper`)).toBeDefined();
    expect(getByText("test action")).toBeDefined();
  });
});
