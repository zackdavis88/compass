import styled, {css} from "styled-components";
import {
  transparent, 
  black, 
  black80,
  tertiaryBlue26,
  tertiaryBlue50,
  secondaryBlue1a
} from "../../common-styles/variables";

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

  & > svg {
    float: right;
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
  transition: max-height 100ms linear, border-color 100ms linear;
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
