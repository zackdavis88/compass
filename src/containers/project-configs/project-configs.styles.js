import styled from "styled-components";
import {Spinner} from "../../components/loading-spinner/loading-spinner.styles";
import {TabsWrapper} from "../../components/tabs/tabs.styles";
import {ActionsWrapper} from "../../components/actions-menu/actions-menu.styles";
import {tertiaryBlue26} from "../../common-styles/variables";
import {ButtonWrapper} from "../../components/button/button.styles";

export const ProjectConfigsWrapper = styled.div`
  position: relative;
  width: 100%;

  & #configsInfoMessage {
    font-size: 20px;
    padding: 15px 25px;
    background-color: ${tertiaryBlue26};
    margin-bottom: 30px;
    border-radius: 5px;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 30px;
    & ${ButtonWrapper} {
      display: inline-block;
      float: right;
      & button {
        border-radius: 5px;
      }
    }
  }

  & ${TabsWrapper} {
    padding-top: 0;
    padding-bottom: 30px;
    padding-left: 50px;
    padding-right: 50px;
  }

  & ${Spinner} {
    padding-top: 35px;
  }

  & ${ActionsWrapper} {
    top: 190px;
  }
`;
