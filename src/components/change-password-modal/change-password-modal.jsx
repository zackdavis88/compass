import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import InputBox from "../input-box/input-box";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const ChangePasswordModal = (props) => {
  // const {onClose, userInfo, changePassword, showNotification, requestInProgress} = props;

  // Declare our state to be used for form input/errors
  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    currentPasswordError: undefined,
    newPasswordError: undefined,
    confirmPasswordError: undefined
  });
  
  // Generate flag for disabling the modal submit button
  const _submitDisabled = () => (
    !state.currentPassword ||
    !state.newPassword ||
    !state.confirmPassword ||
    !!state.currentPasswordError ||
    !!state.newPasswordError ||
    !!state.confirmPasswordError ||
    props.requestInProgress
  );

  const _submitTooltip = () => _submitDisabled() ? props.requestInProgress ? "request in progress" : "missing required fields" : "";

  // Method to validate all input upon submit
  const _validateInputs = () => {
    return new Promise((resolve) => {
      const {newPassword, confirmPassword} = state;
      if(newPassword !== confirmPassword)
        return resolve({confirmPasswordError: "password input does not match the new password"});

      resolve();
    });
  };

  // Handles the logic for validating / submitting form data
  const _onSubmit = async() => {
    const inputError = await _validateInputs();
    if(inputError)
      return setState({...state, ...inputError});
    
    const { currentPassword, newPassword } = state;
    const response = await props.changePassword(props.userInfo.username, currentPassword, newPassword);
    if(response.error && response.error.includes("current"))
      return setState({...state, currentPasswordError: response.error});
    else if(response.error)
      return setState({...state, newPasswordError: response.error});
    
    props.onClose();
    props.showNotification(response.message, "info", true);
  };

  const modalProps = {
    onClose: props.onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitTooltip(),
    small: true,
    header: {
      startIcon: faKey,
      text: "Change Password"
    },
    dataTestId: "changePasswordModal"
  };

  const inputProps = {
    currentPassword: {
      id: "current-password-input",
      dataTestId: "currentPasswordInput",
      type: "password",
      label: "Current Password",
      placeholder: "Enter your current password",
      errorText: state.currentPasswordError,
      value: state.currentPassword,
      isRequired: true,
      onChange: (value) => setState({...state, currentPassword: value, currentPasswordError: undefined})
    },
    newPassword: {
      id: "new-password-input",
      dataTestId: "newPasswordInput",
      type: "password",
      label: "New Password",
      placeholder: "Enter a new password",
      errorText: state.newPasswordError,
      value: state.newPassword,
      isRequired: true,
      onChange: (value) => setState({...state, newPassword: value, newPasswordError: undefined})
    },
    confirmPassword: {
      id: "confirm-password-input",
      dataTestId: "confirmPasswordInput",
      type: "password",
      label: "Confirm Password",
      placeholder: "Enter the new password again",
      errorText: state.confirmPasswordError,
      value: state.confirmPassword,
      isRequired: true,
      onChange: (value) => setState({...state, confirmPassword: value, confirmPasswordError: undefined})
    }
  };

  return (
    <Modal {...modalProps}>
      <InputBox {...inputProps.currentPassword} />
      <InputBox {...inputProps.newPassword} />
      <InputBox {...inputProps.confirmPassword} />
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  requestInProgress: PropTypes.bool.isRequired
};

export default ChangePasswordModal;
