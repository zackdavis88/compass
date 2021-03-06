import React, {useState} from "react";
import PropTypes from "prop-types";
import {SearchBarWrapper, ClearButton} from "./search-bar.styles";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = !!props.value;
  const wrapperProps = {
    hasValue
  };

  const inputProps = {
    id: props.id,
    type: "text",
    placeholder: isFocused ? "" : props.placeholder,
    value: props.value,
    onChange: (event) => {
      props.onChange(event.target.value);
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };

  const searchButtonProps = {
    onClick: () => props.searchedValue !== props.value && props.search(props.value),
    label: "Search",
    small: true,
    primary: true
  };

  const clearButtonProps = {
    onClick: () => {
      props.clear();
    }
  };

  if(props.dataTestId){
    wrapperProps["data-testid"] = props.dataTestId;
    inputProps["data-testid"] = `${props.dataTestId}.input`;
    searchButtonProps.dataTestId = `${props.dataTestId}.search`;
    clearButtonProps["data-testid"] = `${props.dataTestId}.clear`;
  }

  return (
    <SearchBarWrapper {...wrapperProps}>
      {(isFocused || hasValue ) && <label htmlFor={props.id}>{props.label}</label>}
      <input {...inputProps}/>
      <Button {...searchButtonProps}/>
      {!!props.searchedValue && (
        <ClearButton {...clearButtonProps}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </ClearButton>
      )}
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  searchedValue: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  search: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchBar;
