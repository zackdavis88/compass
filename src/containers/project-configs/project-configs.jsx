import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ProjectConfigsWrapper} from "./project-configs.styles";
import {PageError} from "../../common-styles/base";
import {updateQueryString, generateObjectFromSearch, setTitle, onHeaderClick } from "../../utils";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import {getPriorities, createPriority, deletePriority, updatePriority} from "../../store/actions/priority";
import {getProject} from "../../store/actions/project";
import Tabs from "../../components/tabs/tabs";
import PrioritiesTable from "../../components/priorities-table/priorities-table";
import PageHeader from "../../components/page-header/page-header";
import PriorityModal from "../../components/priority-modal/priority-modal";
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
  const [prioritiesData, setPrioritiesData] = useState(undefined);
  const [showAddPriorityModal, setShowAddPriorityModal] = useState(false);
  const [editPriorityData, setEditPriorityData] = useState({});

  const _loadData = async() => {
    const projectResponse = await props.getProject(projectId);
    const prioritiesResponse = await props.getPriorities(projectId, query.prioritiesPage);

    if(projectResponse && projectResponse.error)
      return setPageError(projectResponse.error);
    if(prioritiesResponse && prioritiesResponse.error)
      return setPageError(prioritiesResponse.error);

    if(query.prioritiesPage && prioritiesResponse && prioritiesResponse.page.toString() !== query.prioritiesPage)
      updateQueryString("prioritiesPage", prioritiesResponse.page);

    setProjectData(projectResponse);
    setPrioritiesData(prioritiesResponse);
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

  const project = projectData && projectData.project;
  const userRoles = projectData && projectData.userRoles || {};
  const priorities = prioritiesData && prioritiesData.priorities;
  const actionsMenuProps = {
    dataTestId: "projectConfigsActionsMenu",
    menuItems: [{
      icon: faPlus,
      label: "Add Priority",
      onClick: () => setShowAddPriorityModal(true)
    }]
  };
  return (
    <ProjectConfigsWrapper>
      {pageError ? (
        <PageError>{pageError}</PageError>
      ) : 
      (!projectData || !prioritiesData) ? (
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
            </Tabs.TabHeaders>
            <Tabs.TabPanels>
              <Tabs.Panel>
                <PrioritiesTable
                  priorities={priorities}
                  userRoles={userRoles}
                  actions={{
                    createPriority: () => setShowAddPriorityModal(true),
                    deletePriority: async(priority) => {
                      await props.deletePriority({...priority, project});
                      _reloadPriorities();
                    },
                    editPriority: (priority) => setEditPriorityData(priority)
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
            </Tabs.TabPanels>
          </Tabs>
        </Fragment>
      )}
      {showAddPriorityModal && (
        <PriorityModal 
          onClose={() => setShowAddPriorityModal(false)}
          onSubmit={props.createPriority}
          requestInProgress={props.priorityIsLoading}
          project={project}
          refresh={_reloadPriorities}
        />
      )}
      {editPriorityData.id && (
        <PriorityModal
          onClose={() => setEditPriorityData({})}
          onSubmit={props.updatePriority}
          requestInProgress={props.priorityIsLoading}
          project={project}
          priority={editPriorityData}
          refresh={_reloadPriorities}
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
  historyPush: PropTypes.func.isRequired
};

export default connect((state) => ({
  priorityIsLoading: state.priority.isLoading
}), {
  getPriorities,
  createPriority,
  deletePriority,
  updatePriority,
  getProject,
  historyPush: push
})(ProjectConfigs);
