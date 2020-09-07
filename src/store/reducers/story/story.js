import {
  STORY_REQUEST_START,
  STORY_REQUEST_SUCCESS,
  STORY_REQUEST_FAILURE
} from "../../types/story";

const initialState = {
  isLoading: false
};

export default function storyReducer(state=initialState, action) {
  switch(action.type){
    case STORY_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case STORY_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case STORY_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
