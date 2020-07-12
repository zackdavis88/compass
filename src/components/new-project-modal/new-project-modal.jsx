import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import InputBox from "../input-box/input-box";
import RadioGroup from "../radio-group/radio-group";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const NewProjectModal = (props) => {
  const [state, setState] = useState({
    name: "",
    description: "",
    isPrivate: false,
    nameError: undefined,
    descriptionError: undefined
  });
  
  const _submitDisabled = () => (
    !state.name ||
    !!state.nameError ||
    !!state.descriptionError ||
    props.requestInProgress
  );

  const _submitTooltip = () => _submitDisabled() ? props.requestInProgress ? "request in progress" : "missing required fields" : "";

  const _onSubmit = async() => {
    const { name, description, isPrivate } = state;
    const response = await props.createProject(name, description, isPrivate);
    if(response.error && response.error.includes("name"))
      return setState({...state, nameError: response.error});
    else if(response.error && response.error.includes("description"))
      return setState({...state, descriptionError: response.error});
    else if(response.error) // Dont think we should ever hit this use-case...unless a token expires mid-session.
      return props.showNotification(response.error, "info", false);
    
    props.onClose();
    props.refreshDashboard();
    props.showNotification(response.message, "info", true);
  };

  const modalProps = {
    onClose: props.onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitTooltip(),
    header: {
      startIcon: faFolderPlus,
      text: "New Project"
    },
    dataTestId: "newProjectModal"
  };

  const inputProps = {
    name: {
      id: "name-input",
      dataTestId: "nameInput",
      label: "Name",
      placeholder: "Enter a project name",
      errorText: state.nameError,
      value: state.name,
      isRequired: true,
      onChange: (value) => setState({...state, name: value, nameError: undefined})
    },
    description: {
      id: "description-input",
      dataTestId: "descriptionInput",
      label: "Description",
      placeholder: "Enter a desciption",
      errorText: state.descriptionError,
      value: state.description,
      onChange: (value) => setState({...state, description: value, descriptionError: undefined})
    },
    isPrivate: {
      id: "is-private-input",
      dataTestId: "isPrivateInput",
      name: "isPrivateRadioGroup",
      horizontal: true,
      options: [{
        label: "Public",
        checked: !state.isPrivate,
        onChange: () => setState({...state, isPrivate: false})
      }, {
        label: "Private",
        checked: state.isPrivate,
        onChange: () => setState({...state, isPrivate: true})
      }]
    }
  };

  return (
    <Modal {...modalProps}>
      <InputBox {...inputProps.name} />
      <InputBox {...inputProps.description} />
      <RadioGroup {...inputProps.isPrivate} />
    </Modal>
  );
};

NewProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  requestInProgress: PropTypes.bool.isRequired,
  refreshDashboard: PropTypes.func.isRequired
};

export default NewProjectModal;
