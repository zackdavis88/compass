import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";
import {getDashboard} from "../../store/actions/dashboard";

const Dashboard = (props) => {
  // TODO: useEffect for componentDidMount logic. Call the API for dashboard data.
  // also TODO: create a Loading component to display while awaiting API data.
  return (
    <DashboardWrapper>
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
  stories: state.dashboard.stories
}), {
  getDashboard
})(Dashboard);
