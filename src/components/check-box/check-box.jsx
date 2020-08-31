import React from "react";
import PropTypes from  "prop-types";
import {CheckBoxWrapper, CheckBoxSquare} from "./check-box.styles";

const CheckBox = (props) => {
  const {id, dataTestId, disabled, label, checked, onChange, strikeText} = props;
  const checkValue = !!checked;
  const wrapperProps = {
    id,
    "data-testid": dataTestId,
    disabled,
    strikeText: strikeText && checked
  }
  return (
    <CheckBoxWrapper {...wrapperProps}>
      {label}
      <input data-testid={`${dataTestId}.input`} type="checkbox" checked={checkValue} onChange={onChange} disabled={disabled}/>
      <CheckBoxSquare />
    </CheckBoxWrapper>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string,
  dataTestId: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  strikeText: PropTypes.bool
};

export default CheckBox;
