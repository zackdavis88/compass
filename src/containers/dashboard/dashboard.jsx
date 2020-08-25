import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {showNotification} from "../../store/actions/notification";
import {createProject, deleteProject} from "../../store/actions/project";
import {createStory} from "../../store/actions/story";
import {getAvailableUsers, createMembership, getMemberNames} from "../../store/actions/membership";
import {getAllPriorityNames} from "../../store/actions/priority";
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
import SearchBar from "../../components/search-bar/search-bar";
import {generateUrlWithQuery, generateObjectFromSearch, setTitle} from "../../utils";

const Dashboard = (props) => {
  setTitle("Dashboard");
  const query = generateObjectFromSearch(props.location.search);
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
    createStory,
    getAllPriorityNames
  } = props;
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [deleteProjectData, setDeleteProject] = useState({});
  const [membershipData, setMembershipData] = useState({});
  const [newStoryData, setNewStoryData] = useState({});
  const [projectsData, setProjectsData] = useState(undefined);
  const [storiesData, setStoriesData] = useState(undefined);
  const [projectSearchData, setProjectSearchData] = useState({
    inputValue: query.projectSearch || "",
    searchedValue: query.projectSearch || ""
  });
  const [storySearchData, setStorySearchData] = useState({
    inputValue: query.storySearch || "",
    searchedValue: query.storySearch || ""
  });

  // called once, after the component is mounted.
  const _loadData = async() => {
    const projectsResponse = await getDashboardProjects(query.projectsPage, undefined, query.projectSearch);
    const storiesResponse = await getDashboardStories(query.storiesPage, undefined, query.storySearch);
    
    if(!projectsResponse.error)
      setProjectsData(projectsResponse);
    
    if(!storiesResponse.error)
      setStoriesData(storiesResponse);

    // If the initial query-string had values that changed (page > totalPages), update the query-string.
    if(query.projectsPage && projectsResponse && projectsResponse.page.toString() !== query.projectsPage)
      _updateQueryString("projectsPage", projectsResponse.page);
  
    if(query.storiesPage && storiesResponse && storiesResponse.page.toString() !== query.storiesPage)
      _updateQueryString("storiesPage", storiesResponse.page);
  };
  useEffect(() => {
    _loadData();
  }, []);

  const _refreshProjects = async() => {
    const {page, itemsPerPage} = projectsData;
    const projectsResponse = await getDashboardProjects(page, itemsPerPage, projectSearchData.searchedValue);
    if(!projectsResponse.error)
      setProjectsData(projectsResponse);
    
    _updateQueryString("projectsPage", projectsResponse.page);
  };

  const _refreshStories = async() => {
    const {page, itemsPerPage} = storiesData;
    const storiesResponse = await getDashboardStories(page, itemsPerPage, storySearchData.searchedValue);
    if(!storiesResponse.error)
      setStoriesData(storiesResponse);
  };

  const _updateQueryString = (key, value) => {
    const newUrl = generateUrlWithQuery(key, value);
    history.replaceState({path: newUrl}, "", newUrl);
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
        const response = await getDashboardProjects(page, projectsData.itemsPerPage, projectSearchData.searchedValue);
        if(!response.error)
          setProjectsData(response);
        
        _updateQueryString("projectsPage", page);
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
        const response = await getDashboardStories(page, storiesData.itemsPerPage, storySearchData.searchedValue);
        if(!response.error)
          setStoriesData(response);
        
        _updateQueryString("storiesPage", page);
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

  const projectsSearchBarProps = {
    id: "dashboardProjectSearch",
    dataTestId: `dashboardProjectSearch`,
    label: "Project Name",
    placeholder: "Search by project name",
    value: projectSearchData.inputValue,
    searchedValue: projectSearchData.searchedValue,
    onChange: (value) => setProjectSearchData({
      ...projectSearchData,
      inputValue: value
    }),
    search: async(value) => {
      _updateQueryString("projectSearch", value ? value : null);
      setProjectSearchData({
        ...projectSearchData,
        searchedValue: value
      });
      const {itemsPerPage} = projectsData;
      const projectsResponse = await getDashboardProjects(1, itemsPerPage, value);
      _updateQueryString("projectsPage", 1);
      if(!projectsResponse.error)
        setProjectsData(projectsResponse);
    },
    clear: async() => {
      _updateQueryString("projectSearch", null);
      setProjectSearchData({
        inputValue: "",
        searchedValue: ""
      });
      const {itemsPerPage} = projectsData;
      const projectsResponse = await getDashboardProjects(1, itemsPerPage);
      _updateQueryString("projectsPage", 1);
      if(!projectsResponse.error)
        setProjectsData(projectsResponse);
    }
  };

  const storiesSearchBarProps = {
    id: "dashboardStorySearch",
    dataTestId: `dashboardStorySearch`,
    label: "Story Name",
    placeholder: "Search by story name",
    value: storySearchData.inputValue,
    searchedValue: storySearchData.searchedValue,
    onChange: (value) => setStorySearchData({
      ...storySearchData,
      inputValue: value
    }),
    search: async(value) => {
      _updateQueryString("storySearch", value ? value : null);
      setStorySearchData({
        ...storySearchData,
        searchedValue: value
      });
      const {itemsPerPage} = storiesData;
      const storiesResponse = await getDashboardStories(1, itemsPerPage, value);
      _updateQueryString("storiesPage", 1);
      if(!storiesResponse.error)
        setStoriesData(storiesResponse);
    },
    clear: async() => {
      _updateQueryString("storySearch", null);
      setStorySearchData({
        inputValue: "",
        searchedValue: ""
      });
      const {itemsPerPage} = storiesData;
      const storiesResponse = await getDashboardStories(1, itemsPerPage);
      _updateQueryString("storiesPage", 1);
      if(!storiesResponse.error)
        setStoriesData(storiesResponse);
    }
  };

  const _onHeaderClick = (headerIndex) => {
    if(headerIndex === 0)
      return _updateQueryString("activeTab", null);
    
    _updateQueryString("activeTab", headerIndex);
  };

  return (
    <DashboardWrapper>
      {!projects || !stories ? (
        <LoadingSpinner alignCenter dataTestId="dashboardLoader" message={`Loading Dashboard for ${userInfo.displayName}`}/>
      ) : (
        <Fragment>
          <PageHeader text="Dashboard" textCenter dataTestId="dashboardHeader" />
          <ActionsMenu {...actionsMenuProps} />
          <Tabs dataTestId="dashboardTabs" tabOverride={query.activeTab} onHeaderClick={_onHeaderClick}>
            <Tabs.TabHeaders>
              <Tabs.Header>My Projects</Tabs.Header>
              <Tabs.Header>My Stories</Tabs.Header>
            </Tabs.TabHeaders>
            <Tabs.TabPanels>
              <Tabs.Panel>
                <SearchBar {...projectsSearchBarProps}/>
                <ProjectsTable {...projectsTableProps} />
              </Tabs.Panel>
              <Tabs.Panel>
                <SearchBar {...storiesSearchBarProps}/>
                <StoriesTable {...storiesTableProps} />
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
              getPriorityNames={getAllPriorityNames}
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
  createStory: PropTypes.func.isRequired,
  getAllPriorityNames: PropTypes.func.isRequired
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
  getDashboardStories,
  getAllPriorityNames
})(Dashboard);
