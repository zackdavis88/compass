import styled from "styled-components";
import {TableWrapper} from "../table/table.styles";
import {PaginationWrapper} from "../pagination/pagination.styles";
import {white, black1a} from "../../common-styles/variables";

export const MembershipsTableWrapper = styled.div`
  position: relative;
  height: 775px;
  background-color: ${black1a};

  & ${TableWrapper} {
    background-color: ${white};
  }

  & ${PaginationWrapper} {
    position: relative;
    margin-top: 25px;
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
