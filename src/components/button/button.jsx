import React from "react";
import PropTypes from "prop-types";
import { ButtonWrapper } from "./button.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = (props) => {
  const wrapperProps = {
    small: props.small,
    startIcon: !!props.startIcon,
    endIcon: !!props.endIcon,
    primary: props.primary,
    secondary: props.secondary,
    danger: props.danger
  };

  const buttonProps = {
    type: "button",
    disabled: props.disabled,
    onClick: props.onClick,
    "data-testid": props.dataTestId
  };

  return (
    <ButtonWrapper {...wrapperProps}>
      <button {...buttonProps}>
        {props.startIcon && <FontAwesomeIcon data-testid={`${props.dataTestId}.startIcon`} icon={props.startIcon} fixedWidth />}
        {props.label}
        {props.endIcon && <FontAwesomeIcon data-testid={`${props.dataTestId}.endIcon`} icon={props.endIcon} fixedWidth />}
      </button>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  startIcon: PropTypes.object,
  endIcon: PropTypes.object,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  danger: PropTypes.bool,
  dataTestId: PropTypes.string
};

export default Button;
