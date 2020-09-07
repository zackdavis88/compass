import React, {useRef} from "react";
import PropTypes from "prop-types";
import {
  CollapsiblePanelWrapper,
  PanelHeader,
  PanelContent,
  Action,
  ActionsWrapper,
  DecorationsWrapper
} from "./collapsible-panel.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";

const CollapsiblePanel = (props) => {
  const contentElement = useRef(null);
  const contentHeight = contentElement.current && contentElement.current.scrollHeight;
  const expandCollapseAction = useRef(null);

  const _onClick = () => {
    const classList = expandCollapseAction.current.classList;
    const newValue = !props.isActive;
    props.onHeaderClick(newValue);
    // We got set to active. Remove the rotateUp class and attach rotateDown.
    if(newValue) {
      classList.remove("rotateUp");
      void expandCollapseAction.current.offsetWidth; // REQUIRED black-magic to get the animations to retrigger every click.
      classList.add("rotateDown");
    }
    else {
      classList.remove("rotateDown");
      void expandCollapseAction.current.offsetWidth;
      classList.add("rotateUp");
    }
  };

  const wrapperProps = {isActive: props.isActive, contentHeight, hasDecorations: !!props.decorations};
  const headerProps = {type: "button", onClick: _onClick};
  const contentProps = {ref: contentElement};
  const expandCollapseProps = {ref: expandCollapseAction, className: "collapsibleExpandAction highlightAction"};
  const actionsProps = {};
  const decorationsProps = {};
  if(props.dataTestId) {
    wrapperProps["data-testid"] = props.dataTestId;
    headerProps["data-testid"] = `${props.dataTestId}.header`;
    contentProps["data-testid"] = `${props.dataTestId}.contentPanel`;
    expandCollapseProps["data-testid"] = `${props.dataTestId}.toggleAction`;
    actionsProps["data-testid"] = `${props.dataTestId}.actionsWrapper`;
    decorationsProps["data-testid"] = `${props.dataTestId}.decorationsWrapper`;
  }

  return (
    <CollapsiblePanelWrapper {...wrapperProps}>
      <PanelHeader {...headerProps}>
        <div>{props.headerText}</div>
        <Action {...expandCollapseProps}>
          <FontAwesomeIcon icon={faChevronUp} fixedWidth />
        </Action>
        {props.actions && (
          <ActionsWrapper {...actionsProps}>
            {props.actions}
          </ActionsWrapper>
        )}
        {props.decorations && (
          <DecorationsWrapper {...decorationsProps}>
            {props.decorations}
          </DecorationsWrapper>
        )}
      </PanelHeader>
      <PanelContent {...contentProps}>
        {props.children}
      </PanelContent>
    </CollapsiblePanelWrapper>
  );
};

CollapsiblePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  actions: PropTypes.element,
  decorations: PropTypes.element,
  dataTestId: PropTypes.string
};

export default CollapsiblePanel;
