import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import UserMenu from "../../components/user-menu/user-menu";
import { NavbarWrapper, NavbarBrand, SidebarToggleButton } from "./navbar.styles";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { toggleSidebar, closeSidebar } from "../../store/actions/sidebar";
import { logout } from "../../store/actions/auth";
import { changePassword } from "../../store/actions/user";
import { showNotification } from "../../store/actions/notification";
import ChangePasswordModal from "../../components/change-password-modal/change-password-modal";

const Navbar = (props) => {
  const [showModal, setShowModal] = useState(false);

  const modalProps = {
    onClose: () => setShowModal(false),
    userInfo: props.userInfo,
    changePassword: props.changePassword,
    showNotification: props.showNotification,
    requestInProgress: props.userRequestInProgress
  };

  const userMenuProps = {
    dataTestId: "userMenu",
    userInfo: props.userInfo,
    logout: () => {
      props.logout();
      props.closeSidebar();
    },
    showChangePasswordModal: () => setShowModal(true)
  };

  return (
    <Fragment>
      <NavbarWrapper>
        {props.userInfo && (
          <SidebarToggleButton data-testid="sidebarBtn" isActive={props.sidebarIsOpen} onClick={props.toggleSidebar}>
            <FontAwesomeIcon icon={props.sidebarIsOpen ? faTimes : faBars} fixedWidth />
          </SidebarToggleButton>
        )}
        <NavbarBrand>
          <FontAwesomeIcon data-testid="brandIcon" icon={faCompass} fixedWidth />
          <span data-testid="brandName">Compass</span>
        </NavbarBrand>
        {props.userInfo && <UserMenu {...userMenuProps}/>}
      </NavbarWrapper>
      {showModal && <ChangePasswordModal {...modalProps}/>}
    </Fragment>
  );
};

Navbar.propTypes = {
  sidebarIsOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  userRequestInProgress: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  userInfo: PropTypes.object
};

export default connect((state) => ({
  sidebarIsOpen: state.sidebar.isOpen,
  userInfo: state.auth.user,
  userRequestInProgress: state.user.isLoading
}), {
  toggleSidebar,
  logout,
  changePassword,
  showNotification,
  closeSidebar
})(Navbar);
