import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MainWrapper } from "./main.styles";
import { push } from "connected-react-router";
import { showNotification } from "../../store/actions/notification";
import { validateToken } from "../../store/actions/auth";

const Main = (props) => {
  const [renderContent, setRenderContent] = useState(false);
  const {location, authToken, historyPush, showNotification, validateToken} = props;

  const _validateToken = async(token) => {
    const response = await validateToken(token);
    if(response.error)
      historyPush("/");
    setRenderContent(true);
  };

  const _redirectAndNotify = () => {
    historyPush("/");
    showNotification("please login to access the application", "info", true);
    setRenderContent(true);
  };

  useEffect(() => {
    // Check to see if we have a stored token, maybe the user can be authenticated without need to relogin.
    const storedToken = localStorage.getItem("token");

    // If we are not on the LoginPage and have no authToken or storedToken, boot em to LoginPage.
    if(location.pathname !== "/" && !authToken && !storedToken)
      _redirectAndNotify();
    // otherwise, if we have no auth token but do have a storedToken, validate it to auto-login the user.
    else if(!authToken && storedToken)
      _validateToken(storedToken);
    else
      setRenderContent(true);
      
  }, [location.pathname, authToken]);

  return (
    <MainWrapper>
      {renderContent && props.children}
    </MainWrapper>
  );
};

Main.propTypes = {
  location: PropTypes.object.isRequired,
  historyPush: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  validateToken: PropTypes.func.isRequired,
  authToken: PropTypes.string
};

export default connect((state) => ({
  location: state.router.location,
  authToken: state.auth.token
}), {
  historyPush: push,
  showNotification,
  validateToken
})(Main);
