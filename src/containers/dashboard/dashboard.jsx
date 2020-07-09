import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {getDashboard} from "../../store/actions/dashboard";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";

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
        <Tabs dataTestId="dashboardTabs">
          <Tabs.TabHeaders>
            <Tabs.Header>My Projects</Tabs.Header>
            <Tabs.Header>My Tasks</Tabs.Header>
          </Tabs.TabHeaders>
          <Tabs.TabPanels>
            <Tabs.Panel>Hello, World!</Tabs.Panel>
            <Tabs.Panel>This is some srs content.</Tabs.Panel>
          </Tabs.TabPanels>
        </Tabs>
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
