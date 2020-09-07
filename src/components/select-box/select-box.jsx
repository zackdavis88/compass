import React, {useState, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import {
  SelectBoxWrapper,
  SelectedValue, 
  IconsWrapper, 
  OptionsWrapper,
  SelectList,
  SelectItem
} from "./select-box.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";

const SelectBox = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const _clickListener = useCallback(() => {
    if(showOptions)
      setShowOptions(false);
  }, [showOptions]);

  useEffect(() => {
    window.addEventListener("click", _clickListener);
    return () => window.removeEventListener("click", _clickListener);
  });

  const _onClearClick = (e) => {
    if(!showOptions)
      e.stopPropagation();
    
    if(typeof props.clearValue === "function")
      props.clearValue();
  };

  const _getSelectedStatus = (option) => option.toLowerCase() === props.selectedValue.toLowerCase();

  const hasValue = !!props.selectedValue;
  const wrapperProps = {dropdownOpen: showOptions, hasValue, onClick: () => setShowOptions(true)};
  const optionsProps = {};
  const clearButtonProps = {
    className: "clearButton",
    icon: faTimes,
    fixedWidth: true,
    onClick: _onClearClick
  };
  if(props.dataTestId) {
    wrapperProps["data-testid"] = props.dataTestId;
    optionsProps["data-testid"] = `${props.dataTestId}.options`;
    clearButtonProps["data-testid"] = `${props.dataTestId}.clearButton`;
  }

  return (
    <SelectBoxWrapper {...wrapperProps}>
      {(hasValue || showOptions) && (
        <span className="selectBoxLabel">{props.label}</span>
      )}
      <SelectedValue>
        {hasValue ? props.selectedValue : props.placeholder}
        <IconsWrapper>
          {hasValue && props.clearValue && (
            <FontAwesomeIcon {...clearButtonProps} />
          )}
          <FontAwesomeIcon icon={showOptions ? faCaretUp : faCaretDown} fixedWidth/>
        </IconsWrapper>
      </SelectedValue>
      {showOptions && (
        <OptionsWrapper {...optionsProps}>
          <SelectList>
            {props.options && props.options.map((option, index) => (
              <SelectItem key={index} isSelected={_getSelectedStatus(option)} onClick={() => props.onChange(option)}>
                {option}
                {_getSelectedStatus(option) && (
                  <FontAwesomeIcon icon={faCheck} size="sm" fixedWidth/>
                )}
              </SelectItem>
            ))}
          </SelectList>
        </OptionsWrapper>
      )}
    </SelectBoxWrapper>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string
  ]).isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  clearValue: PropTypes.func,
  dataTestId: PropTypes.string
};

export default SelectBox;
