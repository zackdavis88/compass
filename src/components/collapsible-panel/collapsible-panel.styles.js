import styled, {css} from "styled-components";
import {
  transparent, 
  black,
  black33,
  black80,
  tertiaryBlue26,
  tertiaryBlue50,
  secondaryBlue1a
} from "../../common-styles/variables";
import {TooltipWrapper} from "../tooltip/tooltip.styles";
import {rotate180} from "../../common-styles/animations";

export const Action = styled.div`
  position: relative;
  user-select: none;
  line-height: 0;
  cursor: not-allowed;
  color: ${black33};
  transition: color 100ms linear;

  &:hover ${TooltipWrapper} {
    font-size: 16px;
    visibility: visible;
    opacity: 1;
    left: -50px;
    bottom: -33px;
    padding: 5px;
  }
`;

export const LinkAction = styled.a`
  text-decoration: none;
  position: relative;
  user-select: none;
  line-height: 0;
  cursor: not-allowed;
  color: ${black33};
  transition: color 100ms linear;

  &:hover ${TooltipWrapper} {
    font-size: 16px;
    visibility: visible;
    opacity: 1;
    left: -50px;
    bottom: -33px;
    padding: 5px;
  }
`;

export const ActionsWrapper = styled.div`
  float: right;
  margin-right: 15px;
  ${Action}, ${LinkAction} {
    display: inline-block;
    margin-left: 5px;
  }
`;

export const PanelHeader = styled.button`
  background-color: ${secondaryBlue1a};
  color: ${black};
  cursor: pointer;
  padding: 20px;
  width: 100%;
  border: 1px solid ${black80};
  text-align: left;
  outline: none;
  font-size: 18px;
  border-radius: 5px;
  transition: border-radius 100ms linear, border-color 100ms linear, background-color 100ms linear;
  &:hover {
    background-color: ${tertiaryBlue26};
  }
  & > div:first-of-type {
    display: inline-block;
    max-width: 85%;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > .collapsibleExpandAction {
    float: right;
  }
  &:hover ${Action}.highlightAction {
    color: ${black};
    cursor: pointer;
  }
  &:hover ${LinkAction}.highlightAction {
    color: ${black};
    cursor: pointer;
  }

  & .collapsibleExpandAction.rotateDown {
    animation: ${rotate180} 175ms linear 0s 1;
    animation-fill-mode: forwards;
  }
  & .collapsibleExpandAction.rotateUp {
    animation: ${rotate180} 175ms linear 0s 1;
    animation-direction: reverse;
  }
`;

export const PanelContent = styled.div`
  overflow: hidden;
  background-color: #f1f1f1;
  max-height: 0;
  overflow: hidden;
  padding: 0;
  border: 1px solid ${transparent};
  border-radius: 0 0 5px 5px;
  transition: max-height 150ms linear, border-color 100ms linear;
`;

export const CollapsiblePanelWrapper = styled.div`
  position: relative;
  display: block;
  user-select: text;

  ${({isActive}) => isActive && css`
    & ${PanelHeader} {
      background-color: ${tertiaryBlue50};
      border-radius: 5px 5px 0 0;
    }

    & ${PanelHeader} > ${Action}.highlightAction {
      color: ${black};
    }

    & ${PanelHeader} > ${ActionsWrapper} > ${Action}.highlightAction {
      color: ${black};
    }

    & ${PanelHeader} > ${ActionsWrapper} > ${LinkAction}.highlightAction {
      color: ${black};
    }
  `}

  ${({isActive, contentHeight}) => isActive && contentHeight && css`
    & ${PanelContent} {
      max-height: ${contentHeight}px;
      border-left: 1px solid ${black80};
      border-right: 1px solid ${black80};
      border-bottom: 1px solid ${black80};
    }
  `}
`;
