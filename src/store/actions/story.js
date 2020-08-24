import request from "superagent";
import {
  STORY_REQUEST_START,
  STORY_REQUEST_SUCCESS,
  STORY_REQUEST_FAILURE
} from "../types/story";

export const createStory = (project, name, details, owner, priority) => dispatch => {
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/stories`),
    payload: {
      name,
      details,
      owner,
      priority
    }
  });
};

export const updateStory = (project, story, name, details, owner, priority) => dispatch => {
  const payload = {};
  if(name)
    payload.name = name;
  if(typeof details === "string")
    payload.details = details;
  if(typeof owner === "string")
    payload.owner = owner;
  if(typeof priority === "string")
    payload.priority = priority;
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/stories/${story.id}`),
    payload
  });
};

export const deleteStory = (storyData, confirm) => dispatch => {
  const projectId = storyData.project.id;
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.delete(`/api/projects/${projectId}/stories/${storyData.id}`),
    payload: {
      confirm
    }
  });
};

export const getStories = (projectId, page, itemsPerPage, filterName) => dispatch => {
  const queryString = {};
  if(page)
    queryString.page = page;
  if(itemsPerPage)
    queryString.itemsPerPage = itemsPerPage;
  if(filterName)
    queryString.filterName = filterName;
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/stories`).query(queryString)
  });
};

export const getStory = (projectId, storyId) => dispatch => {
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.get(`/api/projects/${projectId}/stories/${storyId}`)
  });
};
