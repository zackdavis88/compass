import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import InputBox from "../input-box/input-box";
import RadioGroup from "../radio-group/radio-group";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import TextArea from "../text-area/text-area";

const ProjectModal = (props) => {
  const isEdit = !!props.project;
  const [state, setState] = useState({
    name: isEdit ? props.project.name : "",
    description: isEdit ? props.project.description : "",
    isPrivate: isEdit ? props.project.isPrivate : false,
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
    // const response = await props.onSubmit(name, description, isPrivate);
    let response;
    if(isEdit)
      response = await props.onSubmit(props.project.id, name, description, isPrivate);
    else
      response = await props.onSubmit(name, description, isPrivate);
    if(response.error && response.error.includes("name"))
      return setState({...state, nameError: response.error});
    else if(response.error && response.error.includes("description"))
      return setState({...state, descriptionError: response.error});
    else if(response.error  && props.showNotification) // Dont think we should ever hit this use-case...unless a token expires mid-session.
      return props.showNotification(response.error, "info", false);
    
    props.onClose();
    if(props.refresh)
      props.refresh();
    
    if(props.showNotification)
      props.showNotification(response.message, "info", true);
  };

  const modalProps = {
    onClose: props.onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitTooltip(),
    header: {
      startIcon: faFolderPlus,
      text: isEdit ? "Edit Project" : "New Project"
    },
    dataTestId: "projectModal"
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
      <TextArea {...inputProps.description} />
      <RadioGroup {...inputProps.isPrivate} />
    </Modal>
  );
};

ProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showNotification: PropTypes.func,
  requestInProgress: PropTypes.bool.isRequired,
  refresh: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPrivate: PropTypes.bool.isRequired
  })
};

export default ProjectModal;
