import React from "react";
import {FooterWrapper, FooterContent} from "./footer.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {version, license} from "../../../package.json";

const Footer = () => (
  <FooterWrapper>
    <FooterContent>
      <span>{`v${version} `}</span>
      <span>
        <a href="https://github.com/zackdavis88/compass" target="_blank">UI </a>
        <FontAwesomeIcon icon={faGithub} fixedWidth size="2x"/>
        <a href="https://github.com/zackdavis88/needle" target="_blank">API </a>
      </span>
      <span>{`${license}`}</span>
    </FooterContent>
  </FooterWrapper>
);

export default Footer;
