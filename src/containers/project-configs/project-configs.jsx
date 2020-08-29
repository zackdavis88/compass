import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ProjectConfigsWrapper} from "./project-configs.styles";
import {PageError} from "../../common-styles/base";
import {updateQueryString, generateObjectFromSearch, setTitle, onHeaderClick } from "../../utils";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import {getPriorities, createPriority, deletePriority, updatePriority} from "../../store/actions/priority";
import {getAllStatus, createStatus, deleteStatus, updateStatus} from "../../store/actions/status";
import {getProject} from "../../store/actions/project";
import Tabs from "../../components/tabs/tabs";
import PageHeader from "../../components/page-header/page-header";
import ProjectConfigsTable from "../../components/project-configs-table/project-configs-table";
import ProjectConfigModal from "../../components/project-config-modal/project-config-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import ActionsMenu from "../../components/actions-menu/actions-menu";
import Button from "../../components/button/button";
import {push} from "connected-react-router";

const ProjectConfigs = (props) => {
  setTitle("Project Configs");
  const query = generateObjectFromSearch(props.location.search);
  const projectId = props.match.params.projectId;
  const [pageError, setPageError] = useState(undefined);
  const [projectData, setProjectData] = useState(undefined);
  // Priority related state data.
  const [prioritiesData, setPrioritiesData] = useState(undefined);
  const [showAddPriorityModal, setShowAddPriorityModal] = useState(false);
  const [editPriorityData, setEditPriorityData] = useState({});
  // Status related state data.
  const [statusData, setStatusData] = useState(undefined);
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [editStatusData, setEditStatusData] = useState({});

  const _loadData = async() => {
    const projectResponse = await props.getProject(projectId);
    const prioritiesResponse = await props.getPriorities(projectId, query.prioritiesPage);
    const statusResponse = await props.getAllStatus(projectId, query.statusPage);

    if(projectResponse && projectResponse.error)
      return setPageError(projectResponse.error);
    if(prioritiesResponse && prioritiesResponse.error)
      return setPageError(prioritiesResponse.error);
    if(statusResponse && statusResponse.error)
      return setPageError(statusResponse.error);

    if(query.prioritiesPage && prioritiesResponse && prioritiesResponse.page.toString() !== query.prioritiesPage)
      updateQueryString("prioritiesPage", prioritiesResponse.page);

    if(query.statusPage && statusResponse && statusResponse.page.toString() !== query.statusPage)
      updateQueryString("statusPage", statusResponse.page);

    setProjectData(projectResponse);
    setPrioritiesData(prioritiesResponse);
    setStatusData(statusResponse);
  };

  useEffect(() => {
    _loadData();
  }, []);

  const _reloadPriorities = async() => {
    const {itemsPerPage, page} = prioritiesData;
    const response = await props.getPriorities(projectId, page, itemsPerPage);
    if(response && response.error)
      return setPageError(response.error);
    
    setPrioritiesData(response);
  };

  const _reloadStatus = async() => {
    const {itemsPerPage, page} = statusData;
    const response = await props.getAllStatus(projectId, page, itemsPerPage);
    if(response && response.error)
      return setPageError(response.error);
    
    setStatusData(response);
  };

  const project = projectData && projectData.project;
  const userRoles = projectData && projectData.userRoles || {};
  const priorities = prioritiesData && prioritiesData.priorities;
  const allStatus = statusData && statusData.status;
  const actionsMenuProps = {
    dataTestId: "projectConfigsActionsMenu",
    menuItems: [{
      icon: faPlus,
      label: "Add Priority",
      onClick: () => setShowAddPriorityModal(true)
    }, {
      icon: faPlus,
      label: "Add Status",
      onClick: () => setShowAddStatusModal(true)
    }]
  };
  return (
    <ProjectConfigsWrapper>
      {pageError ? (
        <PageError>{pageError}</PageError>
      ) : 
      (!projectData || !prioritiesData || !statusData) ? (
        <LoadingSpinner alignCenter dataTestId="projectConfigsLoader" message={`Loading project configs`} />
      ) : (
        <Fragment>
          <PageHeader text={`Configs - ${project.name}`} dataTestId="projectConfigsHeader" textCenter/>
          <div id="configsInfoMessage">
            <FontAwesomeIcon icon={faInfoCircle} fixedWidth />
            Configs are project specific values that can be associated with stories.
            <Button 
              primary
              small
              label="View Project Details"
              onClick={() => props.historyPush(`/projects/${project.id}`)}
              dataTestId="projectDetailsButton"
            />
          </div>
          {userRoles && (userRoles.isAdmin || userRoles.isManager) && (
            <ActionsMenu {...actionsMenuProps} />
          )}
          <Tabs dataTestId="projectConfigsTabs" tabOverride={query.activeTab} onHeaderClick={onHeaderClick}>
            <Tabs.TabHeaders>
              <Tabs.Header>Priorities</Tabs.Header>
              <Tabs.Header>Status</Tabs.Header>
            </Tabs.TabHeaders>
            <Tabs.TabPanels>
              <Tabs.Panel>
                <ProjectConfigsTable
                  projectConfigs={priorities}
                  configType="priority"
                  userRoles={userRoles}
                  actions={{
                    deleteConfig: async(priority) => {
                      await props.deletePriority({...priority, project});
                      _reloadPriorities();
                    },
                    editConfig: (priority) => setEditPriorityData(priority)
                  }}
                  pagination={{
                    itemsPerPage: prioritiesData && prioritiesData.itemsPerPage,
                    page: prioritiesData && prioritiesData.page,
                    totalPages: prioritiesData && prioritiesData.totalPages,
                    getPage: async(page) => {
                      if(page === prioritiesData.page)
                        return;
                      updateQueryString("prioritiesPage", page);
                      const response = await props.getPriorities(projectId, page, prioritiesData.itemsPerPage);
                      if(response.error)
                        return setPageError(response.error);
                      
                      setPrioritiesData(response);
                    }
                  }}
                />
              </Tabs.Panel>
              <Tabs.Panel>
                <ProjectConfigsTable
                  projectConfigs={allStatus}
                  configType="status"
                  userRoles={userRoles}
                  actions={{
                    deleteConfig: async(status) => {
                      await props.deleteStatus({...status, project});
                      _reloadStatus();
                    },
                    editConfig: (status) => setEditStatusData(status)
                  }}
                  pagination={{
                    itemsPerPage: statusData && statusData.itemsPerPage,
                    page: statusData && statusData.page,
                    totalPages: statusData && statusData.totalPages,
                    getPage: async(page) => {
                      if(page === statusData.page)
                        return;
                      updateQueryString("statusPage", page);
                      const response = await props.getAllStatus(projectId, page, statusData.itemsPerPage);
                      if(response.error)
                        return setPageError(response.error);
                      
                      setStatusData(response);
                    }
                  }}
                />
              </Tabs.Panel>
            </Tabs.TabPanels>
          </Tabs>
        </Fragment>
      )}
      {showAddPriorityModal && (
        <ProjectConfigModal 
          onClose={() => setShowAddPriorityModal(false)}
          onSubmit={props.createPriority}
          requestInProgress={props.priorityIsLoading}
          project={project}
          refresh={_reloadPriorities}
          configType="priority"
        />
      )}
      {showAddStatusModal && (
        <ProjectConfigModal 
          onClose={() => setShowAddStatusModal(false)}
          onSubmit={props.createStatus}
          requestInProgress={props.statusIsLoading}
          project={project}
          refresh={_reloadStatus}
          configType="status"
        />
      )}
      {editPriorityData.id && (
        <ProjectConfigModal
          onClose={() => setEditPriorityData({})}
          onSubmit={props.updatePriority}
          requestInProgress={props.priorityIsLoading}
          project={project}
          projectConfig={editPriorityData}
          refresh={_reloadPriorities}
          configType="priority"
        />
      )}
      {editStatusData.id && (
        <ProjectConfigModal
          onClose={() => setEditStatusData({})}
          onSubmit={props.updateStatus}
          requestInProgress={props.statusIsLoading}
          project={project}
          projectConfig={editStatusData}
          refresh={_reloadStatus}
          configType="status"
        />
      )}
    </ProjectConfigsWrapper>
  );
};

ProjectConfigs.propTypes = {
  getPriorities: PropTypes.func.isRequired,
  createPriority: PropTypes.func.isRequired,
  deletePriority: PropTypes.func.isRequired,
  updatePriority: PropTypes.func.isRequired,
  priorityIsLoading: PropTypes.bool.isRequired,
  getProject: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  getAllStatus: PropTypes.func.isRequired,
  createStatus: PropTypes.func.isRequired,
  deleteStatus: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired
};

export default connect((state) => ({
  priorityIsLoading: state.priority.isLoading,
  statusIsLoading: state.status.isLoading
}), {
  getPriorities,
  createPriority,
  deletePriority,
  updatePriority,
  getProject,
  historyPush: push,
  getAllStatus,
  createStatus,
  deleteStatus,
  updateStatus
})(ProjectConfigs);
