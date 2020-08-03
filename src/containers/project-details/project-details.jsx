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
import {getProject} from "../../store/actions/project";
import {getMemberships, deleteMembership, updateMembership} from "../../store/actions/membership";
import {showNotification} from "../../store/actions/notification";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import Tabs from "../../components/tabs/tabs";
import {formatDate} from "../../utils";
import {PageError} from "../../common-styles/base";
import MembershipsTable from "../../components/memberships-table/memberships-table";
import DeleteModal from "../../components/delete-modal/delete-modal";
import MembershipModal from "../../components/membership-modal/membership-modal";

const ProjectDetails = (props) => {
  const {
    projectIsLoading,
    membershipIsLoading,
    getProject,
    getMemberships,
    deleteMembership,
    updateMembership,
    showNotification
  } = props;
  const [pageError, setPageError] = useState(undefined);
  const [projectData, setProjectData] = useState(undefined);
  const [membershipsPaginatedData, setMembershipsData] = useState(undefined);
  const [deleteMembershipData, setDeleteMembershipData] = useState({});
  const [editMembershipData, setEditMembershipData] = useState({});

  const _loadData = async() => {
    const projectId = props.match.params.projectId;
    const projectResponse = await getProject(projectId, true);
    const membershipResponse = await getMemberships(projectId);

    if(projectResponse.error)
      return setPageError(projectResponse.error);
    
    if(membershipResponse.error)
      return setPageError(membershipResponse.error);

    setProjectData(projectResponse);
    setMembershipsData(membershipResponse);
  };

  const _reloadMemberships = async() => {
    const {itemsPerPage, page} = membershipsPaginatedData;
    const projectId = props.match.params.projectId;
    const response = await getMemberships(projectId, page, itemsPerPage);
    if(response.error)
      return setPageError(response.error);
    
    setMembershipsData(response);
  };

  useEffect(() => {
    if(!projectData)
      _loadData();
  }, []);

  const membershipsPagination = {
    itemsPerPage: membershipsPaginatedData && membershipsPaginatedData.itemsPerPage,
    page: membershipsPaginatedData && membershipsPaginatedData.page,
    totalPages: membershipsPaginatedData && membershipsPaginatedData.totalPages,
    totalPages: 10,
    getPage: getMemberships
  };
  const project = projectData && projectData.project;
  const userRoles = projectData && projectData.userRoles;
  return (
    <ProjectDetailsWrapper>
      {pageError ? (
          <PageError>{pageError}</PageError>
        ) : 
        (projectIsLoading || !projectData) ? (
          <LoadingSpinner alignCenter dataTestId="projectDetailsLoader" message={`Loading project details`} />
        ) : 
        (
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
                {membershipIsLoading || !membershipsPaginatedData ? (
                  <LoadingSpinner alignCenter dataTestId="projectMembershipsLoader" message={`Loading project memberships`} />
                ) : (
                  <MembershipsTable
                    memberships={membershipsPaginatedData.memberships}
                    userRoles={userRoles}
                    actions={{
                      deleteMembership: (membership) => setDeleteMembershipData(membership),
                      editMembership: (membership) => setEditMembershipData(membership)
                    }}
                    pagination={membershipsPagination}
                  />
                )}
              </Tabs.Panel>
              <Tabs.Panel>
                Backlog here.
              </Tabs.Panel>
            </Tabs.TabPanels>
          </Tabs>
        )}
        {deleteMembershipData.id && (
          <DeleteModal
            onClose={() => setDeleteMembershipData({})}
            onSubmit={deleteMembership}
            dataTestId="membershipDeleteModal"
            headerText="Delete Membership"
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
            showNotification={showNotification}
            refresh={_reloadMemberships}
          />
        )}
        {editMembershipData.id && (
          <MembershipModal
            onClose={() => setEditMembershipData({})}
            onSubmit={updateMembership}
            requestInProgress={membershipIsLoading}
            showNotification={showNotification}
            project={project}
            adminAllowed={projectData.userRoles && projectData.userRoles.isAdmin}
            membership={editMembershipData}
            refresh={_reloadMemberships}
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
  showNotification: PropTypes.func.isRequired
};

export default connect((state) => ({
  projectIsLoading: state.project.isLoading,
  membershipIsLoading: state.membership.isLoading
}), {
  getProject,
  getMemberships,
  deleteMembership,
  updateMembership,
  showNotification
})(ProjectDetails);
