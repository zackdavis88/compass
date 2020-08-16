import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  ProjectDetailsWrapper,
  DetailsSection,
  DetailsBlock,
  ProjectName,
  ProjectID,
  ProjectVisibility,
  ProjectDescription,
  Statistic
} from "./project-details.styles";
import {getProject, updateProject, deleteProject} from "../../store/actions/project";
import {getMemberships, deleteMembership, updateMembership, createMembership, getAvailableUsers, getMemberNames} from "../../store/actions/membership";
import {getStories, deleteStory, createStory} from "../../store/actions/story";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import Tabs from "../../components/tabs/tabs";
import {formatDate} from "../../utils";
import {PageError} from "../../common-styles/base";
import MembershipsTable from "../../components/memberships-table/memberships-table";
import DeleteModal from "../../components/delete-modal/delete-modal";
import MembershipModal from "../../components/membership-modal/membership-modal";
import { faTrash, faEdit, faUserTimes, faUserPlus, faBook } from "@fortawesome/free-solid-svg-icons";
import ProjectModal from "../../components/project-modal/project-modal";
import {push} from "connected-react-router";
import {showNotification} from "../../store/actions/notification";
import ActionsMenu from "../../components/actions-menu/actions-menu";
import PageHeader from "../../components/page-header/page-header";
import StoriesTable from "../../components/stories-table/stories-table";
import StoryModal from "../../components/story-modal/story-modal";
import {generateUrlWithQuery, generateObjectFromSearch} from "../../utils";
import SearchBar from "../../components/search-bar/search-bar";

