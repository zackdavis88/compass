import React, {useState} from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserTimes, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate, getPermissionLevel} from "../../utils";
import {ActionsWrapper, Action} from "../table/table.styles";
import {MembershipsTableWrapper} from "./memberships-table.styles";
import Pagination from "../pagination/pagination";

const MembershipsTable = ({memberships, userRoles, actions, pagination}) => {
  const [hoverMap, setHover] = useState(memberships.reduce((prev, curr) => {
    if(curr.id)
      return Object.assign(prev, {[curr.id]: false});
    
    return prev;
  }, {}));

  const _renderActions = (row) => {//row is a membership object in this Table instance.
    const {deleteMembership, editMembership} = actions;
    // determine logged in user's permission levels
    const adminPermissions = !!userRoles && userRoles.isAdmin;
    const managerPermissions = !!userRoles && (userRoles.isAdmin || userRoles.isManager);

    // determine a member's roles
    const {isAdmin} = row.roles;

    // based on the requesting user's roles and a member's existing roles, we can determine if actions are allowed.
    const actionAllowed = isAdmin ? adminPermissions : (adminPermissions || managerPermissions);
    const rowHovered = hoverMap[row.id];
    return (
      <ActionsWrapper>
        <Action data-testid="action.deleteMembership" highlightAction={rowHovered && actionAllowed} onClick={() => actionAllowed && deleteMembership(row)}>
          <FontAwesomeIcon icon={faUserTimes} fixedWidth />
          {actionAllowed && <Tooltip text={"Remove Member"} />}
        </Action>
        <Action data-testid="action.editMembership" highlightAction={rowHovered && actionAllowed} onClick={() => actionAllowed && editMembership(row)}>
          <FontAwesomeIcon icon={faUserEdit} fixedWidth />
          {actionAllowed && <Tooltip text={"Edit Roles"} />}
        </Action>
      </ActionsWrapper>
    );
  };

  const tableProps = {
    dataTestId: "projectMemberships",
    headers: [{
      label: "User",
      keyName: "user",
      format: (user) => user.displayName
    }, {
      label: "Unique ID",
      keyName: "id"
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
    rows: memberships,
    rowProps: (row) => ({
      onMouseOver: () => setHover({...hoverMap, [row.id]: true}),
      onMouseLeave: () => setHover({...hoverMap, [row.id]: false})
    })
  };

  const paginationProps = {
    dataTestId: "projectMembershipsPagination",
    itemsPerPage: pagination.itemsPerPage,
    page: pagination.page,
    totalPages: pagination.totalPages,
    onPageClick: (page) => pagination.getPage(page)
  };

  return (
    <MembershipsTableWrapper>
      <Table {...tableProps} />
      {pagination && <Pagination {...paginationProps} />}
    </MembershipsTableWrapper>
  );
};

MembershipsTable.propTypes = {
  memberships: PropTypes.array.isRequired,
  userRoles: PropTypes.object,
  actions: PropTypes.shape({
    deleteMembership: PropTypes.func.isRequired
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  })
};

export default MembershipsTable;
