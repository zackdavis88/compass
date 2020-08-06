import React from "react";
import ActionsMenu from "./actions-menu";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<ActionsMenu />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "testActionsMenu",
      menuItems: [{
        label: "Taco Tuesday",
        onClick: jest.fn()
      },{
        label: "Wacky Wednesday",
        onClick: jest.fn()
      },{
        label: "Thirsty Thursday",
        onClick: jest.fn()
      }]
    };
  });

  it("should mount the component", () => {
    const component = render(<ActionsMenu {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the 'Actions' text", () => {
    const {getByText} = render(<ActionsMenu {...props}/>);
    expect(getByText("Actions")).toBeDefined();
  });

  it("should render flyout on click", () => {
    const {queryByTestId} = render(<ActionsMenu {...props}/>);
    const actionsMenu = queryByTestId(props.dataTestId);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
    fireEvent.click(actionsMenu);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
  });

  it("should render flyout list and items", () => {
    const {getByText, getByTestId} = render(<ActionsMenu {...props}/>);
    const actionsMenu = getByTestId(props.dataTestId);
    fireEvent.click(actionsMenu);
    expect(getByTestId(`${props.dataTestId}.itemList`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.item.0`)).toBeDefined();
    expect(getByText("Taco Tuesday")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.item.1`)).toBeDefined();
    expect(getByText("Wacky Wednesday")).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.item.2`)).toBeDefined();
    expect(getByText("Thirsty Thursday")).toBeDefined();
  });

  it("should call each items onClick prop on click", () => {
    const {getByTestId} = render(<ActionsMenu {...props}/>);
    const actionsMenu = getByTestId(props.dataTestId);
    
    fireEvent.click(actionsMenu);
    const item1 = getByTestId(`${props.dataTestId}.item.0`);
    fireEvent.click(item1);
    expect(props.menuItems[0].onClick).toHaveBeenCalled();

    fireEvent.click(actionsMenu);
    const item2 = getByTestId(`${props.dataTestId}.item.1`);
    fireEvent.click(item2);
    expect(props.menuItems[1].onClick).toHaveBeenCalled();

    fireEvent.click(actionsMenu);
    const item3 = getByTestId(`${props.dataTestId}.item.2`);
    fireEvent.click(item3);
    expect(props.menuItems[2].onClick).toHaveBeenCalled();
  });

  it("should close the flyout after any click", () => {
    const {getByTestId, queryByTestId} = render(<ActionsMenu {...props}/>);
    const actionsMenu = getByTestId(props.dataTestId);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
    fireEvent.click(actionsMenu);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
    fireEvent.click(actionsMenu);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
  });
});
