import styled, {css} from "styled-components";
import {
  black,
  black80,
  tertiaryBlue26,
  secondaryBlue1a
} from "../../common-styles/variables";

export const TabsWrapper = styled.div`
  position: relative;
`;

export const TabHeadersWrapper = styled.div`
  border-bottom: 2px solid ${black80};
`;

export const HeaderWrapper = styled.div`
  display: inline-block;
  font-size: 18px;
  color: ${black};
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid ${black80};
  border-right: 1px solid ${black80};
  border-top: 1px solid ${black80};
  border-radius: 5px 5px 0 0;
  user-select: none;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  transition: background-color 150ms linear;

  &:hover {
    background-color: ${secondaryBlue1a}
  }

  ${({isActive}) => isActive && css`
    padding-top: 5px;
    background-color: ${tertiaryBlue26};

    &:hover {
      background-color: ${tertiaryBlue26};
    }
  `}
`;

export const TabPanelsWrapper = styled.div`
  padding-top: 30px;
`;

export const PanelWrapper = styled.div``;
