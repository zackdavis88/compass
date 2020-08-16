import styled, {css} from "styled-components";
import {TableWrapper} from "../table/table.styles";
import {PaginationWrapper} from "../pagination/pagination.styles";
import {white, black1a} from "../../common-styles/variables";

export const StoriesTableWrapper = styled.div`
  position: relative;
  height: 775px;
  background-color: ${black1a};
  ${({isEmpty}) => isEmpty && css`
    background-color: ${white};
  `}

  & ${TableWrapper} {
    background-color: ${white};
  }

  & ${PaginationWrapper} {
    position: relative;
    margin-top: 25px;
  }
`;
