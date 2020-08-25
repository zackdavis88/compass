import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputBoxWrapper } from "./input-box.styles";

const InputBox = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const helperVisible = !!(props.helperText || props.errorText);
  const hasValue = !!props.value;
  const isColorPicker = props.type && props.type.toLowerCase() === "color";
  const isNumberPicker = props.type && props.type.toLowerCase() === "number";
  const wrapperProps = {
    hasError: !!props.errorText,
    hasValue,
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
      if(isNumberPicker) {
        // Let's figure out what to do with this data.
        let value = event.target.value;
        if(value !== "")
          value = props.integerRequired ? parseInt(value) : value;
        
        // If we have a numMin value and we are under it. Lets set to numMin.
        if(props.numMin && !isNaN(props.numMin) && Number(value) < Number(props.numMin))
          return props.onChange(props.numMin);
        // If we have numMax and we are over it, set the value to numMax.
        if(props.numMax && !isNaN(props.numMax) && Number(value) > Number(props.numMax))
          return props.onChange(props.numMax);
        
        return props.onChange(value);
      }

      if(!isColorPicker && props.maxLength)
        return props.onChange(event.target.value.substring(0, props.maxLength));

      props.onChange(event.target.value);
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };
  // Assign numMin/numMax if we are a number type input.
  if(isNumberPicker) {
    inputProps.min = props.numMin;
    inputProps.max = props.numMax;
  }

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
  dataTestId: PropTypes.string,
  maxLength: PropTypes.number,
  numMax: PropTypes.string,
  numMin: PropTypes.string,
  integerRequired: PropTypes.bool
};

export default InputBox;