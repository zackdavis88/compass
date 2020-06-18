import React, { useState } from "react";
import PropTypes from "prop-types";
import UserMenuFlyout from "./user-menu-flyout";
import { UserMenuWrapper } from "./user-menu.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faKey, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserMenu = ({userInfo, logout, dataTestId}) => {
  const [flyoutIsOpen, setFlyoutIsOpen] = useState(false);
  const flyoutItems = [{
    icon: faKey,
    label: "Change Password",
    onClick: () => {console.log("show change password modal")}
  },{
    icon: faSignOutAlt,
    label: "Sign Out",
    onClick: logout
  }];
  
  return (
    <UserMenuWrapper>
      <span data-testid={dataTestId} onClick={() => setFlyoutIsOpen(true)}>
        {userInfo.displayName}<FontAwesomeIcon icon={faCaretDown} fixedWidth/>
      </span>
      {flyoutIsOpen && <UserMenuFlyout dataTestId={`${dataTestId}.flyout`} items={flyoutItems} closeMenu={() => setFlyoutIsOpen(false)} />}
    </UserMenuWrapper>
  );
};

UserMenu.propTypes = {
  userInfo: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default UserMenu;
