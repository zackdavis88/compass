import React, {useState} from "react";
import PropTypes from "prop-types";
import {TextAreaWrapper} from "./text-area.styles";

const TextArea = (props) => {
  const {
    id,
    disabled,
    label,
    placeholder,
    value,
    onChange,
    errorText,
    helperText,
    dataTestId
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const isActive = value || isFocused;

  const helperVisible = !!(helperText || errorText);
  const hasValue = !!value;

  const wrapperProps = {
    hasError: !!errorText,
    hasValue,
    helperVisible,
    helperText: errorText || helperText
  };

  const inputProps = {
    id,
    disabled,
    onChange: (event) => onChange(event.target.value),
    value,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    placeholder: isActive ? placeholder : label
  };

  if(dataTestId){
    wrapperProps["data-testid"] = dataTestId;
    inputProps["data-testid"] = `${dataTestId}.input`;
  }

  const _focusInput = () => document.getElementById(id).focus();

  return (
    <TextAreaWrapper {...wrapperProps}>
      {isActive && <label htmlFor={id}>{label}</label>}
      <textarea {...inputProps} />
      {helperVisible && <div>{props.errorText || props.helperText}</div>}
      {(props.isRequired && !isActive) && <span onClick={_focusInput}>required</span>}
    </TextAreaWrapper>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  dataTestId: PropTypes.string,
  isRequired: PropTypes.bool
};

export default TextArea;
