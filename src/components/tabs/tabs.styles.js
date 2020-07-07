import styled, {css} from "styled-components";

export const TabsWrapper = styled.div`
  position: relative;
`;

export const TabHeadersWrapper = styled.div`
  border-bottom: 1px solid black;
`;

export const HeaderWrapper = styled.div`
  display: inline-block;
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-top: 1px solid black;
  border-radius: 5px 5px 0 0;
  user-select: none;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  ${({isActive}) => isActive && css`
    padding-top: 5px;
    font-weight: bold;
  `}
`;

export const TabPanelsWrapper = styled.div``;

export const PanelWrapper = styled.div``;
