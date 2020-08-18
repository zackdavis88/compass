import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { faUserPlus, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import SelectInput from "../select-input/select-input";
import CheckBox from "../check-box/check-box";
import {
  MembershipModalWrapper,
  ExistingMemberSection,
  ProjectSection,
  RolesInputSection
} from "./membership-modal.styles";

const MembershipModal = (props) => {
  const membership = props.membership;
  const isEdit = !!membership;
  const initialState = {
    username: isEdit ? membership.user.displayName : "",
    usernameError: "",
    roles: isEdit ? {
      isAdmin: membership.roles.isAdmin || undefined,
      isManager: membership.roles.isManager || undefined,
      isDeveloper: membership.roles.isDeveloper || undefined,
      isViewer: membership.roles.isViewer || undefined,
    } : {
      isAdmin: false,
      isManager: false,
      isDeveloper: false,
      isViewer: true
    }
  };
  const [state, setState] = useState(initialState);
  const [availableUsers, setAvailableUsers] = useState(isEdit ? [] : undefined);

  const hasChanges = () => JSON.stringify(initialState) !== JSON.stringify(state);

  const _loadData = async() => {
    const response = await props.getAvailableUsers(props.project);
    setAvailableUsers(response.users);
  };

  useEffect(() => {
    if(!isEdit)
      _loadData();
  }, []);

  const _submitDisabled = () => !state.username || !!state.usernameError || props.requestInProgress;

  const _submitTooltip = () => _submitDisabled() ? props.requestInProgress ? "request in progress" : "missing required fields" : "";

  const _onSubmit = async() => {
    const {username, roles} = state;
    
    // Validate username input matches something available, only validate for new memberships.
    if(!isEdit && availableUsers.indexOf(username) === -1)
      return setState({...state, usernameError: "username is invalid"});
    
    let response;
    if(isEdit)
      response = await props.onSubmit(props.project, membership, roles);
    else
      response = await props.onSubmit(props.project, username, roles);

    if(response.error)
      return setState({...state, usernameError: response.error});

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
      startIcon: isEdit ? faUserEdit : faUserPlus,
      text: isEdit ? "Edit Roles" : "New Membership"
    },
    dataTestId: "membershipModal",
    small: true,
    confirmBeforeClose: hasChanges()
  };

  const inputProps = {
    isAdmin: {
      id: "membershipIsAdminInput",
      dataTestId: "membershipIsAdminInput",
      disabled: !props.adminAllowed,
      label: "Admin",
      checked: state.roles.isAdmin,
      onChange: () => setState({...state, roles: {...state.roles, isAdmin: !state.roles.isAdmin}})
    },
    isManager: {
      id: "membershipIsManagerInput",
      dataTestId: "membershipIsManagerInput",
      label: "Manager",
      checked: state.roles.isManager,
      onChange: () => setState({...state, roles: {...state.roles, isManager: !state.roles.isManager}})
    },
    isDeveloper: {
      id: "membershipIsDeveloperInput",
      dataTestId: "membershipIsDeveloperInput",
      label: "Developer",
      checked: state.roles.isDeveloper,
      onChange: () => setState({...state, roles: {...state.roles, isDeveloper: !state.roles.isDeveloper}})
    },
    isViewer: {
      id: "membershipIsViewerInput",
      dataTestId: "membershipIsViewerInput",
      label: "Viewer",
      checked: state.roles.isViewer,
      onChange: () => setState({...state, roles: {...state.roles, isViewer: !state.roles.isViewer}})
    }
  };

  if(!isEdit) {
    inputProps.username = {
      id: "membershipUsernameInput",
      dataTestId: "membershipUsernameInput",
      label: "Username",
      placeholder: "Select a username",
      focusedPlaceholder: "Start typing to filter options",
      value: state.username,
      onChange: (value) => setState({...state, username: value, usernameError: ""}),
      items: availableUsers,
      isRequired: true,
      errorText: state.usernameError,
      disabled: isEdit
    };
  }

  return (
    <MembershipModalWrapper>
      <Modal {...modalProps}>
        {!availableUsers ? (
          <LoadingSpinner alignCenter dataTestId="membershipModalLoader" message="Loading available users" />
        ) : (
          <Fragment>
            <ProjectSection>
              <span>Project:</span>
              <div>{props.project.name}</div>
            </ProjectSection>
            {!isEdit ? (
              <SelectInput {...inputProps.username} />
            ) : (
              <ExistingMemberSection>
                <span>Username:</span>
                <div>{state.username}</div>
              </ExistingMemberSection>
            )}
            <RolesInputSection>    
              <CheckBox {...inputProps.isAdmin}/>          
              <CheckBox {...inputProps.isManager}/>          
              <CheckBox {...inputProps.isDeveloper}/>          
              <CheckBox {...inputProps.isViewer}/>      
            </RolesInputSection>
          </Fragment>
        )}
      </Modal>
    </MembershipModalWrapper>
  );
};

MembershipModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  showNotification: PropTypes.func,
  requestInProgress: PropTypes.bool.isRequired,
  getAvailableUsers: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  adminAllowed: PropTypes.bool.isRequired,
  membership: PropTypes.object,
  refresh: PropTypes.func
};

export default MembershipModal;
