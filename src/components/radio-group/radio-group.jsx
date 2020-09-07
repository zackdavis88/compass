import React from "react";
import PropTypes from "prop-types";
import {RadioGroupWrapper, RadioContainer, RadioCircle} from "./radio-group.styles";

const RadioGroup = (props) => {
  const {id, dataTestId, name, options, horizontal, disabled} = props;
  return (
    <RadioGroupWrapper id={id} data-testid={dataTestId} horizontal={horizontal}>
      {options.length && options.map((item, index) => (
        <RadioContainer key={index} disabled={disabled}>
          {item.label}
          <input data-testid={`${dataTestId}.option.${index}`} type="radio" checked={item.checked} onChange={item.onChange} name={name} disabled={disabled} />
          <RadioCircle />
        </RadioContainer>
      ))}
    </RadioGroupWrapper>
  );
};

RadioGroup.propTypes = {
  id: PropTypes.string,
  dataTestId: PropTypes.string,
  horizontal: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default RadioGroup;
