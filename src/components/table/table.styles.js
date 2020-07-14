import styled, {css} from "styled-components";
import {
  black,
  black80,
  black33,
  tertiaryBlue26
} from "../../common-styles/variables";
import {TooltipWrapper} from "../tooltip/tooltip.styles";

export const Action = styled.div`
  position: relative;
  user-select: none;
  line-height: 0;
  cursor: not-allowed;
  color: ${black33};
  transition: color 100ms linear;

  ${({isAllowed}) => isAllowed && css`
    color: ${black};
    cursor: pointer;
  `}

  &:hover ${TooltipWrapper} {
    font-size: 16px;
    visibility: visible;
    opacity: 1;
    left: -50px;
    bottom: -33px;
  }
`;

export const ActionsWrapper = styled.div`
  display: block;
  top: 20px;

  & ${Action} {
    display: inline-block;
    margin-right: 10px;
  }

  & ${Action}:last-of-type {
    margin-right: 0;
  }
`;

export const TableWrapper = styled.div`
  position: relative;

  & table {
    width: 100%;
    border-collapse: collapse;
    font-size: 18px;

    & th {
      width: 10%;
      border-bottom: 1px solid ${black};
      text-align: left;
    }

    & tbody tr {
      transition: background-color 100ms linear;
    }

    & tbody tr:hover {
      background-color: ${tertiaryBlue26};
    }

    & tbody td {
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid ${black80};
    }
  }
`;
