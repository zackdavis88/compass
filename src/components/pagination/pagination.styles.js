import styled, {css} from "styled-components";
import {
  transparent,
  black80,
  tertiaryBlue26,
  secondaryBlue1a
} from "../../common-styles/variables";

export const Page = styled.div`
  user-select: none;
  position: relative;
  display: inline-block;
  background-color: ${transparent};
  border: 1px solid ${transparent};
  border-radius: 5px;
  transition:  border-color 100ms linear, background-color 100ms linear;
  width: 40px;
  cursor: pointer;

  &:hover {
    background-color: ${secondaryBlue1a};
  }

  ${({current}) => current && css`
    background-color: ${tertiaryBlue26};
    border-color: ${black80};

    &:hover {
      background-color: ${tertiaryBlue26};
    }
  `}
`;

export const PageControl = styled.div`
  user-select: none;
  text-align: center;
  position: relative;
  display: inline-block;
  background-color: ${transparent};
  border: 1px solid ${transparent};
  border-radius: 5px;
  transition:  border-color 100ms linear, background-color 100ms linear;
  width: 50px;
  cursor: pointer;

  ${({small}) => small && css`
    width: 40px;
  `}

  &:hover {
    background-color: ${secondaryBlue1a};
  }
`;

export const ControlSection = styled.div`
  position: relative;
  display: inline-block;
`;

export const PaginationWrapper = styled.div`
  position: relative;

  & ${ControlSection}:first-of-type {
    margin-right: 10px;
  }

  & ${ControlSection}:last-of-type {
    margin-left: 10px;
  }
`;
