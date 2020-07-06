import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { 
  SidebarWrapper, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  NavList,
  NavItem
} from "./sidebar.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { push } from "connected-react-router";
import allRoutes from "../../routes";
const navLinks = allRoutes.reduce((prev, curr) => curr.name ? prev.concat(curr) : prev, []);

const Sidebar = ({isOpen, location, historyPush}) => {
  const _navClick = (linkTo) => {
    return historyPush(linkTo);
  };

  return (
    <SidebarWrapper isOpen={isOpen}>
      {isOpen && (
        <SidebarContent data-testid="sidebarContent">
          <SidebarHeader data-testid="sidebarHeader">
            <FontAwesomeIcon icon={faSitemap} size="sm" fixedWidth/> Navigation
          </SidebarHeader>
          <NavList data-testid="sidebarNavList">
            {navLinks.map((item, index) => (
              <NavItem key={index} activeLink={item.path === location.pathname} onClick={() => _navClick(item.path)} data-testid="sidebarNavItem">
                {item.name}
              </NavItem>
            ))}
          </NavList>
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
  isOpen: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  historyPush: PropTypes.func.isRequired
};

export default connect((state) => ({
  isOpen: state.sidebar.isOpen,
  location: state.router.location
}), {
  historyPush: push
})(Sidebar);
