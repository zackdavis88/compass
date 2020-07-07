import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import Tabs from "../../components/tabs/tabs";

const Dashboard = (props) => {
  return (
    <DashboardWrapper>
      {/* TODO: IMPLEMENT A GENERIC TAB COMPONENT
            I want to have a dashboard with 2 tabs: My Projects and My Tasks.
            - My Projects will contain all projects that you are a member of.
            - My Tasks will contain all stories that are assigned to you.
      */}
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

};

export default connect((state) => ({

}), {

})(Dashboard);