const ProjectDetails = (props) => {
  // Extracting our props for use and declaring component states.
  const {
    projectIsLoading,
    membershipIsLoading,
    storyIsLoading,
    getProject,
    getMemberships,
    getStories,
    deleteMembership,
    updateMembership,
    updateProject,
    deleteProject,
    historyPush,
    showNotification,
    createMembership,
    getAvailableUsers,
    deleteStory,
    createStory,
    getMemberNames
  } = props;
  const query = generateObjectFromSearch(props.location.search);
  const projectId = props.match.params.projectId;
  const [pageError, setPageError] = useState(undefined);
  const [projectData, setProjectData] = useState(undefined);
  const [membershipsData, setMembershipsData] = useState(undefined);
  const [storiesData, setStoriesData] = useState(undefined);
  const [deleteMembershipData, setDeleteMembershipData] = useState({});
  const [editMembershipData, setEditMembershipData] = useState({});
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [deleteStoryData, setDeleteStoryData] = useState({});
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [memberSearchData, setMemberSearchData] = useState({
    inputValue: query.memberSearch || "",
    searchedValue: query.memberSearch || ""
  });
  const [storySearchData, setStorySearchData] = useState({
    inputValue: query.storySearch || "",
    searchedValue: query.storySearch || ""
  });

  // This is called once, on component mount (inside useEffect)
  const _loadData = async() => {
    const projectResponse = await getProject(projectId, true);
    const membershipResponse = await getMemberships(projectId, query.membersPage, null, query.memberSearch);
    const storiesResponse = await getStories(projectId, query.storiesPage, null, query.storySearch);

    if(projectResponse && projectResponse.error)
      return setPageError(projectResponse.error);
    
    if(membershipResponse && membershipResponse.error)
      return setPageError(membershipResponse.error);

    if(storiesResponse && storiesResponse.error)
      return setPageError(storiesResponse.error);

    // If the initial query-string had values that changed (page > totalPages), update the query-string.
    if(query.membersPage && membershipResponse && membershipResponse.page.toString() !== query.membersPage)
      _updateQueryString("membersPage", membershipResponse.page);
    
    if(query.storiesPage && storiesResponse && storiesResponse.page.toString() !== query.storiesPage)
      _updateQueryString("storiesPage", storiesResponse.page);
    setProjectData(projectResponse);
    setMembershipsData(membershipResponse);
    setStoriesData(storiesResponse);
  };

  // This is called when we delete or edit a membership.
  const _reloadMemberships = async() => {
    const {itemsPerPage, page} = membershipsData;
    const response = await getMemberships(projectId, page, itemsPerPage, memberSearchData.searchedValue);
    if(response && response.error)
      return setPageError(response.error);
    
    setMembershipsData(response);
  };

    // This is called when we delete or edit a story.
    const _reloadStories = async() => {
      const {itemsPerPage, page} = storiesData;
      const response = await getStories(projectId, page, itemsPerPage, storySearchData.searchedValue);
      if(response && response.error)
        return setPageError(response.error);
      
      setStoriesData(response);
    };

  // This is called when we edit project details.
  const _reloadDetails = async() => {
    const response = await getProject(projectId, true);
    if(response && response.error)
      return setPageError(response.error);

    setProjectData(response);
  };

  // Called once upon component mount, fetches all data.
  useEffect(() => {
    if(!projectData)
      _loadData();
  }, []);

  const _updateQueryString = (key, value) => {
    const newUrl = generateUrlWithQuery(key, value);
    history.pushState({path: newUrl}, "", newUrl);
  }

  // Props that will be utilized in the membership tab's Pagination component.
  const membershipsPagination = {
    itemsPerPage: membershipsData && membershipsData.itemsPerPage,
    page: membershipsData && membershipsData.page,
    totalPages: membershipsData && membershipsData.totalPages,
    getPage: async(page) => {
      if(page === membershipsData.page)
        return;
      _updateQueryString("membersPage", page);
      const response = await getMemberships(projectId, page, membershipsData.itemsPerPage, memberSearchData.searchedValue);
      if(response.error)
        return setPageError(response.error);
      
      setMembershipsData(response);
    }
  };

  const storiesPagination = {
    itemsPerPage: storiesData && storiesData.itemsPerPage,
    page: storiesData && storiesData.page,
    totalPages: storiesData && storiesData.totalPages,
    getPage: async(page) => {
      if(page === storiesData.page)
        return;
      _updateQueryString("storiesPage", page);
      const response = await getStories(projectId, page, storiesData.itemsPerPage, storySearchData.searchedValue);
      if(response.error)
        return setPageError(response.error);
      
      setStoriesData(response);
    }
  };
  
  const project = projectData && projectData.project;
  const userRoles = projectData && projectData.userRoles;
  const actionsMenuProps = {
    dataTestId: "projectDetailsActionsMenu",
    menuItems: [{
      icon: faBook,
      label: "New Story",
      onClick: () => setShowStoryModal(true)
    }]
  };
  if(userRoles && (userRoles.isManager || userRoles.isAdmin)) {
    actionsMenuProps.menuItems = actionsMenuProps.menuItems.concat([{
      icon: faEdit,
      label: "Edit Project",
      onClick: () => setShowProjectEditModal(true)
    }, {
      icon: faUserPlus,
      label: "Add Member",
      onClick: () => setShowAddMemberModal(true)
    }]);
  }
  if(userRoles && userRoles.isAdmin) {
    actionsMenuProps.menuItems = actionsMenuProps.menuItems.concat({
      icon: faTrash,
      label: "Delete Project",
      onClick: () => setShowProjectDeleteModal(true)
    });
  }

  // SearchBar Props
  const membersSearchBarProps = {
    id: "projectMembersSearch",
    dataTestId: `projectMembersSearch`,
    label: "Member Name",
    placeholder: "Search by member name",
    searchedValue: memberSearchData.searchedValue,
    value: memberSearchData.inputValue,
    onChange: (value) => setMemberSearchData({
      ...memberSearchData,
      inputValue: value
    }),
    search: async(value) => {
      _updateQueryString("memberSearch", value ? value : null);
      setMemberSearchData({
        ...memberSearchData,
        searchedValue: value
      });
      const {itemsPerPage} = membershipsData;
      const membershipsResponse = await getMemberships(projectId, 1, itemsPerPage, value);
      _updateQueryString("membersPage", 1);
      if(!membershipsResponse.error)
        setMembershipsData(membershipsResponse);
    },
    clear: async() => {
      _updateQueryString("memberSearch", null);
      setMemberSearchData({
        inputValue: "",
        searchedValue: ""
      });
      const {itemsPerPage} = membershipsData;
      const membershipsResponse = await getMemberships(projectId, 1, itemsPerPage);
      _updateQueryString("membersPage", 1);
      if(!membershipsResponse.error)
        setMembershipsData(membershipsResponse);
    }
  };

  const storiesSearchBarProps = {
    id: "projectStoriesSearch",
    dataTestId: `projectStoriesSearch`,
    label: "Story Name",
    placeholder: "Search by story name",
    searchedValue: storySearchData.searchedValue,
    value: storySearchData.inputValue,
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
      const storiesResponse = await getStories(projectId, 1, itemsPerPage, value);
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
      const storiesResponse = await getStories(projectId, 1, itemsPerPage);
      _updateQueryString("storiesPage", 1);
      if(!storiesResponse.error)
        setStoriesData(storiesResponse);
    }
  };

  return (
    <ProjectDetailsWrapper>
      {pageError ? (
          <PageError>{pageError}</PageError>
        ) : 
        (!projectData || !membershipsData || !storiesData) ? (
          <LoadingSpinner alignCenter dataTestId="projectDetailsLoader" message={`Loading project details`} />
        ) : 
        (
          <Fragment>
            <PageHeader text={`Project - ${project.name}`} dataTestId="projectDetailsHeader" textCenter/>
            {userRoles && (userRoles.isAdmin || userRoles.isManager || userRoles.isDeveloper) && (
              <ActionsMenu {...actionsMenuProps} />
            )}
            <Tabs dataTestId="projectDetailsTabs">
              <Tabs.TabHeaders>
                <Tabs.Header>Details</Tabs.Header>
                <Tabs.Header>Members</Tabs.Header>
                <Tabs.Header>Backlog</Tabs.Header>
              </Tabs.TabHeaders>
              <Tabs.TabPanels>
                <Tabs.Panel>
                  <DetailsSection>
                    <DetailsBlock width="60%" inlineLeft>
                      <ProjectID>{project.id}</ProjectID>
                      <ProjectName>{project.name}</ProjectName>
                      <ProjectVisibility isPrivate={project.isPrivate}>
                        <span>{project.isPrivate ? "Private" : "Public"}</span>
                      </ProjectVisibility>
                      <ProjectDescription>
                        <span>Description</span>
                        {project.description ? project.description : <div>This project has no description.</div>}
                      </ProjectDescription>
                    </DetailsBlock>
                    <DetailsBlock width="40%" inlineRight>
                      <Statistic>
                        <span>Create Date</span>
                        {formatDate(project.createdOn)}
                      </Statistic>
                      {project.updatedOn && (
                        <Statistic>
                          <span>Last Modified</span>
                          {formatDate(project.updatedOn)}
                        </Statistic>
                      )}
                      <Statistic>
                        <span>Total Members</span>
                        {project.statistics.memberships}
                      </Statistic>
                      <Statistic>
                        <span>Total Stories</span>
                        {project.statistics.stories}
                      </Statistic>
                    </DetailsBlock>
                  </DetailsSection>
                </Tabs.Panel>
                <Tabs.Panel>
                  {userRoles && (userRoles.isAdmin || userRoles.isManager || userRoles.isDeveloper || userRoles.isViewer) && (
                    <SearchBar {...membersSearchBarProps} />
                  )}
                  <MembershipsTable
                    memberships={membershipsData.memberships}
                    userRoles={userRoles}
                    actions={{
                      deleteMembership: (membership) => setDeleteMembershipData(membership),
                      editMembership: (membership) => setEditMembershipData(membership)
                    }}
                    pagination={membershipsPagination}
                  />
                </Tabs.Panel>
                <Tabs.Panel>
                  {userRoles && (userRoles.isAdmin || userRoles.isManager || userRoles.isDeveloper || userRoles.isViewer) && (
                    <SearchBar {...storiesSearchBarProps} />
                  )}
                  <StoriesTable
                    stories={storiesData.stories}
                    project={{
                      id: project.id,
                      name: project.name,
                      userRoles: userRoles
                    }}
                    actions={{
                      deleteStory: (story) => setDeleteStoryData(story),
                      viewStory: (story) => historyPush(`/projects/${project.id}/stories/${story.id}`)
                    }}
                    pagination={storiesPagination}
                  />
                </Tabs.Panel>
              </Tabs.TabPanels>
            </Tabs>
          </Fragment>
        )}
        {/* Modal City, pop: 7 */}
        {deleteMembershipData.id && (
          <DeleteModal
            onClose={() => setDeleteMembershipData({})}
            onSubmit={deleteMembership}
            dataTestId="membershipDeleteModal"
            headerText="Delete Membership"
            headerIcon={faUserTimes}
            bodyText={(
              <Fragment>
                <span>{`${deleteMembershipData.user.displayName}`}</span> will no longer
                have access to this project. Please proceed with caution.
              </Fragment>
            )}
            expectedInput={true}
            resource={{...deleteMembershipData, project: {id: project.id}}}
            inputProps={{
              label: "Delete this Membership"
            }}
            refresh={_reloadMemberships}
          />
        )}
        {editMembershipData.id && (
          <MembershipModal
            onClose={() => setEditMembershipData({})}
            onSubmit={updateMembership}
            requestInProgress={membershipIsLoading}
            project={project}
            adminAllowed={projectData.userRoles && projectData.userRoles.isAdmin}
            membership={editMembershipData}
            refresh={_reloadMemberships}
          />
        )}
        {showProjectEditModal && (
          <ProjectModal
            onClose={() => setShowProjectEditModal(false)}
            onSubmit={updateProject}
            requestInProgress={projectIsLoading}
            refresh={_reloadDetails}
            project={project}
          />
        )}
        {showProjectDeleteModal && (
          <DeleteModal
            onClose={() => setShowProjectDeleteModal(false)}
            onSubmit={deleteProject}
            dataTestId="projectDeleteModal"
            headerText="Delete Project"
            bodyText={`All memberships and stories belonging to this project will be
            deleted as well. Please proceed with caution.`}
            resource={project}
            expectedInput={project.name}
            inputProps={{
              label: "Project Name",
              placeholder: "Enter the project's name"
            }}
            refresh={() => historyPush("/dashboard")}
            showNotification={showNotification}
          />
        )}
        {showAddMemberModal && (
          <MembershipModal
            onClose={() => setShowAddMemberModal(false)}
            onSubmit={createMembership}
            requestInProgress={membershipIsLoading}
            getAvailableUsers={getAvailableUsers}
            adminAllowed={!!(userRoles && userRoles.isAdmin)}
            project={project}
            refresh={_reloadMemberships}
          />
        )}
        {deleteStoryData.id && (
          <DeleteModal
            onClose={() => setDeleteStoryData({})}
            onSubmit={deleteStory}
            dataTestId="storyDeleteModal"
            headerText="Delete Story"
            headerIcon={faTrash}
            bodyText={`This story will be permanently deleted. This data cannot be recovered.`}
            expectedInput={true}
            resource={deleteStoryData}
            inputProps={{
              label: "Delete this Story"
            }}
            refresh={_reloadStories}
          />
        )}
        {showStoryModal && (
          <StoryModal
            onClose={() => setShowStoryModal(false)}
            onSubmit={createStory}
            requestInProgress={storyIsLoading}
            getMemberNames={getMemberNames}
            project={project}
            refresh={_reloadStories}
          />
        )}
    </ProjectDetailsWrapper>
  );
};

ProjectDetails.propTypes = {
  projectIsLoading: PropTypes.bool.isRequired,
  membershipIsLoading: PropTypes.bool.isRequired,
  storyIsLoading: PropTypes.bool.isRequired,
  getProject: PropTypes.func.isRequired,
  getMemberships: PropTypes.func.isRequired,
  deleteMembership: PropTypes.func.isRequired,
  updateMembership: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  createMembership: PropTypes.func.isRequired,
  getAvailableUsers: PropTypes.func.isRequired,
  getStories: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  createStory: PropTypes.func.isRequired,
  getMemberNames: PropTypes.func.isRequired
};

export default connect((state) => ({
  projectIsLoading: state.project.isLoading,
  membershipIsLoading: state.membership.isLoading,
  storyIsLoading: state.story.isLoading
}), {
  getProject,
  updateProject,
  deleteProject,
  getMemberships,
  deleteMembership,
  updateMembership,
  historyPush: push,
  showNotification,
  createMembership,
  getAvailableUsers,
  getStories,
  deleteStory,
  createStory,
  getMemberNames
})(ProjectDetails);
