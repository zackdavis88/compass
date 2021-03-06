import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  StoryDetailsWrapper, 
  DetailsSection, 
  DetailsBlock,
  StoryID,
  StoryName,
  StoryDetailsBlock,
  SideItem
} from "./story-details.styles";
import {PageError, ProjectConfigLabel} from "../../common-styles/base";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import {getStory, deleteStory, updateStory} from "../../store/actions/story";
import {getAllPriorityNames} from "../../store/actions/priority";
import {showNotification} from "../../store/actions/notification";
import {getMemberNames} from "../../store/actions/membership";
import PageHeader from "../../components/page-header/page-header";
import ActionsMenu from "../../components/actions-menu/actions-menu";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Tabs from "../../components/tabs/tabs";
import {formatDate, setTitle} from "../../utils";
import DeleteModal from "../../components/delete-modal/delete-modal";
import StoryModal from "../../components/story-modal/story-modal";
import {push} from "connected-react-router";
import MarkdownText from "../../components/markdown-text/markdown-text";
import { getAllStatusNames } from "../../store/actions/status";

const StoryDetails = (props) => {
  setTitle("Story Details");
  const {
    storyIsLoading,
    getStory,
    deleteStory,
    updateStory,
    getMemberNames,
    historyPush,
    showNotification,
    getAllPriorityNames,
    getAllStatusNames
  } = props;
  const [pageError, setPageError] = useState(undefined);
  const [storyData, setStoryData] = useState(undefined);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const _loadData = async() => {
    const projectId = props.match.params.projectId;
    const storyId = props.match.params.storyId;
    const response = await getStory(projectId, storyId);
    if(response && response.error)
      return setPageError(response.error);
    
    setStoryData(response);
  };

  useEffect(() => {
    if(!storyData)
      _loadData();
  }, []);

  const story = storyData && storyData.story;
  const userRoles = storyData && story.project.userRoles;
  const actionsMenuProps = {
    dataTestId: "storyDetailsActionsMenu",
    menuItems: [{
      icon: faTrash,
      label: "Delete Story",
      onClick: () => setShowDeleteModal(true)
    }, {
      icon: faEdit,
      label: "Edit Story",
      onClick: () => setShowEditModal(true)
    }]
  };

  const _goToProjectDetails = () => {
    return historyPush(`/projects/${story.project.id}`);
  };

  // When a User clicks a markdown checkbox, we need to update the database and also the component state.
  const _updateMarkdownCheckbox = async(value) => {
    const response = await props.updateStory(story.project, story, null, value);
    if(response.error)
      return setPageError(response.error);
    
    setStoryData({...storyData, story: {...storyData.story, details: value}});
  };
  
  return (
    <StoryDetailsWrapper>
      {pageError ? (
        <PageError>{pageError}</PageError>
      ): (
      (!storyData) ? (
        <LoadingSpinner alignCenter dataTestId="storyDetailsLoader" message={`Loading story details`} />
      ) : (
        <Fragment>
          <PageHeader text={"Story Details"} dataTestId="storyDetailsHeader" textCenter/>
          {userRoles && (userRoles.isAdmin || userRoles.isManager || userRoles.isDeveloper) && (
            <ActionsMenu {...actionsMenuProps} />
          )}
          <Tabs dataTestId="storyDetailsTabs">
            <Tabs.TabHeaders>
              <Tabs.Header>Details</Tabs.Header>
            </Tabs.TabHeaders>
              <Tabs.TabPanels>
                <Tabs.Panel>
                  <DetailsSection>
                    <DetailsBlock inlineLeft width="80%">
                      <StoryID>{story.id}</StoryID>
                      {story.status && (
                        <ProjectConfigLabel color={story.status.color} transparent={story.status.transparent}>
                          {story.status.name}
                        </ProjectConfigLabel>
                      )}
                      <StoryName>{story.name}</StoryName>
                      <StoryDetailsBlock>
                        <span>Full Details</span>
                        {story.details ? (
                          <MarkdownText dataTestId="storyMarkdownText" sourceData={story.details} updateMarkdown={_updateMarkdownCheckbox} />
                        ) : (
                          <div>This story has no additional details.</div>
                        )}
                      </StoryDetailsBlock>
                    </DetailsBlock>
                    <DetailsBlock inlineRight width="20%">
                      <SideItem>
                        <span>Project</span>
                        <a href={`/projects/${story.project.id}`} onClick={(e) => {e.preventDefault(); _goToProjectDetails();}}>{story.project.name}</a>
                      </SideItem>
                      <SideItem>
                        <span>Priority</span>
                        {story.priority ? (
                          <ProjectConfigLabel color={story.priority.color} transparent={story.priority.transparent}>{story.priority.name}</ProjectConfigLabel>
                        ) : (
                          <div style={{fontStyle: "italic"}}>None</div>
                        )}
                      </SideItem>
                      <SideItem>
                        <span>Points</span>
                        {story.points ? (
                          story.points
                        ) : (
                          <div style={{fontStyle: "italic"}}>None</div>
                        )}
                      </SideItem>
                      <SideItem>
                        <span>Assigned To</span>
                        {story.owner ? story.owner.displayName : <div style={{fontStyle: "italic"}}>Not Assigned</div>}
                      </SideItem>
                      <SideItem>
                        <span>Created By</span>
                        {story.creator ? story.creator.displayName : <div style={{fontStyle: "italic"}}>Creator Not Found</div>}
                      </SideItem>
                      <SideItem>
                        <span>Create Date</span>
                        {formatDate(story.createdOn)}
                      </SideItem>
                      {story.updatedOn && (
                        <SideItem style={{marginBottom: "0"}}>
                          <span>Last Modified</span>
                          {formatDate(story.updatedOn)}
                        </SideItem>
                      )}
                    </DetailsBlock>
                  </DetailsSection>
                </Tabs.Panel>
              </Tabs.TabPanels>
            </Tabs>
        </Fragment>
      ))}
      {showEditModal && (
        <StoryModal
          onClose={() => setShowEditModal(false)}
          onSubmit={updateStory}
          requestInProgress={storyIsLoading}
          getMemberNames={getMemberNames}
          getStatusNames={getAllStatusNames}
          getPriorityNames={getAllPriorityNames}
          project={story.project}
          story={story}
          refresh={_loadData}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onSubmit={deleteStory}
          dataTestId="storyDeleteModal"
          headerText="Delete Story"
          headerIcon={faTrash}
          bodyText={`This story will be permanently deleted. This data cannot be recovered.`}
          expectedInput={true}
          resource={story}
          inputProps={{
            label: "Delete this Story"
          }}
          refresh={_goToProjectDetails}
          showNotification={showNotification}
        />
      )}
    </StoryDetailsWrapper>
  );
};

StoryDetails.propTypes = {
  storyIsLoading: PropTypes.bool.isRequired,
  getStory: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  updateStory: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  getMemberNames: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  getAllPriorityNames: PropTypes.func.isRequired,
  getAllStatusNames: PropTypes.func.isRequired
};

export default connect(state => ({
  storyIsLoading: state.story.isLoading
}), {
  getStory,
  deleteStory,
  updateStory,
  historyPush: push,
  getMemberNames,
  showNotification,
  getAllPriorityNames,
  getAllStatusNames
})(StoryDetails);
