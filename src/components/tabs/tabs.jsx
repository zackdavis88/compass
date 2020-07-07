import React, {cloneElement, useState} from "react";
import PropTypes from "prop-types";
import {
  TabsWrapper,
  TabHeadersWrapper,
  HeaderWrapper,
  TabPanelsWrapper,
  PanelWrapper
} from "./tabs.styles";

const Tabs = ({dataTestId, children}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsWrapper data-testid={dataTestId}>
      {children && Array.isArray(children) && children.reduce((prev, curr, index) => {
        if(curr.type === TabHeaders)
          return prev.concat(cloneElement(curr, {key: index, dataTestId, setActiveTab}));
        
        if(curr.type === TabPanels)
          return prev.concat(cloneElement(curr, {key: index, dataTestId, activeTab}));
        
        return prev;
      }, [])}
    </TabsWrapper>
  );
};

const TabHeaders = ({dataTestId, setActiveTab, children}) => {
  const _renderTabHeaders = () => {
    if(children && !Array.isArray(children))
      return cloneElement(children, {dataTestId, setActiveTab: () => setActiveTab(0)});

    if(children && Array.isArray(children))
      return children.reduce((prev, curr, index) => curr.type === TabHeader ? prev.concat(
        cloneElement(curr, {key: index, dataTestId, setActiveTab: () => setActiveTab(index)})
      ) : prev, []);
    return children;
  };

  return (
    <TabHeadersWrapper data-testid={`${dataTestId}.tabHeaders`}>
      {_renderTabHeaders()}
    </TabHeadersWrapper>
  );
};

const TabHeader = ({dataTestId, setActiveTab, children}) => {
  return (
    <HeaderWrapper data-testid={`${dataTestId}.tabHeader`} onClick={setActiveTab}>
      {children}
    </HeaderWrapper>
  );
};

const TabPanels = ({dataTestId, activeTab, children}) => {
  const _renderTabPanel = () => {
    if(children && !Array.isArray(children))
      return cloneElement(children, {dataTestId});

    if(children && Array.isArray(children))
      return cloneElement(children[activeTab], {dataTestId});

    return undefined;
  };
  return (
    <TabPanelsWrapper data-testid={`${dataTestId}.tabPanels`}>
      {_renderTabPanel()}
    </TabPanelsWrapper>
  );
};

const TabPanel = ({dataTestId, children}) => {
  return (
    <PanelWrapper data-testid={`${dataTestId}.tabPanel`}>
      {children}
    </PanelWrapper>
  );
};

Tabs.TabHeaders = TabHeaders;
Tabs.Header = TabHeader;
Tabs.TabPanels = TabPanels;
Tabs.Panel = TabPanel;
export default Tabs;
