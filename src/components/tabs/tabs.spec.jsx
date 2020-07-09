import React from "react";
import Tabs from "./tabs";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";

describe("<Tabs />", () => {
  let tabsComponent;
  beforeEach(() => {
    tabsComponent = (
      <Tabs dataTestId="unitTestingTabs">
        <Tabs.TabHeaders>
          <Tabs.Header>Tab 1</Tabs.Header>
          <Tabs.Header>Tab 2</Tabs.Header>
        </Tabs.TabHeaders>
        <Tabs.TabPanels>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
          <Tabs.Panel>Content 3</Tabs.Panel>
        </Tabs.TabPanels>
      </Tabs>
    );
  });

  it("should mount the component", () => {
    const component = render(tabsComponent);
    expect(component).toBeDefined();
  });

  it("should not render children that are not TabHeaders or TabPanels", () => {
    tabsComponent = (
      <Tabs dataTestId="unitTestingTabs">
        <div>
          <div>Tab 1</div>
          <div>Tab 2</div>
        </div>
        <div>
          <div>Content 1</div>
          <div>Content 2</div>
        </div>
      </Tabs>
    );
    const {queryByTestId, queryByText} = render(tabsComponent);
    expect(queryByTestId("unitTestingTabs.tabHeaders")).toBeNull();
    expect(queryByTestId("unitTestingTabs.tabPanels")).toBeNull();
    expect(queryByText("Tab 1")).toBeNull();
    expect(queryByText("Tab 2")).toBeNull();
    expect(queryByText("Content 1")).toBeNull();
    expect(queryByText("Content 2")).toBeNull();
  });

  it("should not render children that are not Headers under TabHeaders", () => {
    tabsComponent = (
      <Tabs dataTestId="unitTestingTabs">
        <Tabs.TabHeaders>
          <div>Tab 1</div>
          <div>Tab 2</div>
        </Tabs.TabHeaders>
        <div>
          <div>Content 1</div>
          <div>Content 2</div>
        </div>
      </Tabs>
    );
    const {getByTestId, queryByText} = render(tabsComponent);
    expect(getByTestId("unitTestingTabs.tabHeaders")).toBeDefined();
    expect(queryByText("Tab 1")).toBeNull();
    expect(queryByText("Tab 2")).toBeNull();
  });

  it("should not render children that are not Panels under TabPanels", () => {
    tabsComponent = (
      <Tabs dataTestId="unitTestingTabs">
        <Tabs.TabHeaders>
          <div>Tab 1</div>
        </Tabs.TabHeaders>
        <Tabs.TabPanels>
          <div>Content 1</div>
        </Tabs.TabPanels>
      </Tabs>
    );
    const {getByTestId, queryByText} = render(tabsComponent);
    expect(getByTestId("unitTestingTabs.tabPanels")).toBeDefined();
    expect(queryByText("Content 1")).toBeNull();
  });

  it("should render Header tabs under TabHeaders", () => {
    tabsComponent = (
      <Tabs dataTestId="unitTestingTabs">
        <Tabs.TabHeaders>
          <Tabs.Header>Tab 1</Tabs.Header>
        </Tabs.TabHeaders>
        <Tabs.TabPanels>
          <Tabs.Panel>Content 1</Tabs.Panel>
        </Tabs.TabPanels>
      </Tabs>
    );
    const {getByTestId, getByText} = render(tabsComponent);
    expect(getByTestId("unitTestingTabs.tabHeaders")).toBeDefined();
    expect(getByText("Tab 1")).toBeDefined();
  });

  it("should render the first Panel under TabPanels by default", () => {
    tabsComponent = (
      <Tabs dataTestId="unitTestingTabs">
        <Tabs.TabHeaders>
          <Tabs.Header>Tab 1</Tabs.Header>
        </Tabs.TabHeaders>
        <Tabs.TabPanels>
          <Tabs.Panel>Content 1</Tabs.Panel>
        </Tabs.TabPanels>
      </Tabs>
    );
    const {getByTestId, getByText} = render(tabsComponent);
    expect(getByTestId("unitTestingTabs.tabPanels")).toBeDefined();
    expect(getByText("Content 1")).toBeDefined();
  });

  it("should render panel content based on the tab clicked", () => {
    // This test checks full Tabs functionality.
    const {getByTestId, getAllByTestId, queryByText} = render(tabsComponent);
    // Ensure all expected testids are present.
    expect(getByTestId("unitTestingTabs")).toBeDefined();
    expect(getByTestId("unitTestingTabs.tabHeaders")).toBeDefined();
    expect(getByTestId("unitTestingTabs.tabPanels")).toBeDefined();
    expect(getAllByTestId("unitTestingTabs.tabHeader")).toHaveLength(2);
    expect(getAllByTestId("unitTestingTabs.tabPanel")).toHaveLength(1);

    // Validate that we are rendering the expected text.
    const tab1 = queryByText("Tab 1");
    const tab2 = queryByText("Tab 2");
    expect(tab1).toBeDefined();
    expect(tab2).toBeDefined();
    expect(queryByText("Content 1")).toBeDefined();

    // Clicking tabs should determine which content we render.
    fireEvent.click(tab2);
    expect(queryByText("Content 1")).toBeNull();
    expect(queryByText("Content 2")).toBeDefined();

    fireEvent.click(tab1);
    expect(queryByText("Content 1")).toBeDefined();
    expect(queryByText("Content 2")).toBeNull();
  });
});
