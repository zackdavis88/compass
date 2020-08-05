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
  Statistic,
  ProjectActionButtons
} from "./project-details.styles";
import {getProject, updateProject, deleteProject} from "../../store/actions/project";
import {getMemberships, deleteMembership, updateMembership, createMembership, getAvailableUsers} from "../../store/actions/membership";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import Tabs from "../../components/tabs/tabs";
import {formatDate} from "../../utils";
import {PageError} from "../../common-styles/base";
import MembershipsTable from "../../components/memberships-table/memberships-table";
import DeleteModal from "../../components/delete-modal/delete-modal";
import MembershipModal from "../../components/membership-modal/membership-modal";
import { faTrash, faEdit, faUserTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/button";
import ProjectModal from "../../components/project-modal/project-modal";
import {push} from "connected-react-router";
import {showNotification} from "../../store/actions/notification";

const ProjectDetails = (props) => {
  // Extracting our props for use and declaring component states.
  const {
    projectIsLoading,
    membershipIsLoading,
    getProject,
    getMemberships,
    deleteMembership,
    updateMembership,
    updateProject,
    deleteProject,
    historyPush,
    showNotification,
    createMembership,
    getAvailableUsers
  } = props;
  const [pageError, setPageError] = useState(undefined);
  const [projectData, setProjectData] = useState(undefined);
  const [membershipsPaginatedData, setMembershipsData] = useState(undefined);
  const [deleteMembershipData, setDeleteMembershipData] = useState({});
  const [editMembershipData, setEditMembershipData] = useState({});
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  // This is called once, on component mount (inside useEffect)
  const _loadData = async() => {
    const projectId = props.match.params.projectId;
    const projectResponse = await getProject(projectId, true);
    const membershipResponse = await getMemberships(projectId);

    if(projectResponse && projectResponse.error)
      return setPageError(projectResponse.error);
    
    if(membershipResponse && membershipResponse.error)
      return setPageError(membershipResponse.error);

    setProjectData(projectResponse);
    setMembershipsData(membershipResponse);
  };

  // This is called when we delete or edit a membership.
  const _reloadMemberships = async() => {
    const {itemsPerPage, page} = membershipsPaginatedData;
    const projectId = props.match.params.projectId;
    const response = await getMemberships(projectId, page, itemsPerPage);
    if(response && response.error)
      return setPageError(response.error);
    
    setMembershipsData(response);
  };

  // This is called when we edit project details.
  const _reloadDetails = async() => {
    const projectId = props.match.params.projectId;
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

  // Props that will be utilized in the membership tab's Pagination component.
  const membershipsPagination = {
    itemsPerPage: membershipsPaginatedData && membershipsPaginatedData.itemsPerPage,
    page: membershipsPaginatedData && membershipsPaginatedData.page,
    totalPages: membershipsPaginatedData && membershipsPaginatedData.totalPages,
    getPage: async(page) => {
      if(page === membershipsPaginatedData.page)
        return;
      const response = await getMemberships(props.match.params.projectId, page, membershipsPaginatedData.itemsPerPage);
      if(response.error)
        return setPageError(response.error);
      
      setMembershipsData(response);
    }
  };
  
  const project = projectData && projectData.project;
  const userRoles = projectData && projectData.userRoles;
  return (
    <ProjectDetailsWrapper>
      {pageError ? (
          <PageError>{pageError}</PageError>
        ) : 
        (!projectData || !membershipsPaginatedData) ? (
          <LoadingSpinner alignCenter dataTestId="projectDetailsLoader" message={`Loading project details`} />
        ) : 
        (
          <Fragment>
            {userRoles && <ProjectActionButtons>
              {userRoles.isAdmin && (
                <Button
                  small
                  secondary
                  danger
                  label="Delete Project"
                  startIcon={faTrash}
                  dataTestId="detailsDeleteProject"
                  onClick={() => setShowProjectDeleteModal(true)}
                />
              )}
              {(userRoles.isManager || userRoles.isAdmin) && (
                <Fragment>
                  <Button
                    small
                    secondary
                    label="Edit Project"
                    startIcon={faEdit}
                    dataTestId="detailsEditProject"
                    onClick={() => setShowProjectEditModal(true)}
                  />
                  <Button
                    small
                    secondary
                    label="Add Member"
                    startIcon={faUserPlus}
                    dataTestId="detailsNewMember"
                    onClick={() => setShowAddMemberModal(true)}
                  />
                </Fragment>
              )}
            </ProjectActionButtons>}
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
                  {membershipsPaginatedData.memberships.length ? (
                    <MembershipsTable
                      memberships={membershipsPaginatedData.memberships}
                      userRoles={userRoles}
                      actions={{
                        deleteMembership: (membership) => setDeleteMembershipData(membership),
                        editMembership: (membership) => setEditMembershipData(membership)
                      }}
                      pagination={membershipsPagination}
                    />
                  ) : (
                    <div>This project has no members</div>
                  )}
                </Tabs.Panel>
                <Tabs.Panel>
                  Backlog here.
                </Tabs.Panel>
              </Tabs.TabPanels>
            </Tabs>
          </Fragment>
        )}
        {/* Modal City, pop: 5 */}
        {deleteMembershipData.id && (
          <DeleteModal
            onClose={() => setDeleteMembershipData({})}
            onSubmit={deleteMembership}
            dataTestId="membershipDeleteModal"
            headerText="Delete Membership"
            headerIcon={faUserTimes}
            bodyText={`${deleteMembershipData.user.displayName} will no longer have
            access to this project. Please proceed with caution.`}
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
          />
        )}
    </ProjectDetailsWrapper>
  );
};

ProjectDetails.propTypes = {
  projectIsLoading: PropTypes.bool.isRequired,
  membershipIsLoading: PropTypes.bool.isRequired,
  getProject: PropTypes.func.isRequired,
  getMemberships: PropTypes.func.isRequired,
  deleteMembership: PropTypes.func.isRequired,
  updateMembership: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  createMembership: PropTypes.func.isRequired,
  getAvailableUsers: PropTypes.func.isRequired
};

export default connect((state) => ({
  projectIsLoading: state.project.isLoading,
  membershipIsLoading: state.membership.isLoading
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
  getAvailableUsers
})(ProjectDetails);
