import React, {useState} from "react";
import PropTypes from "prop-types";
import {TextAreaWrapper} from "./text-area.styles";

const TextArea = (props) => {
  const {
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
    id: "debug",
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

  return (
    <TextAreaWrapper {...wrapperProps}>
      {isActive && <label>{label}</label>}
      <textarea {...inputProps} />
      {helperVisible && <div>{props.errorText || props.helperText}</div>}
    </TextAreaWrapper>
  );
};

TextArea.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  helperText: PropTypes.string,
  dataTestId: PropTypes.string
};

export default TextArea;
