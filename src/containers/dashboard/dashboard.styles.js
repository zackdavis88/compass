import styled from "styled-components";
import {TabsWrapper} from "../../components/tabs/tabs.styles";
import {Spinner} from "../../components/loading-spinner/loading-spinner.styles";
import {ButtonWrapper} from "../../components/button/button.styles";

export const DashboardWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  & ${TabsWrapper} {
    padding-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
  }

  & ${Spinner} {
    padding-top: 35px;
  }
`;

export const DashboardActionButtons = styled.div`
  position: absolute;
  right: 50px;
  top: 30px;
  z-index: 2999;

  & ${ButtonWrapper} {
    display: inline-block;
  }

  & ${ButtonWrapper}:last-of-type {
    margin-left: 5px;
  }
`;
