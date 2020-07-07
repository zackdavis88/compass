import styled from "styled-components";
import {TabsWrapper} from "../../components/tabs/tabs.styles";

export const DashboardWrapper = styled.div`
  height: 100%;
  width: 100%;

  & ${TabsWrapper} {
    padding-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
  }
`;
