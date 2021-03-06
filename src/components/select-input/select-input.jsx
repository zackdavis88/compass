import React, {useState} from "react";
import PropTypes from "prop-types";
import {SelectInputWrapper} from "./select-input.styles";
import SelectOptionsFlyout from "./select-options-flyout";

const SelectInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showFlyout, setShowFlyout] = useState(false);
  const helperVisible = !!props.errorText;
  const hasValue = !!props.value;

  const _filterItems = () => {
    //WEAK POINT: This is only going to work for items that are strings.
    // This logic will have to change once this component is expanded to support items that are objects.
    const currentVal = props.value;
    const items = props.items;
    return items.filter(item => (
      item.toLowerCase().startsWith(currentVal.toLowerCase())
    ));
  };

  const _focusInput = () => document.getElementById(props.id).focus();

  const wrapperProps = {
    hasError: !!props.errorText,
    hasValue,
    onClick: () => !props.disabled && setShowFlyout(true),
    id: `${props.id}-wrapper`
  };

  const inputProps = {
    id: props.id,
    type: "text",
    placeholder: isFocused ? props.focusedPlaceholder : props.placeholder,
    value: props.value,
    disabled: props.disabled,
    onChange: (event) => props.onChange(event.target.value),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };

  const flyoutProps = {
    dataTestId: "selectInputFlyout",
    items: props.value ? _filterItems() : props.items,
    onItemClick: props.onChange,
    close: () => setShowFlyout(false)
  };

  if(props.dataTestId){
    wrapperProps["data-testid"] = props.dataTestId;
    inputProps["data-testid"] = `${props.dataTestId}.input`;
    flyoutProps.dataTestId = `${props.dataTestId}.flyout`;
  }

  return (
    <SelectInputWrapper {...wrapperProps}>
      {(isFocused || hasValue || showFlyout) && <label htmlFor={props.id}>{props.label}</label>}
      <input {...inputProps}/>
      {helperVisible && <div>{props.errorText}</div>}
      {(props.isRequired && (!isFocused && !hasValue)) && <span onClick={_focusInput}>required</span>}
      {showFlyout && <SelectOptionsFlyout {...flyoutProps}/>}
    </SelectInputWrapper>
  );
};

SelectInput.propTypes = {
  dataTestId: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  focusedPlaceholder: PropTypes.string,
  errorText: PropTypes.string
};

export default SelectInput;
