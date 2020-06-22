import React from "react";
import PropTypes from "prop-types";
import UserMenu from "../../components/user-menu/user-menu";
import { NavbarWrapper, NavbarBrand, SidebarToggleButton } from "./navbar.styles";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { toggleSidebar } from "../../store/actions/sidebar";
import { logout } from "../../store/actions/auth";

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
      {props.userInfo && <UserMenu dataTestId="userMenu" userInfo={props.userInfo} logout={props.logout}/>}
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  sidebarIsOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  userInfo: PropTypes.object
};

export default connect((state) => ({
  sidebarIsOpen: state.sidebar.isOpen,
  userInfo: state.auth.user
}), {
  toggleSidebar,
  logout
})(Navbar);
