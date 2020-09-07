import React, {useState} from "react";
import PropTypes from "prop-types";
import {ProjectConfigModalWrapper, ProjectSection, PreviewSection} from "./project-config-modal.styles";
import Modal from "../modal/modal";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import InputBox from "../input-box/input-box";
import CheckBox from "../check-box/check-box";
import {ProjectConfigLabel} from "../../common-styles/base";

const ProjectConfigModal = (props) => {
  const projectConfig = props.projectConfig;
  const isEdit = !!projectConfig;
  const initialState = {
    name: isEdit ? projectConfig.name : "",
    color: isEdit && projectConfig.color ? projectConfig.color : "#FFFFFF",
    transparent: isEdit ? !!projectConfig.transparent : false,
    nameError: undefined,
    colorError: undefined
  };
  const [state, setState] = useState(initialState);

  // Tracking if any data on the form has changed.
  const hasChanges = JSON.stringify(initialState) !== JSON.stringify(state);

  const _submitDisabled = () => (
    !hasChanges ||
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

      if(!state.name)
        return "missing required fields";
      
      if(!hasChanges)
        return "there are no changes to submit";
    }
  };

  const _onSubmit = async() => {
    const {name, color, transparent} = state;
    let response;
    if(isEdit)
      response = await props.onSubmit(props.project, projectConfig, name, color, transparent);
    else
      response = await props.onSubmit(props.project, name, color, transparent);

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

  const _generateModalHeader = () => {
    let configType = props.configType.toLowerCase();
    configType = configType.charAt(0).toUpperCase() + configType.slice(1);
    return isEdit ? `Edit ${configType}` : `Add ${configType}`;
  };

  const modalProps = {
    onClose: props.onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitTooltip(),
    header: {
      startIcon: isEdit ? faEdit : faPlus,
      text: _generateModalHeader()
    },
    dataTestId: "projectConfigModal",
    small: true,
    confirmBeforeClose: hasChanges
  };

  const inputProps = {
    name: {
      id: "nameInput",
      dataTestId: "nameInput",
      label: "Name",
      placeholder: `Enter a ${props.configType.toLowerCase()} name`,
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
    },
    transparent: {
      id: "transparentInput",
      dataTestId: "transparentInput",
      label: "No Background Color",
      checked: state.transparent,
      onChange: () => {
        setState({...state, transparent: !state.transparent});
      }
    }
  };

  return (
    <ProjectConfigModalWrapper>
      <Modal {...modalProps}>
        <ProjectSection>
          <span>Project:</span>
          <div>{props.project.name}</div>
        </ProjectSection>
        <PreviewSection>
          <span>Preview:</span>
          {state.name ? (
            <ProjectConfigLabel color={state.color} transparent={state.transparent}>{state.name}</ProjectConfigLabel>
          ): "Enter a name for preview"}
        </PreviewSection>
        <InputBox {...inputProps.name} />
        <InputBox {...inputProps.color} />
        <CheckBox {...inputProps.transparent} />
      </Modal>
    </ProjectConfigModalWrapper>
  );
};

ProjectConfigModal.propTypes =  {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showNotification: PropTypes.func,
  requestInProgress: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  projectConfig: PropTypes.object,
  configType: PropTypes.string.isRequired,
  status: PropTypes.object,
  refresh: PropTypes.func
};

export default ProjectConfigModal;
