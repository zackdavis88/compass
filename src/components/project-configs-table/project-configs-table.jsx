import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Table from "../table/table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";
import {formatDate} from "../../utils";
import {ActionsWrapper, Action, PaginationSection} from "../table/table.styles";
import {ProjectConfigsTableWrapper} from "./project-configs-table.styles";
import Pagination from "../pagination/pagination";
import {ProjectConfigLabel} from "../../common-styles/base";

const ProjectConfigsTable = ({projectConfigs, configType, userRoles, actions, pagination}) => {
  const isEmpty = projectConfigs.length === 0;
  const {isAdmin, isManager} = userRoles || {};
  const actionAllowed = isAdmin || isManager;

  const _generateDefaultMessage = () => {
    if(configType.toLowerCase() === "priority")
      return "This project currently has no priorities."
    
    if(configType.toLowerCase() === "status")
      return "This project currently has no status."
    
    return;
  };
  
  const _generateConfigName = () => {
    let configName = configType.toLowerCase();
    return configName.charAt(0).toUpperCase() + configName.slice(1);
  };
  const configName = _generateConfigName();
  const _generateActionTooltip = (action) => {
    let actionName = action.toLowerCase();
    actionName = actionName.charAt(0).toUpperCase() + actionName.slice(1);
    return actionAllowed ? `${actionName} ${configName}` : "You can not perform this action";
  };

  const _renderActions = (row) => {
    const {editConfig, deleteConfig} = actions;
    return (
      <ActionsWrapper>
        <Action data-testid="action.deleteConfig" highlightAction={actionAllowed} onClick={() => actionAllowed && deleteConfig(row)}>
          <FontAwesomeIcon icon={faTrash} fixedWidth />
          <Tooltip text={_generateActionTooltip("delete")} />
        </Action>
        <Action data-testid="action.editConfig" highlightAction={actionAllowed} onClick={() => actionAllowed && editConfig(row)}>
          <FontAwesomeIcon icon={faEdit} fixedWidth />
          <Tooltip text={_generateActionTooltip("edit")} />
        </Action>
      </ActionsWrapper>
    );
  };

  const tableProps = {
    dataTestId: "projectConfigsTable",
    headers: [{
      label: configName,
      keyName: "name",
      format: (name, {color, transparent}) => <ProjectConfigLabel color={color} transparent={transparent}>{name}</ProjectConfigLabel>
    }, {
      label: "Color",
      keyName: "color",
      format: (color, {transparent}) => {
        if(transparent)
          return <div style={{fontStyle: "italic"}}>Transparent</div>;
        
        if(color)
          return color.toUpperCase();
        
        return <div style={{fontStyle: "italic"}}>None</div>;
      }
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
    rows: projectConfigs
  };

  const paginationProps = {
    dataTestId: "projectConfigsTablePagination",
    itemsPerPage: pagination && pagination.itemsPerPage,
    page: pagination && pagination.page,
    totalPages: pagination && pagination.totalPages,
    onPageClick: (page) => pagination && pagination.getPage(page)
  };

  return (
    <ProjectConfigsTableWrapper isEmpty={isEmpty}>
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
        <div>{_generateDefaultMessage()}</div>
      )}
    </ProjectConfigsTableWrapper>
  );
};

ProjectConfigsTable.propTypes = {
  projectConfigs: PropTypes.array.isRequired,
  configType: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    editConfig: PropTypes.func.isRequired,
    deleteConfig: PropTypes.func.isRequired
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

export default ProjectConfigsTable;
