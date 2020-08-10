import React from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import {TableValue} from "../table/table.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate} from "../../utils";
import {ActionsWrapper, Action, PaginationSection} from "../table/table.styles";
import {StoriesTableWrapper} from "./stories-table.styles";
import Pagination from "../pagination/pagination";

const StoriesTable = ({stories, project, actions, pagination}) => {
  const _renderActions = (row) => {
    const {editStory, deleteStory, viewStory} = actions;
    const userRoles = project ? (project.userRoles || {}) : {};
    const {isAdmin, isManager, isDeveloper} = userRoles;
    const actionAllowed = isAdmin || isManager || isDeveloper;
    return (
      <ActionsWrapper>
        {deleteStory && actionAllowed && (
          <Action data-testid="action.deleteStory" highlightAction={actionAllowed} onClick={() => deleteStory(row)}>
            <FontAwesomeIcon icon={faTrash} fixedWidth />
            {actionAllowed && <Tooltip text={"Delete Story"} />}
          </Action>
        )}
        {editStory && actionAllowed && (
          <Action data-testid="action.editStory" highlightAction={actionAllowed} onClick={() => editStory(row)}>
            <FontAwesomeIcon icon={faEdit} fixedWidth />
            {actionAllowed && <Tooltip text={"Edit Story"} />}
          </Action>
        )}
        <Action data-testid="action.viewStory" highlightAction={true} onClick={() => viewStory(row)}>
          <FontAwesomeIcon icon={faArrowRight} fixedWidth />
          <Tooltip text={"View Story"} />
        </Action>
      </ActionsWrapper>
    );
  };

  const tableProps = {
    dataTestId: "storiesTable",
    headers: [{
      label: "Name",
      keyName: "name",
      format: (name) => <TableValue truncated maxWidth="250px">{name}</TableValue>
    }, {
      label: "Project",
      keyName: "project",
      format: (project) => project.name
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

  const paginationProps = {
    dataTestId: "storiesTablePagination",
    itemsPerPage: pagination && pagination.itemsPerPage,
    page: pagination && pagination.page,
    totalPages: pagination && pagination.totalPages,
    onPageClick: (page) => pagination && pagination.getPage(page)
  };

  return (
    <StoriesTableWrapper>
      <Table {...tableProps} />
      {pagination && (
        <PaginationSection>
          <Pagination {...paginationProps} />
        </PaginationSection>
      )}
    </StoriesTableWrapper>
  );
};

StoriesTable.propTypes = {
  stories: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    viewStory: PropTypes.func.isRequired,
    editStory: PropTypes.func,
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
