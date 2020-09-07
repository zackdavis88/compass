import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {StoryModalWrapper, ProjectSection} from "./story-modal.styles";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import Modal from "../modal/modal";
import { faBook, faEdit } from "@fortawesome/free-solid-svg-icons";
import InputBox from "../input-box/input-box";
import SelectInput from "../select-input/select-input";
import TextArea from "../text-area/text-area";
import SelectBox from "../select-box/select-box";

const StoryModal = (props) => {
  const story = props.story;
  const isEdit = !!story;
  const initialState = {
    name: isEdit ? story.name : "",
    details: isEdit && story.details ? story.details : "",
    owner: isEdit && story.owner ? story.owner.displayName : "",
    priority: isEdit && story.priority ? story.priority.name : "",
    status: isEdit && story.status ? story.status.name : "",
    points: isEdit && story.points ? String(story.points) : "",
    nameError: undefined,
    detailsError: undefined,
    ownerError: undefined,
    pointsError: undefined
  };
  const [state, setState] = useState(initialState);
  const [memberNames, setMemberNames] = useState(undefined);
  const [priorityNames, setPriorityNames] = useState(undefined);
  const [statusNames, setStatusNames] = useState(undefined);

  // Tracking if any data on the form has changed.
  const hasChanges = JSON.stringify(initialState) !== JSON.stringify(state);

  const _loadData = async() => {
    const memberNamesResponse = await props.getMemberNames(props.project);
    const priorityNamesResponse = await props.getPriorityNames(props.project);
    const statusNamesResponse = await props.getStatusNames(props.project);

    setMemberNames(memberNamesResponse.users);
    setPriorityNames(priorityNamesResponse.priorities);
    setStatusNames(statusNamesResponse.status);
  };

  useEffect(() => {
    _loadData();
  }, []);

  const _submitDisabled = () => (
    !hasChanges ||
    !state.name ||
    !!state.nameError ||
    !!state.detailsError ||
    !!state.ownerError ||
    !!state.pointsError ||
    props.requestInProgress
  );

  const _submitTooltip = () => {
    if(_submitDisabled()) {
      if(props.requestInProgress)
        return "request in progress";
      
      if(state.nameError || state.detailsError || state.ownerError || state.pointsError)
        return "please fix input errors";

      if(!state.name)
        return "missing required fields";
      
      if(!hasChanges)
        return "there are no changes to submit";
    }
  };

  const _onSubmit = async() => {
    const {name, details, owner, priority, points, status} = state;
    let response;
    if(isEdit)
      response = await props.onSubmit(props.project, story, name, details, owner, priority, points, status);
    else
      response = await props.onSubmit(props.project, name, details, owner, priority, points, status);

    if(response.error && response.error.includes("name"))
      return setState({...state, nameError: response.error});
    else if(response.error && response.error.includes("details"))
      return setState({...state, detailsError: response.error});
    else if(response.error && response.error.includes("owner"))
      return setState({...state, ownerError: response.error});
    else if(response.error && response.error.includes("points"))
      return setState({...state, pointsError: response.error});

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
    dataTestId: "storyModal",
    confirmBeforeClose: hasChanges
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
      helperText: `Characters Remaining: ${4000 - state.details.length}`,
      value: state.details,
      onChange: (value) => setState({...state, details: value, detailsError: undefined}),
      maxLength: 2000
    },
    owner: {
      id: "ownerInput",
      dataTestId: "ownerInput",
      label: "Owner",
      placeholder: "Select an owner",
      focusedPlaceholder: "Start typing to filter options",
      value: state.owner,
      onChange: (value) => setState({...state, owner: value, ownerError: undefined}),
      items: memberNames,
      errorText: state.ownerError
    },
    points: {
      id: "pointsInput",
      dataTestId: "pointsInput",
      type: "number",
      numMin: "0",
      numMax: "100",
      label: "Points",
      placeholder: "0-100",
      value: state.points,
      integerRequired: true,
      errorText: state.pointsError,
      onChange: (value) => setState({...state, points: value, pointsError: undefined})
    },
    priority: {
      dataTestId: "priorityInput",
      label: "Priority",
      placeholder: "Select a priority",
      selectedValue: state.priority,
      options: priorityNames,
      onChange: (value) => setState({...state, priority: value}),
      clearValue: () => setState({...state, priority: ""})
    },
    status: {
      dataTestId: "statusInput",
      label: "Status",
      placeholder: "Select a status",
      selectedValue: state.status,
      options: statusNames,
      onChange: (value) => setState({...state, status: value}),
      clearValue: () => setState({...state, status: ""})
    }
  };

  return (
    <StoryModalWrapper>
      <Modal {...modalProps}>
        {!memberNames || !priorityNames || !statusNames ? (
          <LoadingSpinner alignCenter dataTestId="storyModalLoader" message="Loading available story options" />
        ) : (
          <Fragment>
            <ProjectSection>
              <span>Project:</span>
              <div>{props.project.name}</div>
            </ProjectSection>
            <InputBox {...inputProps.name} />
            <InputBox {...inputProps.points} />
            <SelectInput {...inputProps.owner} />
            {priorityNames && priorityNames.length !== 0 && (
              <SelectBox {...inputProps.priority}/>
            )}
            {statusNames && statusNames.length !== 0 && (
              <SelectBox {...inputProps.status} />
            )}
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
  getPriorityNames: PropTypes.func.isRequired,
  getStatusNames: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  story: PropTypes.object,
  refresh: PropTypes.func
};

export default StoryModal;
