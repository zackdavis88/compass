import styled from "styled-components";
import {CheckBoxWrapper} from "../check-box/check-box.styles";

export const MembershipModalWrapper = styled.div`
  position: relative;

  & ${CheckBoxWrapper} {
    padding-bottom: 15px;
  }
`;

export const RolesInputSection = styled.div`
  margin-top: 25px;
`;

export const ExistingMemberSection = styled.div`
  & span {
    margin-right: 5px;
  }
  & div {
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
  }
`;

export const ProjectSection = styled.div`
  margin-bottom: 10px;

  & span {
    margin-right: 5px;
  }
  & div {
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
  }
`;
