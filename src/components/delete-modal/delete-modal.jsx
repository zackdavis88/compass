import React, {useState} from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import InputBox from "../input-box/input-box";
import CheckBox from "../check-box/check-box";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {MessageSection, InputSection} from "./delete-modal.styles";

const DeleteModal = (props) => {
  const {
    dataTestId,
    headerText,
    bodyText,
    onClose,
    onSubmit,
    resource,
    expectedInput,
    inputProps,
    refreshDashboard
  } = props;
  const [confirmInput, setConfirmInput] = useState(undefined);

  const _submitDisabled = () => confirmInput !== expectedInput;

  const _onSubmit = async() => {
    const response = await onSubmit(resource.id, confirmInput);
    if(response.error)
      return;
    
    onClose();
    if(refreshDashboard)
      refreshDashboard();
  };

  const modalProps = {
    onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitDisabled() ? "missing required input" : "",
    small: true,
    header: {
      startIcon: faTrash,
      text: headerText || "Confirm Delete"
    },
    dataTestId,
    danger: true
  };

  const stringInputProps = {
    id: "confirm-string-input",
    dataTestId: "confirmStringInput",
    label: (inputProps && inputProps.label) || "Confirm Input",
    placeholder: (inputProps && inputProps.placeholder) || "Enter the required value",
    value: confirmInput || "",
    isRequired: true,
    onChange: (value) => setConfirmInput(value)
  };

  const boolInputProps = {
    id: "confirm-bool-input",
    dataTestId: "confirmBoolInput",
    label: "Delete this Resource",
    checked: confirmInput || false,
    onChange: () => setConfirmInput(!confirmInput)
  };

  const _renderInputSection = () => {
    if(typeof expectedInput === "string"){
      return (
        <InputSection data-testid={`${dataTestId}.stringInputSection`}>
          <div>Enter <span>{expectedInput}</span>  below to proceed.</div>
          <InputBox {...stringInputProps} />
        </InputSection>
      );
    }

    return (
      <InputSection data-testid={`${dataTestId}.inputSection`}>
          <div>Check the box below to proceed.</div>
          <CheckBox {...boolInputProps} />
      </InputSection>
    );
  };

  const _renderMessageSection = () => (
    <MessageSection data-testid={`${dataTestId}.messageSection`}>
      <h3>Are you sure?</h3>
      <h3>Once a resource has been deleted it can not be recovered.</h3>
      {bodyText && <div>{bodyText}</div>}
    </MessageSection>
  );

  return (
    <Modal {...modalProps}>
      {_renderMessageSection()}
      {_renderInputSection()}
    </Modal>
  );
};

DeleteModal.propTypes = {
  dataTestId: PropTypes.string,
  headerText: PropTypes.string,
  bodyText: PropTypes.string,
  inputProps: PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  }),
  refreshDashboard: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  expectedInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired
};

export default DeleteModal;
