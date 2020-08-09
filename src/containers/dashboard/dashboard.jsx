import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {showNotification} from "../../store/actions/notification";
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
import {getDashboardProjects, getDashboardStories} from "../../store/actions/dashboard";
import StoriesTable from "../../components/stories-table/stories-table";

const Dashboard = (props) => {
  const {
    getDashboardProjects,
    getDashboardStories,
    userInfo,
    showNotification,
    projectRequestInProgress,
    membershipRequestInProgress,
    storyRequestInProgress,
    createProject,
    deleteProject,
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
  const [projectsData, setProjectsData] = useState(undefined);
  const [storiesData, setStoriesData] = useState(undefined);

  // called once, after the component is mounted.
  const _loadData = async() => {
    const projectsResponse = await getDashboardProjects();
    const storiesResponse = await getDashboardStories();
    if(!projectsResponse.error)
      setProjectsData(projectsResponse);
    
    if(!storiesResponse.error)
      setStoriesData(storiesResponse);
  };
  useEffect(() => {
    _loadData();
  }, []);

  const _refreshProjects = async() => {
    const {page, itemsPerPage} = projectsData;
    const projectsResponse = await getDashboardProjects(page, itemsPerPage);
    if(!projectsResponse.error)
      setProjectsData(projectsResponse);
  };

  const _refreshStories = async() => {
    const {page, itemsPerPage} = storiesData;
    const storiesResponse = await getDashboardStories(page, itemsPerPage);
    if(!storiesResponse.error)
      setStoriesData(storiesResponse);
  };

  const projects = projectsData && projectsData.projects;
  const stories = storiesData && storiesData.stories;
  const projectsTableProps = {
    projects,
    actions: {
      deleteProject: (project) => setDeleteProject(project),
      addMember: (project, adminAllowed) => setMembershipData({project, adminAllowed}),
      viewProject: (project) => historyPush(`/projects/${project.id}`),
      addStory: (project) => setNewStoryData({project})
    },
    pagination: {
      itemsPerPage: projectsData && projectsData.itemsPerPage,
      page: projectsData && projectsData.page,
      totalPages: projectsData && projectsData.totalPages,
      getPage: async(page) => {
        if(page === projectsData.page)
          return;
        const response = await getDashboardProjects(page, projectsData.itemsPerPage);
        if(!response.error)
          return setProjectsData(response);
      }
    }
  };

  const storiesTableProps = {
    stories,
    actions: {
      viewStory: (story) => historyPush(`/projects/${story.project.id}/stories/${story.id}`)
    },
    pagination: {
      itemsPerPage: storiesData && storiesData.itemsPerPage,
      page: storiesData && storiesData.page,
      totalPages: storiesData && storiesData.totalPages,
      getPage: async(page) => {
        if(page === storiesData.page)
          return;
        const response = await getDashboardStories(page, storiesData.itemsPerPage);
        if(!response.error)
          return setStoriesData(response);
      }
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
      {!projects || !stories ? (
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
                {stories.length ? (
                  <StoriesTable {...storiesTableProps} />
                ) : (
                  <div>You are not the owner/creator of any stories</div>
                )}
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
              refresh={_refreshProjects}
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
              refresh={_refreshProjects}
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
              refresh={_refreshStories}
            />
          )}
        </Fragment>
      )}
    </DashboardWrapper>
  );
};

Dashboard.propTypes = {
  getDashboardProjects: PropTypes.func.isRequired,
  getDashboardStories: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
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
  userInfo: state.auth.user,
  projectRequestInProgress: state.project.isLoading,
  membershipRequestInProgress: state.membership.isLoading,
  storyRequestInProgress: state.story.isLoading
}), {
  showNotification,
  createProject,
  deleteProject,
  historyPush: push,
  getAvailableUsers,
  createMembership,
  getMemberNames,
  createStory,
  getDashboardProjects,
  getDashboardStories
})(Dashboard);
