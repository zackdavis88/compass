import LoginPage from "./containers/login-page/login-page";
import NotFoundPage from "./containers/not-found-page/not-found-page";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginPage
  }, {
    path: "*",
    exact: false,
    component: NotFoundPage
  }
];

export default routes;
