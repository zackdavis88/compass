import React from "react";
import PropTypes from "prop-types";
import {LoadingSpinnerWrapper, Spinner, SpinnerDot} from "./loading-spinner.styles";

const LoadingSpinner = ({alignCenter, dataTestId, message}) => {
  const wrapperProps = {alignCenter};
  const spinnerProps = {};
  const messageProps = {};
  if(dataTestId){
    wrapperProps["data-testid"] = dataTestId;
    spinnerProps["data-testid"] = `${dataTestId}.spinner`;
    messageProps["data-testid"] = `${dataTestId}.message`;
  }

  return (
    <LoadingSpinnerWrapper {...wrapperProps}>
      <Spinner {...spinnerProps}>
        <SpinnerDot/>
        <SpinnerDot/>
        <SpinnerDot/>
        <SpinnerDot/>
        <SpinnerDot/>
        <SpinnerDot/>
        <SpinnerDot/>
        <SpinnerDot/>
      </Spinner>
      {message && <div {...messageProps}>{message}</div>}
    </LoadingSpinnerWrapper>
  );
};

LoadingSpinner.propTypes = {
  centerLoader: PropTypes.bool,
  dataTestId: PropTypes.string,
  message: PropTypes.string
};

export default LoadingSpinner;
