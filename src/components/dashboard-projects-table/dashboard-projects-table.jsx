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
    const {deleteProject, updateProject, addMember, viewProject} = actions;
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
        <Action data-testid="action.addMember" isAllowed={rowHovered && managerAllowed} onClick={() => managerAllowed && addMember(row, adminAllowed)}>
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
