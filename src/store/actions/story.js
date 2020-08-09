import request from "superagent";
import {
  STORY_REQUEST_START,
  STORY_REQUEST_SUCCESS,
  STORY_REQUEST_FAILURE
} from "../types/story";

export const createStory = (project, name, details, owner) => dispatch => {
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/stories`),
    payload: {
      name,
      details,
      owner
    }
  });
};

export const updateStory = (project, story, name, details, owner) => dispatch => {
  const payload = {};
  if(name)
    payload.name = name;
  if(details)
    payload.details = details;
  if(owner)
    payload.owner = owner;
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.post(`/api/projects/${project.id}/stories/${story.id}`),
    payload
  });
};

export const getStories = (project, page, itemsPerPage) => dispatch => {
  const queryString = {};
  if(page)
    queryString.page = page;
  if(itemsPerPage)
    queryString.itemsPerPage = itemsPerPage;
  return dispatch({
    types: [STORY_REQUEST_START, STORY_REQUEST_SUCCESS, STORY_REQUEST_FAILURE],
    request: request.get(`/api/projects/${project.id}/stories`).query(queryString)
  });
};
