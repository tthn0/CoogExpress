import { createHashRouter, RouterProvider } from "react-router-dom";
import "./components/shared/_reset.scss";
import Dashboard from "./components/dashboard";
import DashboardAssociate from "./components/dashboardAssociate";
import DashboardCustomer from "./components/dashboardCustomer";
import DashboardDriver from "./components/dashboardDriver";
// import DashboardManager from "./components/dashboardManager";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Package from "./components/package";
import Profile from "./components/profile";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./contexts/ProtectedRoute";
import RedirectIfLoggedIn from "./contexts/RedirectIfLoggedIn";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute children={<Dashboard />} />,
  },
  {
    path: "/dashboard/associate",
    element: <ProtectedRoute children={<DashboardAssociate />} />,
  },
  {
    path: "/dashboard/customer",
    element: <ProtectedRoute children={<DashboardCustomer />} />,
  },
  {
    path: "/dashboard/driver",
    element: <ProtectedRoute children={<DashboardDriver />} />,
  },
  {
    path: "/dashboard/driver/route/:routeId",
    element: <ProtectedRoute children={<DashboardDriver />} />,
  },
  // {
  //   path: "/dashboard/manager",
  //   element: <ProtectedRoute children={<DashboardManager />} />,
  // },
  {
    path: "/package/:packageId",
    element: <ProtectedRoute children={<Package />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute children={<Profile />} />,
  },
  {
    path: "/login",
    element: <RedirectIfLoggedIn children={<Login />} />,
  },
  {
    path: "/register",
    element: <RedirectIfLoggedIn children={<Register />} />,
  },
]);

// TODO
// Improve authentication router:
// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

export default function App() {
  return <AuthProvider children={<RouterProvider router={router} />} />;
}
