import styled from "styled-components";
import {TextAreaWrapper} from "../text-area/text-area.styles";

export const StoryModalWrapper = styled.div`
  position: relative;

  & #pointsInput {
    width: 15%;
    padding-right: 10px;
  }

  & #priorityInput-wrapper {
    margin-bottom: 25px;
  }

  & ${TextAreaWrapper} {
    & textarea {
      height: 10em;
    }
  }
`;

export const ProjectSection = styled.div`
  margin-bottom: 10px;

  & span {
    margin-right: 5px;
  }
  & div {
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
    vertical-align: bottom;
    overflow: hidden;
    width: 400px;
    line-height: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
