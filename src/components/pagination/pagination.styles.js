import styled, {css} from "styled-components";
import {
  transparent,
  black80,
  tertiaryBlue26,
  secondaryBlue1a
} from "../../common-styles/variables";

export const Page = styled.div`
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

export const PaginationWrapper = styled.div`
  position: relative;

  & ${Page} {
    margin-right: 5px;
  }
  & ${Page}:last-of-type {
    margin-right: 0;
  }
`;
