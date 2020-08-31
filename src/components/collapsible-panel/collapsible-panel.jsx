import React, {useRef} from "react";
import PropTypes from "prop-types";
import {
  CollapsiblePanelWrapper,
  PanelHeader,
  PanelContent
} from "./collapsible-panel.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";

const CollapsiblePanel = (props) => {
  const contentElement = useRef(null);
  const contentHeight = contentElement.current && contentElement.current.scrollHeight;
  return (
    <CollapsiblePanelWrapper isActive={props.isActive} contentHeight={contentHeight}>
      <PanelHeader type="button" onClick={() => props.onHeaderClick(!props.isActive)}>
        {props.headerText}
        <FontAwesomeIcon icon={props.isActive ? faMinus : faPlus} fixedWidth />
      </PanelHeader>
      <PanelContent ref={contentElement}>
        {props.children}
      </PanelContent>
    </CollapsiblePanelWrapper>
  );
};

CollapsiblePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired
};

export default CollapsiblePanel;
