import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  SidebarWrapper, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter
} from "./sidebar.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Sidebar = ({isOpen}) => {
  return (
    <SidebarWrapper isOpen={isOpen}>
      {isOpen && (
        <SidebarContent data-testid="sidebarContent">
          <SidebarHeader data-testid="sidebarHeader">
            <FontAwesomeIcon icon={faSitemap} size="sm" fixedWidth/> Sidebar Header
          </SidebarHeader>
          {/* Content will go here...once I figure out what it is. */}
          <SidebarFooter data-testid="sidebarFooter">
            <FontAwesomeIcon icon={faGithub} size="2x" fixedWidth />
            <div>
              <span><a href="https://github.com/zackdavis88/compass">UI</a></span>
              <span><a href="https://github.com/zackdavis88/needle">API</a></span>
            </div>
          </SidebarFooter>
        </SidebarContent>
      )}
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default connect((state) => ({
  isOpen: state.sidebar.isOpen
}), {})(Sidebar);
