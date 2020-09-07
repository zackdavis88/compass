import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  FlyoutWrapper,
  FlyoutItemList,
  FlyoutMenuItem
} from "./user-menu.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Flyout = ({items, closeMenu, dataTestId}) => {
  // Declare our clickHandler.
  const _handleClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  // Attach the clickHandler, if the menu is open, so we can close the menu when the next click happens.
  useEffect(() => {
    window.addEventListener("click", _handleClick);
    return () => window.removeEventListener("click", _handleClick);
  });

  return (
    <FlyoutWrapper data-testid={dataTestId}>
      <FlyoutItemList>
        {items.map(({icon, label, onClick}, index) => (
          <FlyoutMenuItem key={index} onClick={onClick}>
            <FontAwesomeIcon icon={icon} fixedWidth /> {label}
          </FlyoutMenuItem>
        ))}
      </FlyoutItemList>
    </FlyoutWrapper>
  );
};

Flyout.propTypes = {
  items: PropTypes.array.isRequired,
  closeMenu: PropTypes.func.isRequired,
  dataTestId: PropTypes.string
};

export default Flyout;
