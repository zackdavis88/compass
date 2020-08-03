import React from "react";
import PropTypes from  "prop-types";
import {CheckBoxWrapper, CheckBoxSquare} from "./check-box.styles";

const CheckBox = (props) => {
  const {id, dataTestId, disabled, label, checked, onChange} = props;
  const checkValue = !!checked;
  return (
    <CheckBoxWrapper id={id} data-testid={dataTestId} disabled={disabled}>
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
  onChange: PropTypes.func.isRequired
};

export default CheckBox;
