import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {ProjectCollapsibleListWrapper} from "./project-collapsible-list.styles";
import CollapsiblePanel from "../collapsible-panel/collapsible-panel";
import {Action, LinkAction} from "../collapsible-panel/collapsible-panel.styles";
import {getPermissionLevel, formatDate} from "../../utils";
import Pagination from "../pagination/pagination";
import {faUserPlus, faBook, faArrowRight, faWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Tooltip from "../tooltip/tooltip";

const ProjectCollapsibleList = ({projects, actions, pagination, dataTestId}) => {
  const [activeMap, setActiveMap] = useState({});
  useEffect(() => {
    const newActiveMap = projects.reduce((prev, project) => {
      if(!prev[project.id])
        return Object.assign(prev, {[project.id]: false});
      return prev;
    }, {});
    setActiveMap(newActiveMap);
  }, [projects]);

  const _generateContent = (project) => (
    <div>
      <div className="dataLabel"><span>Unique ID:</span> {project.id}</div>
      <div className="dataLabel"><span>Permission Level:</span> {getPermissionLevel(project.roles)}</div>
      <div className="dataLabel"><span>Created On:</span> {formatDate(project.createdOn)}</div>
      <div className="dataLabel"><span>Visibility:</span> {project.isPrivate ? "Private" : "Public"}</div>
      {project.updatedOn && (
        <div className="dataLabel"><span>Last Modified:</span> {formatDate(project.updatedOn)}</div>
      )}
    </div>
  );

  const {itemsPerPage, totalPages, page, getPage} = pagination;
  const _renderActions = (project) => {
    const {addStory, addMember, viewConfigs, viewDetails} = actions;
    const {isAdmin, isManager, isDeveloper, isViewer} = project.roles;
    const adminAllowed = isAdmin;
    const managerAllowed = (isAdmin || isManager);
    const developerAllowed = (isAdmin || isManager || isDeveloper);
    const viewerAllowed = (isAdmin || isManager || isDeveloper || isViewer);
    return (
      <Fragment>
        <Action data-testid="action.addMember" className={managerAllowed ? "highlightAction" : ""} onClick={(e) => {e.stopPropagation();if(managerAllowed) return addMember(project, adminAllowed)}}>
          <FontAwesomeIcon icon={faUserPlus} fixedWidth />
          {managerAllowed && <Tooltip text={"Add Member"} />}
        </Action>
        <Action data-testid="action.addStory" className={developerAllowed ? "highlightAction" : ""} onClick={(e) => {e.stopPropagation();if(developerAllowed) return addStory(project)}}>
          <FontAwesomeIcon icon={faBook} fixedWidth />
          {developerAllowed && <Tooltip text={"Add Story"} />}
        </Action>
        <LinkAction
        data-testid="action.viewProjectConfigs" 
        className={viewerAllowed ? "highlightAction" : ""}
        href={`/projects/${project.id}/configs`} 
        onClick={(e) => {e.preventDefault();e.stopPropagation();if(viewerAllowed) return viewConfigs(project)}}>
          <FontAwesomeIcon icon={faWrench} fixedWidth />
          {viewerAllowed && <Tooltip text={"Manage Configs"} />}
        </LinkAction>
        <LinkAction
        data-testid="action.viewProject" 
        className={viewerAllowed ? "highlightAction" : ""}
        href={`/projects/${project.id}`} 
        onClick={(e) => {e.preventDefault();e.stopPropagation();if(viewerAllowed) return viewDetails(project)}}>
          <FontAwesomeIcon icon={faArrowRight} fixedWidth />
          {viewerAllowed && <Tooltip text={"View Project"} />}
        </LinkAction>
      </Fragment>
    )
  };

  return (
    <ProjectCollapsibleListWrapper>
      {projects && projects.length ? projects.map((project, index) => (
        <CollapsiblePanel
          key={index} 
          isActive={activeMap[project.id] || false} 
          onHeaderClick={(value) => setActiveMap({...activeMap, [project.id]: value})}
          headerText={project.name}
          actions={_renderActions(project)}
          dataTestId={dataTestId ? `${dataTestId}.collapsible.${index}` : ""}
        >
          {_generateContent(project)}
        </CollapsiblePanel>
      )) : (
        <div>There are no projects to display</div>
      )}
      {totalPages > 1 && (
        <div className="paginationSection">
          <Pagination 
            itemsPerPage={itemsPerPage} 
            page={page} 
            totalPages={totalPages} 
            onPageClick={(page) => getPage(page)}
            dataTestId="projectsPagination"
          />
        </div>
      )}
    </ProjectCollapsibleListWrapper>
  );
};

ProjectCollapsibleList.propTypes = {
  projects: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    addMember: PropTypes.func.isRequired,
    addStory: PropTypes.func.isRequired,
    viewDetails: PropTypes.func.isRequired,
    viewConfigs: PropTypes.func.isRequired
  }).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  }).isRequired,
  dataTestId: PropTypes.string
};

export default ProjectCollapsibleList;
