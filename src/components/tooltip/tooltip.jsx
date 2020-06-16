import React from "react";
import PropTypes from "prop-types";
import { TooltipWrapper } from "./tooltip.styles";

const Tooltip = ({text}) => {
  return (
    <TooltipWrapper>
      {text}
    </TooltipWrapper>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};

export default Tooltip;
