import styled from "styled-components";
import {PriorityLabel} from "../../common-styles/base";

export const PriorityModalWrapper = styled.div`
  position: relative;

  & #colorInput {
    width: 75px;
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

export const PreviewSection = styled.div`
  margin-bottom: 20px;
  font-style: italic;

  & span {
    font-style: normal;
    margin-right: 5px;
  }

  & ${PriorityLabel} {
    margin-left: 10px;
    display: inline-block;
  }
`;
