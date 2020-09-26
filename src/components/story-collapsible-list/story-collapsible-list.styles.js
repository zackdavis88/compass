import styled from "styled-components";
import {CollapsiblePanelWrapper, PanelContent} from "../collapsible-panel/collapsible-panel.styles";

export const StoryCollapsibleListWrapper = styled.div`
  position: relative;
  display: block;
  min-height: 775px;

  & ${CollapsiblePanelWrapper} {
    margin-bottom: 0.5em;
  }

  & .dataLabel > span:first-of-type {
    font-weight: bold;
    margin-right: 10px;
    display: inline-block;
    width: 8em;
  }

  & .dataLabel {
    width: 50%;
    display: inline-block;
  }

  & .dataLabel.fullWidth {
    width: 100%;
    display: block;
  }

  & ${PanelContent} > div {
    padding: 20px;
  }

  & .paginationSection {
    position: absolute;
    margin-bottom: 20px;
    bottom: -4.5em;
    width: 100%;
    text-align: center;
  }
`;
