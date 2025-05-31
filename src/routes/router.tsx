import { createBrowserRouter, RouteObject } from "react-router-dom";
import RoutePath from "./routePath";
import MainPage from "../pages/Main";
// import OnboardingPage from "@/pages/Onboarding";
import FestivalPage from "../pages/Festival/festivals";
import FestivalPeriodPage from "../pages/Festival/festivalperiod";
// import CommunityPage from "@/pages/Community";
import LoginPage from "../pages/Auth/login";
import SignupPage from "../pages/Auth/signup";
import MyPage from "../pages/Mypage";

const routes: RouteObject[] = [
  { path: RoutePath.Main, element: <MainPage /> },
  // { path: RoutePath.Onboarding, element: <OnboardingPage /> },
  { path: RoutePath.Festival, element: <FestivalPage /> },
  { path: RoutePath.FestivalPeriod, element: <FestivalPeriodPage /> },
  // { path: RoutePath.Community, element: <CommunityPage /> },
  { path: RoutePath.Login, element: <LoginPage /> },
  { path: RoutePath.Signup, element: <SignupPage /> },
  { path: RoutePath.MyPage, element: <MyPage /> },
];

const Router = createBrowserRouter(routes);
export default Router;
