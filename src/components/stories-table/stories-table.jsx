import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import {TableValue} from "../table/table.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate} from "../../utils";
import {ActionsWrapper, Action, LinkAction, PaginationSection} from "../table/table.styles";
import {StoriesTableWrapper} from "./stories-table.styles";
import Pagination from "../pagination/pagination";

const StoriesTable = ({stories, project, actions, pagination}) => {
  const isEmpty = stories.length === 0;
  const _renderActions = (row) => {
    const {deleteStory, viewStory} = actions;
    const userRoles = project ? (project.userRoles || {}) : {};
    const {isAdmin, isManager, isDeveloper} = userRoles;
    const actionAllowed = isAdmin || isManager || isDeveloper;
    return (
      <ActionsWrapper>
        {deleteStory && (
          <Action data-testid="action.deleteStory" highlightAction={actionAllowed} onClick={() => actionAllowed && deleteStory(row)}>
            <FontAwesomeIcon icon={faTrash} fixedWidth />
            {actionAllowed && <Tooltip text={"Delete Story"} />}
          </Action>
        )}
        <LinkAction 
        data-testid="action.viewStory" 
        highlightAction={true}
        href={`/projects/${row.project.id}/stories/${row.id}`}
        onClick={(e) => {e.preventDefault(); viewStory(row)}}>
          <FontAwesomeIcon icon={faArrowRight} fixedWidth />
          <Tooltip text={"View Story"} />
        </LinkAction>
      </ActionsWrapper>
    );
  };

  const tableProps = {
    dataTestId: "storiesTable",
    headers: [{
      label: "Name",
      keyName: "name",
      format: (name) => <TableValue truncated maxWidth={project ? "350px" : "250px"}>{name}</TableValue>
    }, {
      label: "Project",
      keyName: "project",
      format: (project) => <TableValue truncated maxWidth="250px">{project.name}</TableValue>
    }, {
      label: "Owner",
      keyName: "owner",
      format: (owner) => {
        if(owner)
          return <TableValue truncated maxWidth="250px">{owner.displayName}</TableValue>;
        
        return <div style={{fontStyle: "italic"}}>Not Assigned</div>
      }
    }, {
      label: "Creator",
      keyName: "creator",
      format: (creator) => <TableValue truncated maxWidth="250px">{creator.displayName}</TableValue>
    }, {
      label: "Created On",
      keyName: "createdOn",
      format: (timestamp) => formatDate(timestamp)
    }, {
      label: "Actions",
      renderActions: _renderActions
    }],
    rows: !project ? stories : stories.map(story => ({
      ...story,
      project: project
    }))
  };

  // If we have props.project present...lets remove Project data from the table and increase name size.
  if(project)
    tableProps.headers.splice(1, 1);

  const paginationProps = {
    dataTestId: "storiesTablePagination",
    itemsPerPage: pagination && pagination.itemsPerPage,
    page: pagination && pagination.page,
    totalPages: pagination && pagination.totalPages,
    onPageClick: (page) => pagination && pagination.getPage(page)
  };

  return (
    <StoriesTableWrapper isEmpty={isEmpty}>
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
        <div>There are no stories to display</div>
      )}
    </StoriesTableWrapper>
  );
};

StoriesTable.propTypes = {
  stories: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    viewStory: PropTypes.func.isRequired,
    deleteStory: PropTypes.func
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  }),
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userRoles: PropTypes.object
  })
};

export default StoriesTable;
