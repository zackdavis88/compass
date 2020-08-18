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
// TODO: Write new tests to validate props.confirmBeforeClose is working as expected.
const Modal = (props) => {
  const {dataTestId} = props;
  const _handleClick = useCallback((event) => {
    // modalWrapper is the background behind the modal box, close the modal if this is clicked. unless
    // props.confirmBeforeClose is true.
    const modalWrapper = document.getElementById("compass-modal");
    if(!props.confirmBeforeClose && event.target == modalWrapper)
      props.onClose();
  }, [props.onClose, props.confirmBeforeClose]);

  // Attach the clickHandler, if the modal is open, so we can close the modal if the background is clicked.
  useEffect(() => {
    window.addEventListener("mousedown", _handleClick);
    return () => window.removeEventListener("mousedown", _handleClick); // Remove listener if the modal is unmounted.
  });

  const _onClose = () => {
    if(props.confirmBeforeClose) {
      const confirmResult = confirm("There are unsaved changes. Are you sure you want to close?");
      if(confirmResult)
        return props.onClose();
    }
    else
      props.onClose();
  };

  return (
    <ModalWrapper data-testid={`${dataTestId}.wrapper`} id="compass-modal">
      <ModalBox small={props.small}>
        <CloseButton data-testid={`${dataTestId}.closeButton`} onClick={_onClose}>
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
            label={props.danger ? "Delete" : "Submit"}
            dataTestId={`${dataTestId}.actions.primaryButton`}
            tooltip={props.submitTooltip}
            danger={props.danger}
          />
          <Button
            secondary
            small
            onClick={_onClose}
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
  dataTestId: PropTypes.string,
  danger: PropTypes.bool,
  confirmBeforeClose: PropTypes.bool
};

export default Modal;
