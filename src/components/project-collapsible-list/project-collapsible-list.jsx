import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {ProjectCollapsibleListWrapper} from "./project-collapsible-list.styles";
import CollapsiblePanel from "../collapsible-panel/collapsible-panel";
import {getPermissionLevel, formatDate} from "../../utils";
import Pagination from "../pagination/pagination";

const ProjectCollapsibleList = ({projects, pagination}) => {
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

  return (
    <ProjectCollapsibleListWrapper>
      {projects && projects.map((project, index) => (
        <CollapsiblePanel
          key={index} 
          isActive={activeMap[project.id] || false} 
          onHeaderClick={(value) => setActiveMap({...activeMap, [project.id]: value})}
          headerText={project.name}
        >
          {_generateContent(project)}
        </CollapsiblePanel>
      ))}
      {totalPages > 1 && (
        <div className="paginationSection">
          <Pagination 
            itemsPerPage={itemsPerPage} 
            page={page} 
            totalPages={totalPages} 
            onPageClick={(page) => getPage(page)}
          />
        </div>
      )}
    </ProjectCollapsibleListWrapper>
  );
};

ProjectCollapsibleList.propTypes = {
  projects: PropTypes.array.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired
  }).isRequired
};

export default ProjectCollapsibleList;
