import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {StoryCollapsibleListWrapper} from "./story-collapsible-list.styles";
import CollapsiblePanel from "../collapsible-panel/collapsible-panel";
import {Action, LinkAction} from "../collapsible-panel/collapsible-panel.styles";
import {formatDate} from "../../utils";
import Pagination from "../pagination/pagination";
import {faArrowRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "../tooltip/tooltip";
import {ProjectConfigLabel} from "../../common-styles/base";

const StoryCollapsibleList = ({stories, actions, pagination, dataTestId, project}) => {
  const [activeMap, setActiveMap] = useState({});
  useEffect(() => {
    const newActiveMap = stories.reduce((prev, story) => {
      if(!prev[story.id])
        return Object.assign(prev, {[story.id]: false});
      return prev;
    }, {});
    setActiveMap(newActiveMap);
  }, [stories]);

  // Generate the story list that we will render.
  const storyList = !project ? stories : stories.map(story => {
    story.project = project;
    return story;
  });

  const _generateConfigLabel = (config) => (
    config ? (
      <ProjectConfigLabel color={config.color} transparent={config.transparent}>{config.name}</ProjectConfigLabel>
    ) : "None"
  );

  const _generateContent = (story) => (
    <div>
      <div className="dataLabel fullWidth"><span>Name:</span> {story.name}</div>
      <div className="dataLabel"><span>Priority:</span> {_generateConfigLabel(story.priority)}&nbsp;</div>
      <div className="dataLabel"><span>Status:</span> {_generateConfigLabel(story.status)}&nbsp;</div>
      <div className="dataLabel"><span>Story ID:</span> {story.id}&nbsp;</div>
      <div className="dataLabel"><span>Points:</span> {story.points || "None"}&nbsp;</div>
      <div className="dataLabel"><span>Created By:</span> {story.creator ? story.creator.displayName : "None Found"}&nbsp;</div>
      <div className="dataLabel"><span>Assigned To:</span> {story.owner ? story.owner.displayName : "Not Assigned"}&nbsp;</div>
      <div className="dataLabel"><span>Project ID:</span> {story.project.id}&nbsp;</div>
      <div className="dataLabel"><span>Project:</span> {story.project.name}&nbsp;</div>
      <div className="dataLabel"><span>Created On:</span> {formatDate(story.createdOn)}&nbsp;</div>
      {story.updatedOn && (
        <div className="dataLabel"><span>Last Modified:</span> {formatDate(story.updatedOn)}</div>
      )}
    </div>
  );

  const {itemsPerPage, totalPages, page, getPage} = pagination;
  const _renderActions = (story) => {
    const {viewDetails, deleteStory} = actions;
    const userRoles = project && project.userRoles || {};
    const {isAdmin, isManager, isDeveloper} = userRoles;
    const actionAllowed = isAdmin || isManager || isDeveloper;
    return (
      <Fragment>
        {deleteStory && (
          <Action data-testid="action.deleteStory" className={actionAllowed ? "highlightAction" : ""} onClick={(e) => {e.stopPropagation();if(actionAllowed) return deleteStory(story)}}>
            <FontAwesomeIcon icon={faTrash} fixedWidth />
            {actionAllowed && <Tooltip text={"Delete Story"} />}
          </Action>
        )}
        <LinkAction
        data-testid="action.viewStory" 
        className="highlightAction"
        href={`/projects/${story.project.id}/stories/${story.id}`} 
        onClick={(e) => {e.preventDefault();e.stopPropagation();return viewDetails(story)}}>
          <FontAwesomeIcon icon={faArrowRight} fixedWidth />
          <Tooltip text={"View Story"} />
        </LinkAction>
      </Fragment>
    )
  };

  const _renderDecorations = (story) => {
    return (
      <Fragment>
        <span>Project: {story.project.name}</span>
        {story.priority && _generateConfigLabel(story.priority)}
        {story.status && _generateConfigLabel(story.status)}
      </Fragment>
    );
  };

  const wrapperProps = dataTestId ? {"data-testid": dataTestId} : {};
  return (
    <StoryCollapsibleListWrapper {...wrapperProps}>
      {storyList && storyList.length ? storyList.map((story, index) => (
        <CollapsiblePanel
          key={index} 
          isActive={activeMap[story.id] || false} 
          onHeaderClick={(value) => setActiveMap({...activeMap, [story.id]: value})}
          headerText={story.name}
          actions={_renderActions(story)}
          dataTestId={dataTestId ? `${dataTestId}.collapsible.${index}` : ""}
          decorations={_renderDecorations(story)}
        >
          {_generateContent(story)}
        </CollapsiblePanel>
      )) : (
        <div>There are no stories to display</div>
      )}
      {totalPages > 1 && (
        <div className="paginationSection">
          <Pagination 
            itemsPerPage={itemsPerPage} 
            page={page} 
            totalPages={totalPages} 
            onPageClick={(page) => getPage(page)}
            dataTestId="storiesPagination"
          />
        </div>
      )}
    </StoryCollapsibleListWrapper>
  );
};

StoryCollapsibleList.propTypes = {
  stories: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    viewDetails: PropTypes.func.isRequired,
    deleteStory: PropTypes.func
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  }).isRequired,
  dataTestId: PropTypes.string,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userRoles: PropTypes.object
  })
};

export default StoryCollapsibleList;
