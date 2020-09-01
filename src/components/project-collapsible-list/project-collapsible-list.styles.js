import styled from "styled-components";
import {CollapsiblePanelWrapper, PanelContent} from "../collapsible-panel/collapsible-panel.styles";

export const ProjectCollapsibleListWrapper = styled.div`
  position: relative;
  display: block;
  min-height: 775px;

  & ${CollapsiblePanelWrapper} {
    margin-bottom: 0.5em;
  }

  & .dataLabel > span {
    font-weight: bold;
    margin-right: 10px;
    display: inline-block;
    width: 8em;
  }

  & .dataLabel {
    width: 50%;
    display: inline-block;
  }

  & ${PanelContent} > div {
    padding: 20px;
  }

  & .paginationSection {
    position: absolute;
    bottom: -2.5em;
    width: 100%;
    text-align: center;
  }
`;
