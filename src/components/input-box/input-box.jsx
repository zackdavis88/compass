import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputBoxWrapper } from "./input-box.styles";

const InputBox = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const helperVisible = !!(props.helperText || props.errorText);
  const hasValue = !!props.value;
  const isColorPicker = props.type && props.type.toLowerCase() === "color";
  const wrapperProps = {
    hasError: !!props.errorText,
    hasValue,
    helperVisible,
    helperText: props.errorText || props.helperText,
    isColorPicker
  };

  const inputProps = {
    id: props.id,
    type: props.type || "text",
    placeholder: isFocused ? props.placeholder : props.label,
    value: props.value,
    disabled: props.disabled,
    onChange: (event) => {
      props.onChange(event.target.value);
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };

  if(props.dataTestId){
    wrapperProps["data-testid"] = props.dataTestId;
    inputProps["data-testid"] = `${props.dataTestId}.input`;
  }

  const _focusInput = () => document.getElementById(props.id).focus();

  return (
    <InputBoxWrapper {...wrapperProps}>
      {(isFocused || hasValue ) && <label htmlFor={props.id}>{props.label}</label>}
      <input {...inputProps}/>
      {helperVisible && <div>{props.errorText || props.helperText}</div>}
      {(props.isRequired && (!isFocused && !hasValue)) && <span onClick={_focusInput}>required</span>}
    </InputBoxWrapper>
  )
};

InputBox.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  disabled: PropTypes.bool,
  disabledTooltip: PropTypes.string,
  isRequired: PropTypes.bool,
  dataTestId: PropTypes.string
};

export default InputBox;