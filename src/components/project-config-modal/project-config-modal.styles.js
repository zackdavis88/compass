import styled from "styled-components";
import {ProjectConfigLabel} from "../../common-styles/base";

export const ProjectConfigModalWrapper = styled.div`
  position: relative;

  & #colorInput-wrapper {
    display: inline-block;
  }

  & #colorInput {
    width: 75px;
  }

  & #transparentInput {
    display: inline-block;
    top: -5px;
    margin-left: 25px;
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

  & ${ProjectConfigLabel} {
    margin-left: 10px;
  }
`;
