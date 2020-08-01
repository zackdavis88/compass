import React, {useEffect, useState} from "react";
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
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import Tabs from "../../components/tabs/tabs";
import {formatDate} from "../../utils";

const ProjectDetails = (props) => {
  const {projectIsLoading, getProject} = props;
  const [project, setProject] = useState(undefined);

  const _loadData = async() => {
    const projectId = props.match.params.projectId;
    const response = await getProject(projectId, true);
    
    // TODO: Error handling - need to determine the flow here.
    // if(response.error)

    if(response.project)
      setProject(response.project);
  };

  useEffect(() => {
    if(!project)
      _loadData();
  }, []);

  return (
    <ProjectDetailsWrapper>
      {projectIsLoading || !project ? (
        <LoadingSpinner alignCenter dataTestId="projectDetailsLoader" message={`Loading project details`} />
      ) : (
        // TODO: Render project details--
        // TODO: Render project not found message if the API kicks back a 404--

        /* ramblings on the data we want to see on this page:
            List out the project's members and story backlog, this can be done using a Table component for
            each..all contained within a Tabs component (the same way we show data on the Dashboard).

            The current Table component has no support for pagination and that is going to be absolutely needed.
            I need to add Pagination to the Table (should it be added here? somewhere separate? instinct says include it with Table).


            TODOs before this page can be completed:
            1. Update Table to support pagination
        */
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
                  <span>Created On</span>
                  {formatDate(project.createdOn)}
                </Statistic>
                <Statistic>
                  <span>Updated On</span>
                  {formatDate(project.updatedOn)}
                </Statistic>
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
            Members here.
          </Tabs.Panel>
          <Tabs.Panel>
            Backlog here.
          </Tabs.Panel>
        </Tabs.TabPanels>
      </Tabs>
      )}
    </ProjectDetailsWrapper>
  );
};

ProjectDetails.propTypes = {
  projectIsLoading: PropTypes.bool.isRequired,
  getProject: PropTypes.func.isRequired
};

export default connect((state) => ({
  projectIsLoading: state.project.isLoading
}), {
  getProject
})(ProjectDetails);
