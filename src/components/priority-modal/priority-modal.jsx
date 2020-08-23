import React, {useState} from "react";
import PropTypes from "prop-types";
import {PriorityModalWrapper, ProjectSection, PreviewSection} from "./priority-modal.styles";
import Modal from "../modal/modal";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import InputBox from "../input-box/input-box";
import {PriorityLabel} from "../../common-styles/base";

const PriorityModal = (props) => {
  const priority = props.priority;
  const isEdit = !!priority;
  const initialState = {
    name: isEdit ? priority.name : "",
    color: isEdit && priority.color ? priority.color : "#FFFFFF",
    nameError: undefined,
    colorError: undefined
  };
  const [state, setState] = useState(initialState);

  // Tracking if any data on the form has changed.
  const hasChanges = () => JSON.stringify(initialState) !== JSON.stringify(state);

  const _submitDisabled = () => (
    !state.name || 
    !!state.nameError ||
    !!state.colorError ||
    props.requestInProgress
  );

  const _submitTooltip = () => {
    if(_submitDisabled()) {
      if(props.requestInProgress)
        return "request in progress";
      
      if(state.nameError || state.colorError)
        return "please fix input errors";
      
      return "missing required fields";
    }
  };

  const _onSubmit = async() => {
    const {name, color} = state;
    let response;
    if(isEdit)
      response = await props.onSubmit(props.project, priority, name, color);
    else
      response = await props.onSubmit(props.project, name, color);

    if(response.error && response.error.includes("name"))
      return setState({...state, nameError: response.error});
    else if(response.error && response.error.includes("color"))
      return setState({...state, colorError: response.error});
    else if(response.error)
      return;

    props.onClose();
    if(props.showNotification)
      props.showNotification(response.message, "info", true);

    if(props.refresh)
      props.refresh();
  };

  const modalProps = {
    onClose: props.onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitTooltip(),
    header: {
      startIcon: isEdit ? faEdit : faPlus,
      text: isEdit ? "Edit Priority" : "Add Priority"
    },
    dataTestId: "priorityModal",
    small: true,
    confirmBeforeClose: hasChanges()
  };

  const inputProps = {
    name: {
      id: "nameInput",
      dataTestId: "nameInput",
      label: "Name",
      placeholder: "Enter a priority name",
      errorText: state.nameError,
      value: state.name,
      maxLength: 26,
      isRequired: true,
      onChange: (value) => setState({...state, name: value, nameError: undefined})
    },
    color: {
      id: "colorInput",
      dataTestId: "colorInput",
      label: "Color",
      type: "color",
      placeholder: "Select a color",
      errorText: state.colorError,
      value: state.color,
      onChange: (value) => setState({...state, color: value, colorError: undefined})
    }
  };

  return (
    <PriorityModalWrapper>
      <Modal {...modalProps}>
        <ProjectSection>
          <span>Project:</span>
          <div>{props.project.name}</div>
        </ProjectSection>
        <PreviewSection>
          <span>Preview:</span>
          {state.name ? (
            <PriorityLabel color={state.color}>{state.name}</PriorityLabel>
          ): "Enter a name for preview"}
        </PreviewSection>
        <InputBox {...inputProps.name} />
        <InputBox {...inputProps.color} />
      </Modal>
    </PriorityModalWrapper>
  );
};

PriorityModal.propTypes =  {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showNotification: PropTypes.func,
  requestInProgress: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  priority: PropTypes.object,
  refresh: PropTypes.func
};

export default PriorityModal;
