import React, { Fragment, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ModalWrapper,
  ModalBox,
  ModalHeader,
  ModalBody,
  CloseButton,
  ModalActions
} from "./modal.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";

const Modal = (props) => {
  const {dataTestId} = props;
  const _handleClick = useCallback((event) => {
    // modalWrapper is the background behind the modal box, close the modal if this is clicked.
    const modalWrapper = document.getElementById("compass-modal");
    if(event.target == modalWrapper)
      props.onClose();
  }, [props.onClose]);

  // Attach the clickHandler, if the modal is open, so we can close the modal if the background is clicked.
  useEffect(() => {
    window.addEventListener("click", _handleClick);
    return () => window.removeEventListener("click", _handleClick); // Remove listener if the modal is unmounted.
  });

  return (
    <ModalWrapper data-testid={`${dataTestId}.wrapper`} id="compass-modal">
      <ModalBox small={props.small}>
        <CloseButton data-testid={`${dataTestId}.closeButton`} onClick={props.onClose}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </CloseButton>
        {props.header && (
          <ModalHeader data-testid={`${dataTestId}.header`} centerHeader={props.centerHeader}>
            <h1>
              {props.header.startIcon && <Fragment><FontAwesomeIcon data-testid={`${dataTestId}.header.startIcon`} icon={props.header.startIcon} fixedWidth/>&nbsp;</Fragment>}
              {props.header.text}
              {props.header.endIcon && <Fragment>&nbsp;<FontAwesomeIcon data-testid={`${dataTestId}.header.endIcon`} icon={props.header.endIcon} fixedWidth/></Fragment>}
            </h1>
          </ModalHeader>
        )}
        <ModalBody data-testid={`${dataTestId}.body`}>
          {props.children}
        </ModalBody>
        <ModalActions data-testid={`${dataTestId}.actions`}>
          <Button 
            primary
            small
            onClick={props.onSubmit}
            disabled={props.submitDisabled}
            label="Submit"
            dataTestId={`${dataTestId}.actions.primaryButton`}
            tooltip={props.submitTooltip}
          />
          <Button
            secondary
            small
            onClick={props.onClose}
            label="Cancel"
            dataTestId={`${dataTestId}.actions.secondaryButton`}
          />
        </ModalActions>
      </ModalBox>
    </ModalWrapper>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitDisabled: PropTypes.bool,
  submitTooltip: PropTypes.string,
  small: PropTypes.bool,
  header: PropTypes.shape({
    text: PropTypes.string.isRequired,
    startIcon: PropTypes.object,
    endIcon: PropTypes.object
  }),
  centerHeader: PropTypes.bool,
  dataTestId: PropTypes.string
};

export default Modal;
