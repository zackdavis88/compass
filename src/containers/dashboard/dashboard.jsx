import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper, DashboardActionButtons} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {showNotification} from "../../store/actions/notification";
import {getDashboard} from "../../store/actions/dashboard";
import {createProject, updateProject, deleteProject} from "../../store/actions/project";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import Button from "../../components/button/button";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProjectModal from "../../components/project-modal/project-modal";
import ProjectsTable from "../../components/dashboard-projects-table/dashboard-projects-table";
import DeleteModal from "../../components/delete-modal/delete-modal";
import {push} from "connected-react-router";

const Dashboard = (props) => {
  const {
    getDashboard,
    isLoading,
    userInfo,
    showNotification,
    projectRequestInProgress,
    createProject,
    updateProject,
    deleteProject,
    projects,
    historyPush
  } = props;
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [editProjectData, setEditProject] = useState({});
  const [deleteProjectData, setDeleteProject] = useState({});

  useEffect(() => {
    getDashboard();
  }, []);

  const projectsTableProps = {
    projects,
    actions: {
      deleteProject: (project) => setDeleteProject(project),
      updateProject: (project) => setEditProject(project),
      viewProject: (project) => historyPush(`/projects/${project.id}`)
    }
  };

  return (
    <DashboardWrapper>
      {isLoading ? (
        <LoadingSpinner alignCenter dataTestId="dashboardLoader" message={`Loading Dashboard for ${userInfo.displayName}`}/>
      ) : (
        <Fragment>
          <DashboardActionButtons>
            <Button
              small
              secondary
              label="New Project"
              startIcon={faPlus}
              dataTestId="dashboardNewProject"
              onClick={() => setShowNewProjectModal(true)}
            />
            <Button
              small
              secondary
              label="New Story"
              startIcon={faPlus}
              dataTestId="dashboardNewStory"
              onClick={() => {}}
            />
          </DashboardActionButtons>
          <Tabs dataTestId="dashboardTabs">
            <Tabs.TabHeaders>
              <Tabs.Header>My Projects</Tabs.Header>
              <Tabs.Header>My Stories</Tabs.Header>
            </Tabs.TabHeaders>
            <Tabs.TabPanels>
              <Tabs.Panel>
                {projects.length ? (
                  <ProjectsTable {...projectsTableProps} />
                ) : (
                  <div>You are not a member of any projects</div>
                )
                }
              </Tabs.Panel>
              <Tabs.Panel>
                This is some srs content.
              </Tabs.Panel>
            </Tabs.TabPanels>
          </Tabs>
          {/* Just modals down here, nothing to see. */}
          {showNewProjectModal && (
            <ProjectModal 
              onClose={() => setShowNewProjectModal(false)}
              onSubmit={createProject}
              showNotification={showNotification}
              requestInProgress={projectRequestInProgress}
              refreshDashboard={getDashboard}
            />
          )}
          {editProjectData.id && (
            <ProjectModal
              onClose={() => setEditProject({})}
              onSubmit={updateProject}
              requestInProgress={projectRequestInProgress}
              refreshDashboard={getDashboard}
              project={editProjectData}
            />
          )}
          {deleteProjectData.id && (
            <DeleteModal
              onClose={() => setDeleteProject({})}
              onSubmit={deleteProject}
              dataTestId="projectDeleteModal"
              headerText="Delete Project"
              bodyText={`All memberships and stories belonging to this project will be
              deleted as well. Please proceed with caution.`}
              resource={deleteProjectData}
              expectedInput={deleteProjectData.name}
              inputProps={{
                label: "Project Name",
                placeholder: "Enter the project's name"
              }}
              refreshDashboard={getDashboard}
            />
          )}
        </Fragment>
      )}
    </DashboardWrapper>
  );
};

Dashboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  stories: PropTypes.array.isRequired,
  getDashboard: PropTypes.func.isRequired,
  projectRequestInProgress: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired
};

export default connect((state) => ({
  isLoading: state.dashboard.isLoading,
  projects: state.dashboard.projects,
  stories: state.dashboard.stories,
  userInfo: state.auth.user,
  projectRequestInProgress: state.project.isLoading
}), {
  getDashboard,
  showNotification,
  createProject,
  updateProject,
  deleteProject,
  historyPush: push
})(Dashboard);
