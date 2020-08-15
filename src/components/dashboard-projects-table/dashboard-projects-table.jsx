import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import {TableValue} from "../table/table.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faTrash, faBook, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate, getPermissionLevel} from "../../utils";
import {ActionsWrapper, Action, PaginationSection} from "../table/table.styles";
import {DashboardProjectsTableWrapper} from "./dashboard-projects-table.styles";
import Pagination from "../pagination/pagination";

const DashboardProjectsTable = ({projects, actions, pagination}) => {
  const isEmpty = projects.length === 0;
  const _renderActions = (row) => {
    const {deleteProject, addStory, addMember, viewProject} = actions;
    const {isAdmin, isManager, isDeveloper, isViewer} = row.roles;
    const adminAllowed = isAdmin;
    const managerAllowed = (isAdmin || isManager);
    const developerAllowed = (isAdmin || isManager || isDeveloper);
    const viewerAllowed = (isAdmin || isManager || isDeveloper || isViewer);
    return (
      <ActionsWrapper>
        <Action data-testid="action.deleteProject" highlightAction={adminAllowed} onClick={() => adminAllowed && deleteProject(row)}>
          <FontAwesomeIcon icon={faTrash} fixedWidth />
          {adminAllowed && <Tooltip text={"Delete Project"} />}
        </Action>
        <Action data-testid="action.addMember" highlightAction={managerAllowed} onClick={() => managerAllowed && addMember(row, adminAllowed)}>
          <FontAwesomeIcon icon={faUserPlus} fixedWidth />
          {managerAllowed && <Tooltip text={"Add Member"} />}
        </Action>
        <Action data-testid="action.addStory" highlightAction={developerAllowed} onClick={() => developerAllowed && addStory(row)}>
          <FontAwesomeIcon icon={faBook} fixedWidth />
          {developerAllowed && <Tooltip text={"Add Story"} />}
        </Action>
        <Action data-testid="action.viewProject" highlightAction={viewerAllowed} onClick={() => viewerAllowed && viewProject(row)}>
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
      keyName: "name",
      format: (name) => (
        <TableValue truncated maxWidth="250px">{name}</TableValue>
      )
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
    rows: projects
  };

  const paginationProps = {
    dataTestId: "dashboardProjectsPagination",
    itemsPerPage: pagination && pagination.itemsPerPage,
    page: pagination && pagination.page,
    totalPages: pagination && pagination.totalPages,
    onPageClick: (page) => pagination && pagination.getPage(page)
  };

  return (
    <DashboardProjectsTableWrapper isEmpty={isEmpty}>
      {!isEmpty ? (
        <Fragment>
          <Table {...tableProps} />
          {pagination && (
            <PaginationSection>
              <Pagination {...paginationProps} />
            </PaginationSection>
          )}
        </Fragment>
      ) : (
        <div>There are no projects to display</div>
      )}
    </DashboardProjectsTableWrapper>
  );
};

DashboardProjectsTable.propTypes = {
  projects: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    deleteProject: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired,
    addStory: PropTypes.func.isRequired,
    viewProject: PropTypes.func.isRequired
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  })
};

export default DashboardProjectsTable;
