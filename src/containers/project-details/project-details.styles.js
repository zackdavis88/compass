import styled, {css} from "styled-components";
import {TabsWrapper} from "../../components/tabs/tabs.styles";
import {Spinner} from "../../components/loading-spinner/loading-spinner.styles";
import {
  white,
  black,
  black80,
  primaryBlue,
  primaryGreen
} from "../../common-styles/variables";

export const ProjectDetailsWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  & ${TabsWrapper} {
    padding-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
    height: 100%;
  }

  & ${Spinner} {
    padding-top: 35px;
  }
`;

export const DetailsSection = styled.div`
  position: relative;
  width: 100%;
  min-height: 500px;
`;

export const DetailsBlock = styled.div`
  position: absolute;
  display: inline-block;
  width: 100%;
  color: ${black};
  border: 1px solid ${black80};
  border-radius: 5px;
  font-size: 18px;
  text-align: left;
  top: 0;
  height: 100%;
  overflow-y: auto;
  padding: 10px 25px;

  ${({width}) => width && css`
    width: ${width};
  `}
  ${({inlineLeft}) => inlineLeft && css`
    border-radius: 5px 0 0 5px;
    left: 0;
  `}
  ${({inlineRight}) => inlineRight && css`
    border-left: none;
    border-radius: 0 5px 5px 0;
    right: 0;
    padding-top: 50px;
    padding-bottom: 10px;
  `}
  ${({textCenter}) => textCenter && css`
    text-align: center;
  `}
`;

export const ProjectID = styled.small`
  color: ${black80};
  letter-spacing: 1px;
  margin-bottom: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

export const ProjectName = styled.h1`
  margin: 0 0 5px 0;
`;

export const ProjectVisibility = styled.div`
  user-select: text;
  margin-bottom: 5px;
  display: inline-block;
  border: 1px solid ${black80};
  padding: 0 5px 0 5px;
  border-radius: 5px;
  color: ${white};
  background-color: ${primaryGreen};
  transition: background-color 100ms linear;

  ${({isPrivate}) => isPrivate && css`
    background-color: ${primaryBlue};
  `}
`;

export const ProjectDescription = styled.div`
  margin-top: 20px;
  overflow-wrap: break-word;

  & div {
    font-style: italic;
  }

  & span{
    user-select: none;
    color: ${black80};
    font-size: 15px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid ${black80};
    transition: color 100ms linear, border-color 100ms linear;
  }

  &:hover span {
    color: ${black};
    border-color: ${black};
  }
`;

export const Statistic = styled.div`
  position: relative;
  width: 50%;
  margin-bottom: 42px;

  & span{
    user-select: none;
    color: ${black80};
    font-size: 15px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    border-bottom: 1px solid ${black80};
    transition: color 100ms linear, border-color 100ms linear;
  }

  &:hover span {
    color: ${black};
    border-color: ${black};
  }
`;
