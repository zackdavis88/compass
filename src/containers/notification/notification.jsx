import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NotificationWrapper } from "./notification.styles";
import { hideNotification } from "../../store/actions/notification";
import NotificationMessage from "../../components/notification-message/notification-message";

const NotificationContainer = ({message, type, autoHide, hideNotification}) => {
  return (
    <Fragment>
      {message && (
        <NotificationWrapper>
          <NotificationMessage
            message={message}
            type={type}
            autoHide={autoHide}
            hideNotification={hideNotification}
          />
        </NotificationWrapper>
      )}
    </Fragment>
  );
};

NotificationContainer.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  autoHide: PropTypes.bool,
  hideNotification: PropTypes.func.isRequired
};

export default connect((state) => ({
  message: state.notification.message,
  type: state.notification.type,
  autoHide: state.notification.autoHide
}), {
  hideNotification
})(NotificationContainer);
