import React from "react";
import PropTypes from "prop-types";
import { NavbarWrapper, NavbarBrand, SidebarToggleButton } from "./navbar.styles";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { toggleSidebar } from "../../store/actions/sidebar";

const Navbar = (props) => {
  return (
    <NavbarWrapper>
      <SidebarToggleButton data-testid="sidebarBtn" isActive={props.sidebarIsOpen} onClick={props.toggleSidebar}>
        <FontAwesomeIcon icon={props.sidebarIsOpen ? faTimes : faBars} fixedWidth />
      </SidebarToggleButton>
      <NavbarBrand>
        <FontAwesomeIcon data-testid="brandIcon" icon={faCompass} fixedWidth />
        <span data-testid="brandName">Compass</span>
      </NavbarBrand>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  sidebarIsOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

export default connect((state) => ({
  sidebarIsOpen: state.sidebar.isOpen
}), {
  toggleSidebar
})(Navbar);
