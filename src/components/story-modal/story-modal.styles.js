import styled from "styled-components";

export const StoryModalWrapper = styled.div`
  position: relative;
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
