import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  FlyoutWrapper,
  FlyoutItemList,
  FlyoutItem
} from "./select-input.styles";

const Flyout = ({dataTestId, items, onItemClick, close}) => {
  const _handleClick = useCallback(() => close());

  useEffect(() => {
    window.addEventListener("click", _handleClick);
    return () => window.removeEventListener("click", _handleClick);
  });

  return (
    <FlyoutWrapper data-testid={dataTestId}>
      <FlyoutItemList>
        {items.length ? items.map((item, index) => (
          <FlyoutItem key={index} onClick={() => onItemClick(item)}>
            {item}
          </FlyoutItem>
        )) : 
        <FlyoutItem>
          No options meet filter critera
        </FlyoutItem>}
      </FlyoutItemList>
    </FlyoutWrapper>
  );
};

Flyout.propTypes = {
  dataTestId: PropTypes.string,
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default Flyout;
