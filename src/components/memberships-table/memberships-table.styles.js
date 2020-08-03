import styled from "styled-components";
import {TableWrapper} from "../table/table.styles";
import {PaginationWrapper} from "../pagination/pagination.styles";

export const MembershipsTableWrapper = styled.div`
  text-align: center;

  & ${TableWrapper} {
    text-align: left;
  }

  & ${PaginationWrapper} {
    margin-top: 25px;
  }
`;
