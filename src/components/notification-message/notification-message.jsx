import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NotificationMessageWrapper, CloseButton } from "./notification-message.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { scaleOut } from "../../common-styles/animations";

const NotificationMessage = ({message, type, autoHide, hideNotification}) => {
  const [showCloseAnimation, setShowCloseAnimation] = useState(false);

  if(autoHide) {
    const [duration] = useState((message.length * 150 < 3000) ? 3000 : (message.length * 100));
    const [timeoutFunc] = useState(
      setTimeout(() => {
        if(!showCloseAnimation)
          setShowCloseAnimation(true);
      }, duration)
    );

    useEffect(() => {
      return () => clearTimeout(timeoutFunc);
    });
  }

  const _handleClose = () => setShowCloseAnimation(true);
  
  const _handleAnimationEnd = (event) => {
    if(event.animationName === scaleOut.getName())
      hideNotification();
  };

  const wrapperProps = {
    type,
    showCloseAnimation,
    onAnimationEnd: _handleAnimationEnd
  };
  
  return (
    <NotificationMessageWrapper {...wrapperProps}>
      <div id="notification-message">{message}</div>
      <CloseButton onClick={_handleClose}>
        <FontAwesomeIcon icon={faTimes} fixedWidth />
      </CloseButton>
    </NotificationMessageWrapper>
  );
};

NotificationMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  autoHide: PropTypes.bool.isRequired,
  hideNotification: PropTypes.func.isRequired
};

export default NotificationMessage;
