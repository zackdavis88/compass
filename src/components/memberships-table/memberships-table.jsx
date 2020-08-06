import React from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserTimes, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate, getPermissionLevel} from "../../utils";
import {ActionsWrapper, Action} from "../table/table.styles";
import {MembershipsTableWrapper, PaginationSection} from "./memberships-table.styles";
import Pagination from "../pagination/pagination";

const MembershipsTable = ({memberships, userRoles, actions, pagination}) => {
  const _renderActions = (row) => {//row is a membership object in this Table instance.
    const {deleteMembership, editMembership} = actions;
    // determine logged in user's permission levels
    const adminPermissions = !!userRoles && userRoles.isAdmin;
    const managerPermissions = !!userRoles && (userRoles.isAdmin || userRoles.isManager);

    // determine a member's roles
    const {isAdmin} = row.roles;

    // based on the requesting user's roles and a member's existing roles, we can determine if actions are allowed.
    const actionAllowed = isAdmin ? adminPermissions : (adminPermissions || managerPermissions);
    return (
      <ActionsWrapper>
        <Action data-testid="action.deleteMembership" highlightAction={actionAllowed} onClick={() => actionAllowed && deleteMembership(row)}>
          <FontAwesomeIcon icon={faUserTimes} fixedWidth />
          {actionAllowed && <Tooltip text={"Remove Member"} />}
        </Action>
        <Action data-testid="action.editMembership" highlightAction={actionAllowed} onClick={() => actionAllowed && editMembership(row)}>
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
    rows: memberships
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
      {pagination && (
        <PaginationSection>
          <Pagination {...paginationProps} />
        </PaginationSection>
      )}
    </MembershipsTableWrapper>
  );
};

MembershipsTable.propTypes = {
  memberships: PropTypes.array.isRequired,
  userRoles: PropTypes.shape({
    isAdmin: PropTypes.bool,
    isManager: PropTypes.bool,
    isDeveloper: PropTypes.bool,
    isViewer: PropTypes.bool
  }),
  actions: PropTypes.shape({
    deleteMembership: PropTypes.func.isRequired,
    editMembership: PropTypes.func.isRequired
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  })
};

export default MembershipsTable;
