import styled from "styled-components";
import {TableWrapper} from "../table/table.styles";
import {PaginationWrapper} from "../pagination/pagination.styles";
import {ButtonWrapper} from "../button/button.styles";
import {white, tertiaryBlue26} from "../../common-styles/variables";

export const ProjectConfigsTableWrapper = styled.div`
  position: relative;
  height: 775px;
  background-color: ${white};

  & ${TableWrapper} {
    background-color: ${white};
  }

  & ${PaginationWrapper} {
    position: relative;
    margin-top: 25px;
  }

  & #priorityInfoMessage {
    font-size: 20px;
    padding: 15px 25px;
    background-color: ${tertiaryBlue26};
    margin-bottom: 30px;
    border-radius: 5px;

    & ${ButtonWrapper} {
      display: inline-block;
      float: right;
      & button {
        border-radius: 5px;
      }
    }
  }
`;
