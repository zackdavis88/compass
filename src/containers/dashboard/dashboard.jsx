import React, {useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper, DashboardActionButtons} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {getDashboard} from "../../store/actions/dashboard";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";
import Button from "../../components/button/button";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
  useEffect(() => {
    props.getDashboard();
  }, []);
  const {isLoading, userInfo} = props;
  return (
    <DashboardWrapper>
      {isLoading ? (
        <LoadingSpinner alignCenter dataTestId="dashboardLoader" message={`Loading Dashboard for ${userInfo.displayName}`}/>
      ) : (
        <Fragment>
          <DashboardActionButtons>
            <Button
              small
              secondary
              label="New Project"
              startIcon={faPlus}
              dataTestId="dashboardNewProject"
              onClick={() => {}}
            />
            <Button
              small
              secondary
              label="New Story"
              startIcon={faPlus}
              dataTestId="dashboardNewStory"
              onClick={() => {}}
            />
          </DashboardActionButtons>
          <Tabs dataTestId="dashboardTabs">
            <Tabs.TabHeaders>
              <Tabs.Header>My Projects</Tabs.Header>
              <Tabs.Header>My Stories</Tabs.Header>
            </Tabs.TabHeaders>
            <Tabs.TabPanels>
              <Tabs.Panel>Hello, World!</Tabs.Panel>
              <Tabs.Panel>This is some srs content.</Tabs.Panel>
            </Tabs.TabPanels>
          </Tabs>
        </Fragment>
      )}
    </DashboardWrapper>
  );
};

Dashboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  projects: PropTypes.array.isRequired,
  stories: PropTypes.array.isRequired,
  getDashboard: PropTypes.func.isRequired
};

export default connect((state) => ({
  isLoading: state.dashboard.isLoading,
  projects: state.dashboard.projects,
  stories: state.dashboard.stories,
  userInfo: state.auth.user
}), {
  getDashboard
})(Dashboard);
