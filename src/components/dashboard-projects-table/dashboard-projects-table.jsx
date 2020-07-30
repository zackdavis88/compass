import React, {useState} from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faTrash, faEdit, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate, getPermissionLevel} from "../../utils";
import {ActionsWrapper, Action} from "../table/table.styles";

const DashboardProjectsTable = ({projects, actions}) => {
  const [hoverMap, setHover] = useState(projects.reduce((prev, curr) => {
    if(curr.id)
      return Object.assign(prev, {[curr.id]: false});
    
    return prev;
  }, {}));

  const _renderActions = (row) => {
    const {deleteProject, updateProject, viewProject} = actions;
    const {isAdmin, isManager, isDeveloper, isViewer} = row.roles;
    const rowHovered = hoverMap[row.id];
    const adminAllowed = isAdmin;
    const managerAllowed = (isAdmin || isManager);
    const viewerAllowed = (isAdmin || isManager || isDeveloper || isViewer);
    return (
      <ActionsWrapper>
        <Action data-testid="action.deleteProject" isAllowed={rowHovered && adminAllowed} onClick={() => adminAllowed && deleteProject(row)}>
          <FontAwesomeIcon icon={faTrash} fixedWidth />
          {adminAllowed && <Tooltip text={"Delete Project"} />}
        </Action>
        <Action data-testid="action.editProject" isAllowed={rowHovered && managerAllowed} onClick={() => managerAllowed && updateProject(row)}>
          <FontAwesomeIcon icon={faEdit} fixedWidth />
          {managerAllowed && <Tooltip text={"Edit Project"} />}
        </Action>


        {/* TODO: make this action show a new modal that allows users to add a new project member.
            MembershipModal will be reusable modal similiar to ProjectModal. It will let us:
            1. Create new memberships.
            2. Update existing memberships.

            The API requires the following data for adding a new membership (the functionality implemented on dashboard):
            1. user - string of a valid username.
            2. project - string of a valid project id.
            3. roles - object of bool key-values. {isAdmin: BOOLEAN, isManager: BOOLEAN, isDeveloper: BOOLEAN, isViewer: BOOLEAN}

            Ideally, this MembershipModal will probably look like:
            - User select/filter which will have a dropdown list of all available users for membership.
              * typing into the search will cause the dropdown list to filter results based on typed value.
            
            - 4 Checkboxes for each possible role. (isAdmin, isManager, isDeveloper, isViewer)

            - Needs an error section, similar to the Form component which will allow us to show any errors, there are potential validation
              errors with this modal because we are allowing user input for usernames.
              
              Even though there will be a dropdown list of valid usernames, a user could manually type an invalid name.
              Which is gunna cause a problem that should be communicated to the user.
        */}
        <Action data-testid="action.addMember" isAllowed={rowHovered && managerAllowed} onClick={() => {}}>
          <FontAwesomeIcon icon={faUserPlus} fixedWidth />
          {managerAllowed && <Tooltip text={"Add Member"} />}
        </Action>


        <Action data-testid="action.viewProject" isAllowed={rowHovered && viewerAllowed} onClick={() => viewerAllowed && viewProject(row)}>
          <FontAwesomeIcon icon={faArrowRight} fixedWidth />
          {viewerAllowed && <Tooltip text={"View Project"} />}
        </Action>
      </ActionsWrapper>
    );
  };

  const tableProps = {
    dataTestId: "dashboardProjects",
    headers: [{
      label: "Name",
      keyName: "name"
    }, {
      label: "Unique ID",
      keyName: "id"
    }, {
      label: "Visibility",
      keyName: "isPrivate",
      format: (isPrivate) => isPrivate ? "Private" : "Public"
    }, {
      label: "Permission Level",
      keyName: "roles",
      format: (roles) => getPermissionLevel(roles)
    },{
      label: "Created On",
      keyName: "createdOn",
      format: (timestamp) => formatDate(timestamp)
    }, {
      label: "Actions",
      renderActions: _renderActions
    }],
    rows: projects,
    rowProps: (row) => ({
      onMouseOver: () => setHover({...hoverMap, [row.id]: true}),
      onMouseLeave: () => setHover({...hoverMap, [row.id]: false})
    })
  };

  return (
    <Table {...tableProps} />
  );
};

DashboardProjectsTable.propTypes = {
  projects: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    deleteProject: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    viewProject: PropTypes.func.isRequired
  }).isRequired
};

export default DashboardProjectsTable;
