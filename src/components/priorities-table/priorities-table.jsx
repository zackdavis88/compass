import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faInfoCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate} from "../../utils";
import {ActionsWrapper, Action, PaginationSection} from "../table/table.styles";
import {PrioritiesTableWrapper} from "./priorities-table.styles";
import Pagination from "../pagination/pagination";
import Button from "../button/button";
import {PriorityLabel} from "../../common-styles/base";

const PrioritiesTable = ({priorities, userRoles, actions, pagination}) => {
  const isEmpty = priorities.length === 0;
  const {isAdmin, isManager} = userRoles || {};
  const actionAllowed = isAdmin || isManager;

  const _renderActions = (row) => {
    const {editPriority, deletePriority} = actions;
    return (
      <ActionsWrapper>
        <Action data-testid="action.deletePriority" highlightAction={actionAllowed} onClick={() => actionAllowed && deletePriority(row)}>
          <FontAwesomeIcon icon={faTrash} fixedWidth />
          <Tooltip text={actionAllowed ? "Delete Priority" : "You can not perform this action"} />
        </Action>
        <Action data-testid="action.editPriority" highlightAction={actionAllowed} onClick={() => actionAllowed && editPriority(row)}>
          <FontAwesomeIcon icon={faEdit} fixedWidth />
          <Tooltip text={actionAllowed ? "Edit Priority" : "You can not perform this action"} />
        </Action>
      </ActionsWrapper>
    );
  };

  const tableProps = {
    dataTestId: "prioritiesTable",
    headers: [{
      label: "Priority",
      keyName: "name",
      format: (name, {color}) => <PriorityLabel color={color}>{name}</PriorityLabel>
    }, {
      label: "Unique ID",
      keyName: "id"
    }, {
      label: "Created On",
      keyName: "createdOn",
      format: (timestamp) => formatDate(timestamp)
    }, {
      label: "Actions",
      renderActions: _renderActions
    }],
    rows: priorities
  };

  const paginationProps = {
    dataTestId: "prioritiesTablePagination",
    itemsPerPage: pagination && pagination.itemsPerPage,
    page: pagination && pagination.page,
    totalPages: pagination && pagination.totalPages,
    onPageClick: (page) => pagination && pagination.getPage(page)
  };

  return (
    <PrioritiesTableWrapper isEmpty={isEmpty}>
      <div id="priorityInfoMessage">
        <FontAwesomeIcon icon={faInfoCircle} fixedWidth />
        Priorities are project specific labels that can be attached to stories.
        {actionAllowed && (
          <Button 
            onClick={actions.createPriority}
            label="Add Priority"
            primary
            small
            startIcon={faPlus}
            dataTestId="addPriorityButton"
          />
        )}
      </div>
      {!isEmpty ? (
        <Fragment>
          <Table {...tableProps} />
          {pagination && pagination.totalPages > 1 && (
            <PaginationSection>
              <Pagination {...paginationProps} />
            </PaginationSection>
          )}
        </Fragment>
      ) : (
        <div>This project currently has no priorities.</div>
      )}
    </PrioritiesTableWrapper>
  );
};

PrioritiesTable.propTypes = {
  priorities: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    editPriority: PropTypes.func.isRequired,
    deletePriority: PropTypes.func.isRequired,
    createPriority: PropTypes.func.isRequired
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  }),
  userRoles: PropTypes.shape({
    isAdmin: PropTypes.bool,
    isManager: PropTypes.bool,
    isDeveloper: PropTypes.bool,
    isViewer: PropTypes.bool
  }).isRequired
};

export default PrioritiesTable;
