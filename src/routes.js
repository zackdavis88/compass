import LoginPage from "./containers/login-page/login-page";
import NotFoundPage from "./containers/not-found-page/not-found-page";
import Dashboard from "./containers/dashboard/dashboard";
import ProjectDetails from "./containers/project-details/project-details";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginPage,
    name: "Login Page"
  }, {
    path: "/dashboard",
    exact: true,
    component: Dashboard,
    name: "Dashboard"
  }, {
    path: "/projects/:projectId",
    exact: true,
    component: ProjectDetails
  }, {
    path: "*",
    exact: false,
    component: NotFoundPage
  }
];

export default routes;
