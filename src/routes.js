import LoginPage from "./containers/login-page/login-page";
import NotFoundPage from "./containers/not-found-page/not-found-page";
import Dashboard from "./containers/dashboard/dashboard";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginPage
  }, {
    path: "/dashboard",
    exact: true,
    component: Dashboard
  }, {
    path: "*",
    exact: false,
    component: NotFoundPage
  }
];

export default routes;
