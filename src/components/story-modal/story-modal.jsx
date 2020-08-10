import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {StoryModalWrapper, ProjectSection} from "./story-modal.styles";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import Modal from "../modal/modal";
import { faBook, faEdit } from "@fortawesome/free-solid-svg-icons";
import InputBox from "../input-box/input-box";
import SelectInput from "../select-input/select-input";
import TextArea from "../text-area/text-area";

const StoryModal = (props) => {
  const story = props.story;
  const isEdit = !!story;
  const [state, setState] = useState({
    name: isEdit ? story.name : "",
    details: isEdit ? story.details : "",
    owner: isEdit && story.owner ? story.owner.displayName : "",
    nameError: undefined,
    detailsError: undefined,
    ownerError: undefined,
    memberNames: undefined
  });

  const _loadData = async() => {
    const response = await props.getMemberNames(props.project);
    setState({
      ...state,
      memberNames: response.users
    });
  };

  useEffect(() => {
    _loadData();
  }, []);

  const _submitDisabled = () => (
    !state.name || 
    !!state.nameError ||
    !!state.detailsError ||
    !!state.ownerError || 
    props.requestInProgress
  );

  const _submitTooltip = () => {
    if(_submitDisabled()) {
      if(props.requestInProgress)
        return "request in progress";
      
      if(state.nameError || state.detailsError || state.ownerError)
        return "please fix input errors";
      
      return "missing required fields";
    }
  };

  const _onSubmit = async() => {
    const {name, details, owner, memberNames} = state;
    
    // Validate owner input matches something valid.
    if(owner && memberNames.indexOf(owner) === -1)
      return setState({...state, ownerError: "username is invalid"});
    
    let response;
    if(isEdit)
      response = await props.onSubmit(props.project, story, name, details, owner);
    else
      response = await props.onSubmit(props.project, name, details, owner);

    if(response.error && response.error.includes("name"))
      return setState({...state, nameError: response.error});
    else if(response.error && response.error.includes("details"))
      return setState({...state, detailsError: response.error});
    else if(response.error && response.error.includes("owner"))
      return setState({...state, ownerError: response.error});

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
      startIcon: isEdit ? faEdit : faBook,
      text: isEdit ? "Edit Story" : "New Story"
    },
    dataTestId: "storyModal"
  };

  const inputProps = {
    name: {
      id: "nameInput",
      dataTestId: "nameInput",
      label: "Name",
      placeholder: "Enter a story name",
      errorText: state.nameError,
      value: state.name,
      isRequired: true,
      onChange: (value) => setState({...state, name: value, nameError: undefined})
    },
    details: {
      id: "detailsInput",
      dataTestId: "detailsInput",
      label: "Details",
      placeholder: "Enter story details",
      errorText: state.detailsError,
      value: state.details,
      onChange: (value) => setState({...state, details: value, detailsError: undefined})
    },
    owner: {
      id: "ownerInput",
      dataTestId: "ownerInput",
      label: "Owner",
      placeholder: "Select an owner",
      focusedPlaceholder: "Start typing to filter options",
      value: state.owner,
      onChange: (value) => setState({...state, owner: value, ownerError: ""}),
      items: state.memberNames,
      errorText: state.ownerError
    }
  };

  return (
    <StoryModalWrapper>
      <Modal {...modalProps}>
        {!state.memberNames ? (
          <LoadingSpinner alignCenter dataTestId="storyModalLoader" message="Loading available members" />
        ) : (
          <Fragment>
            <ProjectSection>
              <span>Project:</span>
              <div>{props.project.name}</div>
            </ProjectSection>
            <InputBox {...inputProps.name} />
            <SelectInput {...inputProps.owner} />
            <TextArea {...inputProps.details} />
          </Fragment>
        )}
      </Modal>
    </StoryModalWrapper>
  );
};

StoryModal.propTypes =  {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showNotification: PropTypes.func,
  requestInProgress: PropTypes.bool.isRequired,
  getMemberNames: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  story: PropTypes.object,
  refresh: PropTypes.func
};

export default StoryModal;
