import styled from "styled-components";
import {CheckBoxWrapper} from "../check-box/check-box.styles";

export const MembershipModalWrapper = styled.div`
  position: relative;

  & #membershipRolesInput {
    margin-top: 25px;
  }

  & ${CheckBoxWrapper} {
    margin-bottom: 15px;
  }
`;
