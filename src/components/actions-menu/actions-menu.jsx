import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  ProjectActionsWrapper
} from "./actions-menu.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import ActionsFlyout from "./actions-flyout";

const ProjectActionsMenu = ({menuItems, dataTestId}) => {
  const [showFlyout, setShowFlyout] = useState(false);
  const wrapperProps = {
    menuOpen: showFlyout,
    onClick: () => setShowFlyout(true)
  };
  if(dataTestId)
    wrapperProps["data-testid"] = dataTestId;
  return (
    <ProjectActionsWrapper {...wrapperProps}>
      <span><FontAwesomeIcon icon={faCog} size="sm" fixedWidth/>&nbsp;Actions</span>
      {showFlyout && <ActionsFlyout menuItems={menuItems} closeMenu={() => setShowFlyout(false)} dataTestId={dataTestId} />}
    </ProjectActionsWrapper>
  );
};

ProjectActionsMenu.propTypes = {
  dataTestId: PropTypes.string,
  menuItems: PropTypes.array.isRequired
};

export default ProjectActionsMenu;
