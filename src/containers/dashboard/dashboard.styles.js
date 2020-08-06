import styled from "styled-components";
import {TabsWrapper} from "../../components/tabs/tabs.styles";
import {Spinner} from "../../components/loading-spinner/loading-spinner.styles";
import {ActionsWrapper} from "../../components/actions-menu/actions-menu.styles";

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

  & ${ActionsWrapper} {
    top: 100px;
  }
`;
