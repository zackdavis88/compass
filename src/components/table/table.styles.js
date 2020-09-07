import styled, {css} from "styled-components";
import {
  white,
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

  &:hover ${TooltipWrapper} {
    font-size: 16px;
    visibility: visible;
    opacity: 1;
    left: -50px;
    bottom: -33px;
  }

  ${({highlightAction}) => highlightAction && css`
    table tr:hover & {
      color: ${black};
      cursor: pointer;
    }
  `}
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
  }

  ${({highlightAction}) => highlightAction && css`
    table tr:hover & {
      color: ${black};
      cursor: pointer;
    }
  `}
`;

export const ActionsWrapper = styled.div`
  display: block;
  top: 20px;

  & ${Action},${LinkAction} {
    display: inline-block;
    margin-right: 10px;
  }

  & ${LinkAction}:last-of-type {
    margin-right: 0;
  }
`;

export const TableValue = styled.div`
  width: auto;
  ${({maxWidth}) => maxWidth && css`
    max-width: ${maxWidth};
  `}

  ${({truncated}) => truncated && css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

export const TableWrapper = styled.div`
  position: relative;

  & table {
    width: 100%;
    border-collapse: collapse;
    font-size: 18px;

    & th {
      width: 5%;
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

export const PaginationSection = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  background-color: ${white};
`;
