import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {showNotification} from "../../store/actions/notification";
import {getDashboard} from "../../store/actions/dashboard";
import {createProject, deleteProject} from "../../store/actions/project";
import {createStory} from "../../store/actions/story";
import {getAvailableUsers, createMembership, getMemberNames} from "../../store/actions/membership";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProjectModal from "../../components/project-modal/project-modal";
import ProjectsTable from "../../components/dashboard-projects-table/dashboard-projects-table";
import DeleteModal from "../../components/delete-modal/delete-modal";
import {push} from "connected-react-router";
import MembershipModal from "../../components/membership-modal/membership-modal";
import ActionsMenu from "../../components/actions-menu/actions-menu";
import PageHeader from "../../components/page-header/page-header";
import StoryModal from "../../components/story-modal/story-modal";

const Dashboard = (props) => {
  const {
    getDashboard,
    isLoading,
    userInfo,
    showNotification,
    projectRequestInProgress,
    membershipRequestInProgress,
    storyRequestInProgress,
    createProject,
    deleteProject,
    projects,
    historyPush,
    getAvailableUsers,
    createMembership,
    getMemberNames,
    createStory
  } = props;
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [deleteProjectData, setDeleteProject] = useState({});
  const [membershipData, setMembershipData] = useState({});
  const [newStoryData, setNewStoryData] = useState({});

  useEffect(() => {
    getDashboard();
  }, []);

  const projectsTableProps = {
    projects,
    actions: {
      deleteProject: (project) => setDeleteProject(project),
      addMember: (project, adminAllowed) => setMembershipData({project, adminAllowed}),
      viewProject: (project) => historyPush(`/projects/${project.id}`),
      addStory: (project) => setNewStoryData({project})
    }
  };

  const actionsMenuProps = {
    dataTestId: "dashboardActionsMenu",
    menuItems: [{
      icon: faPlus,
      label: "New Project",
      onClick: () => setShowNewProjectModal(true)
    }]
  };

  return (
    <DashboardWrapper>
      {isLoading ? (
        <LoadingSpinner alignCenter dataTestId="dashboardLoader" message={`Loading Dashboard for ${userInfo.displayName}`}/>
      ) : (
        <Fragment>
          <PageHeader text="Dashboard" textCenter dataTestId="dashboardHeader" />
          <ActionsMenu {...actionsMenuProps} />
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
                )}
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
              refresh={getDashboard}
            />
          )}
          {membershipData.project && (
            <MembershipModal
              onClose={() => setMembershipData({})}
              onSubmit={createMembership}
              showNotification={showNotification}
              requestInProgress={membershipRequestInProgress}
              getAvailableUsers={getAvailableUsers}
              adminAllowed={!!membershipData.adminAllowed}
              project={membershipData.project}
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
              refresh={getDashboard}
            />
          )}
          {newStoryData.project && (
            <StoryModal
              onClose={() => setNewStoryData({})}
              onSubmit={createStory}
              requestInProgress={storyRequestInProgress}
              showNotification={showNotification}
              getMemberNames={getMemberNames}
              project={newStoryData.project}
              refresh={getDashboard}
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
  membershipRequestInProgress: PropTypes.bool.isRequired,
  storyRequestInProgress: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  getAvailableUsers: PropTypes.func.isRequired,
  createMembership: PropTypes.func.isRequired,
  getMemberNames: PropTypes.func.isRequired,
  createStory: PropTypes.func.isRequired
};

export default connect((state) => ({
  isLoading: state.dashboard.isLoading,
  projects: state.dashboard.projects,
  stories: state.dashboard.stories,
  userInfo: state.auth.user,
  projectRequestInProgress: state.project.isLoading,
  membershipRequestInProgress: state.membership.isLoading,
  storyRequestInProgress: state.story.isLoading
}), {
  getDashboard,
  showNotification,
  createProject,
  deleteProject,
  historyPush: push,
  getAvailableUsers,
  createMembership,
  getMemberNames,
  createStory
})(Dashboard);
