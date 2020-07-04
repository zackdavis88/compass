import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DashboardWrapper} from "./dashboard.styles";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../../components/page-header/page-header";

const Dashboard = (props) => {
  return (
    <DashboardWrapper>
      <PageHeader dataTestId="dashboardPageHeader" text="My Dashboard" icon={faTachometerAlt} textCenter/>
    </DashboardWrapper>
  );
};

Dashboard.propTypes = {

};

export default connect((state) => ({

}), {

})(Dashboard);
