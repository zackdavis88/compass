import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import SelectInput from "../select-input/select-input";
import CheckBox from "../check-box/check-box";
import {MembershipModalWrapper} from "./membership-modal.styles";

const MembershipModal = (props) => {
  const membership = props.membership;
  const isEdit = !!membership;
  const [state, setState] = useState({
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
    },
    availableUsers: isEdit ? [] : undefined
  });

  const _loadData = async() => {
    const response = await props.getAvailableUsers(props.project);
    setState({
      ...state,
      availableUsers: response.users
    });
  };

  useEffect(() => {
    if(!isEdit)
      _loadData();
  }, []);

  const _submitDisabled = () => !state.username || !!state.usernameError || props.requestInProgress;

  const _submitTooltip = () => _submitDisabled() ? props.requestInProgress ? "request in progress" : "missing required fields" : "";

  const _onSubmit = async() => {
    const {username, roles, availableUsers} = state;
    
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
  };

  const modalProps = {
    onClose: props.onClose,
    onSubmit: _onSubmit,
    submitDisabled: _submitDisabled(),
    submitTooltip: _submitTooltip(),
    header: {
      startIcon: faUserPlus,
      text: isEdit ? "Edit Membership" : "New Membership"
    },
    dataTestId: "membershipModal"
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
      items: state.availableUsers,
      isRequired: true,
      errorText: state.usernameError,
      disabled: isEdit
    };
  }

  return (
    <MembershipModalWrapper>
      <Modal {...modalProps}>
        {!state.availableUsers ? (
          <LoadingSpinner alignCenter dataTestId="membershipModalLoader" message="Loading available users" />
        ) : (
          <Fragment>
            {!isEdit ? (
              <SelectInput {...inputProps.username} />
            ) : (
            <div id="existingUsername">Username: <span>{state.username}</span></div>
            )}
            <div id="membershipRolesInput">
              <CheckBox {...inputProps.isAdmin}/>
              <CheckBox {...inputProps.isManager}/>
              <CheckBox {...inputProps.isDeveloper}/>
              <CheckBox {...inputProps.isViewer}/>
            </div>
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
  membership: PropTypes.object
};

export default MembershipModal;
