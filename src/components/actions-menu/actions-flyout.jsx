import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  FlyoutWrapper,
  ItemList,
  Item
} from "./actions-menu.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Flyout = ({menuItems, closeMenu, dataTestId}) => {
  const _handleClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    window.addEventListener("click", _handleClick);
    return () => window.removeEventListener("click", _handleClick);
  });

  const wrapperProps = {};
  const listProps = {};
  if(dataTestId) {
    wrapperProps["data-testid"] = `${dataTestId}.flyout`;
    listProps["data-testid"] = `${dataTestId}.itemList`;
  }
  return (
    <FlyoutWrapper {...wrapperProps}>
      <ItemList {...listProps}>
        {menuItems.map(({icon, label, onClick}, index) => {
          const itemProps = {
            key: index,
            onClick
          };
          if(dataTestId)
            itemProps["data-testid"] = `${dataTestId}.item.${index}`;
          return (
            <Item {...itemProps}>
              {icon && <FontAwesomeIcon icon={icon}/>}{label}
            </Item>
          )
        })}
      </ItemList>
    </FlyoutWrapper>
  );
};

Flyout.propTypes = {
  dataTestId: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
  closeMenu: PropTypes.func.isRequired
};

export default Flyout;
